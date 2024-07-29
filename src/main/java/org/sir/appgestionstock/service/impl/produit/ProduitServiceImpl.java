package org.sir.appgestionstock.service.impl.produit;

import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.dao.produit.ProduitDao;
import org.sir.appgestionstock.service.facade.produit.ProduitService;
import org.sir.appgestionstock.bean.core.inventaire.NiveauStock;
import org.sir.appgestionstock.service.facade.inventaire.NiveauStockService;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.service.facade.parametres.DevisesService;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.service.facade.parametres.TaxeService;
import org.sir.appgestionstock.bean.core.produit.ProduitNiveauPrix;
import org.sir.appgestionstock.service.facade.produit.ProduitNiveauPrixService;
import org.sir.appgestionstock.bean.core.ventes.commande.CommandeProduit;
import org.sir.appgestionstock.service.facade.ventes.commande.CommandeProduitService;
import org.sir.appgestionstock.bean.core.ventes.facture.FactureProduit;
import org.sir.appgestionstock.service.facade.ventes.facture.FactureProduitService;
import org.sir.appgestionstock.bean.core.ventes.devis.DevisProduit;
import org.sir.appgestionstock.service.facade.ventes.devis.DevisProduitService;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduitProduit;
import org.sir.appgestionstock.service.facade.ventes.retourproduit.RetourProduitProduitService;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommandeProduit;
import org.sir.appgestionstock.service.facade.inventaire.boncommande.BonCommandeProduitService;
import org.sir.appgestionstock.bean.core.inventaire.livraison.LivraisonProduit;
import org.sir.appgestionstock.service.facade.inventaire.livraison.LivraisonProduitService;
import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.sir.appgestionstock.service.facade.contacts.FournisseurService;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.zutils.service.ServiceHelper;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.sir.appgestionstock.exception.NotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.ArrayList;

@Service
public class ProduitServiceImpl implements ProduitService {
    //--------------- FIND -------------------------------------
    public Produit findById(Long id) {
        return dao.findById(id).orElse(null);
    }

    public List<Produit> findAll() {
        return dao.findAll();
    }

    public List<Produit> findAllOptimized() {
        return dao.findAllOptimized();
    }

    @Override
    public Pagination<Produit> findPaginated(int page, int size) {
        var pageable = PageRequest.of(page, size);
        var found = dao.findAll(pageable);
        var items = found.stream().toList();
        return new Pagination<>(
                items,
                found.getNumber(),
                found.getSize(),
                found.getTotalElements(),
                found.getTotalPages(),
                found.isFirst(),
                found.isLast()
        );
    }

    //--------------- CREATE -----------------------------------
    @Transactional(rollbackFor = Exception.class)
    public Produit create(Produit item) {
        if (item == null) return null;
// check if devises exists
        var devises = item.getDevises();
        if (devises != null) {
            if (devises.getId() == null) item.setDevises(null);
            else {
                var found = devisesService.findById(devises.getId());
                if (found == null) throw new NotFoundException("Unknown Given Devises");
                item.setDevises(found);
            }
        }
// check if taxe exists
        var taxe = item.getTaxe();
        if (taxe != null) {
            if (taxe.getId() == null) item.setTaxe(null);
            else {
                var found = taxeService.findById(taxe.getId());
                if (found == null) throw new NotFoundException("Unknown Given Taxe");
                item.setTaxe(found);
            }
        }
// check if fournisseur exists
        var fournisseur = item.getFournisseur();
        if (fournisseur != null) {
            if (fournisseur.getId() == null) item.setFournisseur(null);
            else {
                var found = fournisseurService.findById(fournisseur.getId());
                if (found == null) throw new NotFoundException("Unknown Given Fournisseur");
                item.setFournisseur(found);
            }
        }
// check if entreprise exists
        var entreprise = item.getEntreprise();
        if (entreprise != null) {
            if (entreprise.getId() == null) item.setEntreprise(null);
            else {
                var found = entrepriseService.findById(entreprise.getId());
                if (found == null) throw new NotFoundException("Unknown Given Entreprise");
                item.setEntreprise(found);
            }
        }
        createAssociatedObject(item);
        Produit saved = dao.save(item);
        createAssociatedList(saved);
        return saved;
    }

    @Transactional(rollbackFor = Exception.class)
    public List<Produit> create(List<Produit> items) {
        List<Produit> result = new ArrayList<>();
        if (items == null || items.isEmpty()) return result;
        items.forEach(it -> result.add(create(it)));
        return result;
    }

    //--------------- UPDATE -----------------------------------
    @Transactional(rollbackFor = Exception.class)
    public Produit update(Produit item) {
        if (item == null || item.getId() == null) return null;
        var oldItem = findById(item.getId());
        if (oldItem == null) throw new NotFoundException("Unknown Produit To Be Updated!");
// update niveauStock
        var niveauStock = item.getNiveauStock();
        var oldNiveauStock = oldItem.getNiveauStock();
        if (oldNiveauStock == null) {
            if (niveauStock != null) niveauStockService.create(niveauStock);
        } else {
// if (niveauStock == null) niveauStockService.delete(oldNiveauStock);
            if (niveauStock != null) {
                niveauStock.setId(oldNiveauStock.getId());
                niveauStockService.update(niveauStock);
            }
        }
        Produit saved = dao.save(item);
        updateAssociatedList(saved);
        return saved;
    }

    @Transactional(rollbackFor = Exception.class)
    public List<Produit> update(List<Produit> items) {
        List<Produit> result = new ArrayList<>();
        if (items == null || items.isEmpty()) return result;
        items.forEach(it -> result.add(update(it)));
        return result;
    }

    //--------------- DELETE -----------------------------------
    @Transactional(rollbackFor = Exception.class)
    public void deleteById(Long id) {
        Produit item = findById(id);
        if (item != null) delete(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(Produit item) {
        deleteAssociated(item);
        dao.delete(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(List<Produit> items) {
        if (items == null || items.isEmpty()) return;
        items.forEach(this::delete);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteByIdIn(List<Long> ids) {
        ids.forEach(id -> {
            Produit item = findById(id);
            if (item != null) {
                deleteAssociated(item);
            }
        });
        dao.deleteByIdIn(ids);
    }

    //--------------- FIND AND DELETE BYs ----------------------
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByNiveauStockId(Long id) {
        Produit found = findByNiveauStockId(id);
        if (found == null) return 0;
        this.deleteAssociated(found);
        return dao.deleteByNiveauStockId(id);
    }

    @Override
    public Produit findByNiveauStockId(Long id) {
        return dao.findByNiveauStockId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByDevisesId(Long id) {
        if (id == null) return 0;
        List<Produit> found = findByDevisesId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByDevisesId(id);
    }

    @Override
    public List<Produit> findByDevisesId(Long id) {
        return dao.findByDevisesId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByTaxeId(Long id) {
        if (id == null) return 0;
        List<Produit> found = findByTaxeId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByTaxeId(id);
    }

    @Override
    public List<Produit> findByTaxeId(Long id) {
        return dao.findByTaxeId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByFournisseurId(Long id) {
        if (id == null) return 0;
        List<Produit> found = findByFournisseurId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByFournisseurId(id);
    }

    @Override
    public List<Produit> findByFournisseurId(Long id) {
        return dao.findByFournisseurId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByEntrepriseId(Long id) {
        if (id == null) return 0;
        List<Produit> found = findByEntrepriseId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByEntrepriseId(id);
    }

    @Override
    public List<Produit> findByEntrepriseId(Long id) {
        return dao.findByEntrepriseId(id);
    }

    //----------------------------------------------------------
    public void createAssociatedObject(Produit item) {
        if (item == null) return;
        ServiceHelper.createObject(item, Produit::getNiveauStock, niveauStockService::create);
    }

    public void createAssociatedList(Produit item) {
        if (item == null || item.getId() == null) return;
        ServiceHelper.createList(item, Produit::getProduitNiveauPrix, ProduitNiveauPrix::setProduit, produitNiveauPrixService::create);
        ServiceHelper.createList(item, Produit::getCommandeProduit, CommandeProduit::setProduit, commandeProduitService::create);
        ServiceHelper.createList(item, Produit::getFactureProduit, FactureProduit::setProduit, factureProduitService::create);
        ServiceHelper.createList(item, Produit::getDevisProduit, DevisProduit::setProduit, devisProduitService::create);
        ServiceHelper.createList(item, Produit::getRetourProduitProduit, RetourProduitProduit::setProduit, retourProduitProduitService::create);
        ServiceHelper.createList(item, Produit::getBonCommandeProduit, BonCommandeProduit::setProduit, bonCommandeProduitService::create);
        ServiceHelper.createList(item, Produit::getLivraisonProduit, LivraisonProduit::setProduit, livraisonProduitService::create);
    }

    public void updateAssociatedList(Produit item) {
        if (item == null || item.getId() == null) return;
        ServiceHelper.updateList(
                item, produitNiveauPrixService.findByProduitId(item.getId()),
                item.getProduitNiveauPrix(), ProduitNiveauPrix::setProduit,
                produitNiveauPrixService::update,
                produitNiveauPrixService::delete
        );
        ServiceHelper.updateList(
                item, commandeProduitService.findByProduitId(item.getId()),
                item.getCommandeProduit(), CommandeProduit::setProduit,
                commandeProduitService::update,
                commandeProduitService::delete
        );
        ServiceHelper.updateList(
                item, factureProduitService.findByProduitId(item.getId()),
                item.getFactureProduit(), FactureProduit::setProduit,
                factureProduitService::update,
                factureProduitService::delete
        );
        ServiceHelper.updateList(
                item, devisProduitService.findByProduitId(item.getId()),
                item.getDevisProduit(), DevisProduit::setProduit,
                devisProduitService::update,
                devisProduitService::delete
        );
        ServiceHelper.updateList(
                item, retourProduitProduitService.findByProduitId(item.getId()),
                item.getRetourProduitProduit(), RetourProduitProduit::setProduit,
                retourProduitProduitService::update,
                retourProduitProduitService::delete
        );
        ServiceHelper.updateList(
                item, bonCommandeProduitService.findByProduitId(item.getId()),
                item.getBonCommandeProduit(), BonCommandeProduit::setProduit,
                bonCommandeProduitService::update,
                bonCommandeProduitService::delete
        );
        ServiceHelper.updateList(
                item, livraisonProduitService.findByProduitId(item.getId()),
                item.getLivraisonProduit(), LivraisonProduit::setProduit,
                livraisonProduitService::update,
                livraisonProduitService::delete
        );
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteAssociated(Produit item) {
        deleteAssociatedList(item);
    }

    public void deleteAssociatedList(Produit item) {
        produitNiveauPrixService.deleteByProduitId(item.getId());
        commandeProduitService.deleteByProduitId(item.getId());
        factureProduitService.deleteByProduitId(item.getId());
        devisProduitService.deleteByProduitId(item.getId());
        retourProduitProduitService.deleteByProduitId(item.getId());
        bonCommandeProduitService.deleteByProduitId(item.getId());
        livraisonProduitService.deleteByProduitId(item.getId());
    }


    @Override
    public double getNbProduits(Long idEntreprise){
        List<Produit> produits = dao.findByEntrepriseId(idEntreprise);
        return produits.size();
    }


    @Override
    public List<Produit> getProduits(Long idEntreprise){
         return  dao.findByEntrepriseId(idEntreprise);

    }



    //----------------------------------------------------------
    @Autowired
    private ProduitDao dao;
    @Lazy
    @Autowired
    private NiveauStockService niveauStockService;
    @Lazy
    @Autowired
    private DevisesService devisesService;
    @Lazy
    @Autowired
    private TaxeService taxeService;
    @Lazy
    @Autowired
    private ProduitNiveauPrixService produitNiveauPrixService;
    @Lazy

    @Autowired
    private CommandeProduitService commandeProduitService;
    @Lazy
    @Autowired
    private FactureProduitService factureProduitService;
    @Lazy
    @Autowired
    private DevisProduitService devisProduitService;
    @Lazy
    @Autowired
    private RetourProduitProduitService retourProduitProduitService;
    @Lazy
    @Autowired
    private BonCommandeProduitService bonCommandeProduitService;
    @Lazy
    @Autowired
    private LivraisonProduitService livraisonProduitService;
    @Lazy
    @Autowired
    private FournisseurService fournisseurService;
    @Lazy
    @Autowired
    private EntrepriseService entrepriseService;
}
