package org.sir.appgestionstock.service.impl.inventaire.livraison;

import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommande;
import org.sir.appgestionstock.bean.core.inventaire.livraison.Livraison;
import org.sir.appgestionstock.bean.core.inventaire.livraison.LivraisonProduit;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.enums.StatutLivraisonEnum;
import org.sir.appgestionstock.dao.inventaire.livraison.LivraisonDao;
import org.sir.appgestionstock.exception.NotFoundException;
import org.sir.appgestionstock.service.facade.contacts.FournisseurService;
import org.sir.appgestionstock.service.facade.inventaire.boncommande.BonCommandeService;
import org.sir.appgestionstock.service.facade.inventaire.livraison.LivraisonProduitService;
import org.sir.appgestionstock.service.facade.inventaire.livraison.LivraisonService;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.service.facade.parametres.TaxeService;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import org.sir.appgestionstock.zutils.service.ServiceHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class LivraisonServiceImpl implements LivraisonService {
    //--------------- FIND -------------------------------------
    public Livraison findById(Long id) {
        return dao.findById(id).orElse(null);
    }

    public List<Livraison> findAll() {
        return dao.findAll();
    }

    public List<Livraison> findAllOptimized() {
        return dao.findAllOptimized();
    }

    @Override
    public Pagination<Livraison> findPaginated(int page, int size) {
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
    public Livraison create(Livraison item) {
        if (item == null) return null;
// check if taxeExpedition exists
        var taxeExpedition = item.getTaxeExpedition();
        if (taxeExpedition != null) {
            if (taxeExpedition.getId() == null) item.setTaxeExpedition(null);
            else {
                var found = taxeService.findById(taxeExpedition.getId());
                if (found == null) throw new NotFoundException("Unknown Given TaxeExpedition");
                item.setTaxeExpedition(found);
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
        item.setStatut(StatutLivraisonEnum.LIVRE);
        Livraison saved = dao.save(item);
        createAssociatedList(saved);
        BonCommande bonCommande = bonCommandeService.findById(item.getIdBonCom());
        bonCommande.setLivraison(saved);
        return saved;
    }







    @Transactional(rollbackFor = Exception.class)
    public List<Livraison> create(List<Livraison> items) {
        List<Livraison> result = new ArrayList<>();
        if (items == null || items.isEmpty()) return result;
        items.forEach(it -> result.add(create(it)));
        return result;
    }

    //--------------- UPDATE -----------------------------------
    @Transactional(rollbackFor = Exception.class)
    public Livraison update(Livraison item) {
        if (item == null || item.getId() == null) return null;
        var oldItem = findById(item.getId());
        if (oldItem == null) throw new NotFoundException("Unknown Livraison To Be Updated!");
        Livraison saved = dao.save(item);
        updateAssociatedList(saved);
        return saved;
    }

    @Transactional(rollbackFor = Exception.class)
    public List<Livraison> update(List<Livraison> items) {
        List<Livraison> result = new ArrayList<>();
        if (items == null || items.isEmpty()) return result;
        items.forEach(it -> result.add(update(it)));
        return result;
    }

    //--------------- DELETE -----------------------------------
    @Transactional(rollbackFor = Exception.class)
    public void deleteById(Long id) {
        Livraison item = findById(id);
        if (item != null) delete(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(Livraison item) {
        deleteAssociated(item);
        dao.delete(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(List<Livraison> items) {
        if (items == null || items.isEmpty()) return;
        items.forEach(this::delete);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteByIdIn(List<Long> ids) {
        ids.forEach(id -> {
            Livraison item = findById(id);
            if (item != null) {
                deleteAssociated(item);
            }
        });
        dao.deleteByIdIn(ids);
    }

    //--------------- FIND AND DELETE BYs ----------------------
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByTaxeExpeditionId(Long id) {
        if (id == null) return 0;
        List<Livraison> found = findByTaxeExpeditionId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByTaxeExpeditionId(id);
    }

    @Override
    public List<Livraison> findByTaxeExpeditionId(Long id) {
        return dao.findByTaxeExpeditionId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByFournisseurId(Long id) {
        if (id == null) return 0;
        List<Livraison> found = findByFournisseurId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByFournisseurId(id);
    }

    @Override
    public List<Livraison> findByFournisseurId(Long id) {
        return dao.findByFournisseurId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByEntrepriseId(Long id) {
        if (id == null) return 0;
        List<Livraison> found = findByEntrepriseId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByEntrepriseId(id);
    }

    @Override
    public List<Livraison> findByEntrepriseId(Long id) {
        return dao.findByEntrepriseId(id);
    }

    //----------------------------------------------------------
    public void createAssociatedList(Livraison item) {
        if (item == null || item.getId() == null) return;
        ServiceHelper.createList(item, Livraison::getLivraisonProduit, LivraisonProduit::setLivraison, livraisonProduitService::create);
    }

    public void updateAssociatedList(Livraison item) {
        if (item == null || item.getId() == null) return;
        ServiceHelper.updateList(
                item, livraisonProduitService.findByLivraisonId(item.getId()),
                item.getLivraisonProduit(), LivraisonProduit::setLivraison,
                livraisonProduitService::update,
                livraisonProduitService::delete
        );
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteAssociated(Livraison item) {
        deleteAssociatedList(item);
        deleteAssociatedObjects(item);
    }

    public void deleteAssociatedList(Livraison item) {
        livraisonProduitService.deleteByLivraisonId(item.getId());
    }

    public void deleteAssociatedObjects(Livraison item) {
        ServiceHelper.nullifyInContainer(item.getId(), bonCommandeService::findByLivraisonId, BonCommande::setLivraison, (BonCommande value) -> bonCommandeService.update(value));
    }

    public Long findMaxId() {
        return dao.findMaxId();
    }

    @Override
    public List<Livraison> getLivraisons(Long id){
        return dao.findByEntrepriseId(id);
    }

    //----------------------------------------------------------
    @Autowired
    private LivraisonDao dao;
    @Lazy
    @Autowired
    private TaxeService taxeService;
    @Lazy
    @Autowired
    private FournisseurService fournisseurService;
    @Lazy
    @Autowired
    private LivraisonProduitService livraisonProduitService;
    @Lazy
    @Autowired
    private EntrepriseService entrepriseService;
    @Lazy
    @Autowired
    private BonCommandeService bonCommandeService;
}
