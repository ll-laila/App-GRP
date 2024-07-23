package org.sir.appgestionstock.service.impl.ventes.commande;

import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.sir.appgestionstock.bean.core.ventes.commande.CommandeProduit;
import org.sir.appgestionstock.bean.core.ventes.facture.Facture;
import org.sir.appgestionstock.bean.enums.StatutCommandeEnum;
import org.sir.appgestionstock.dao.ventes.commande.CommandeDao;
import org.sir.appgestionstock.exception.NotFoundException;
import org.sir.appgestionstock.service.facade.adresse.AdresseService;
import org.sir.appgestionstock.service.facade.contacts.ClientService;
import org.sir.appgestionstock.service.facade.parametres.DevisesService;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.service.facade.parametres.NiveauPrixService;
import org.sir.appgestionstock.service.facade.parametres.TaxeService;
import org.sir.appgestionstock.service.facade.produit.ProduitService;
import org.sir.appgestionstock.service.facade.ventes.commande.CommandeProduitService;
import org.sir.appgestionstock.service.facade.ventes.commande.CommandeService;
import org.sir.appgestionstock.service.facade.ventes.facture.FactureService;
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
public class CommandeServiceImpl implements CommandeService {
    //--------------- FIND -------------------------------------
    public Commande findById(Long id) {
        return dao.findById(id).orElse(null);
    }

    public List<Commande> findAll() {
        return dao.findAll();
    }

    public List<Commande> findAllOptimized() {
        return dao.findAllOptimized();
    }

    @Override
    public Pagination<Commande> findPaginated(int page, int size) {
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
    public Commande create(Commande item) {
        if (item == null) return null;
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
// check if client exists
        var client = item.getClient();
        if (client != null) {
            if (client.getId() == null) item.setClient(null);
            else {
                var found = clientService.findById(client.getId());
                if (found == null) throw new NotFoundException("Unknown Given Client");
                item.setClient(found);
            }
        }
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
// check if niveauPrix exists
        var niveauPrix = item.getNiveauPrix();
        if (niveauPrix != null) {
            if (niveauPrix.getId() == null) item.setNiveauPrix(null);
            else {
                var found = niveauPrixService.findById(niveauPrix.getId());
                if (found == null) throw new NotFoundException("Unknown Given NiveauPrix");
                item.setNiveauPrix(found);
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
        item.setStatut(StatutCommandeEnum.ENATTENTE);

        for(CommandeProduit cp : item.getCommandeProduit()){
            Produit pUpdated = produitService.findById(cp.getProduit().getId());
            pUpdated.setDisponible(cp.getProduit().getDisponible());
            produitService.update(pUpdated);
        }

        Commande saved = dao.save(item);
        createAssociatedList(saved);
        return saved;
    }

    @Transactional(rollbackFor = Exception.class)
    public List<Commande> create(List<Commande> items) {
        List<Commande> result = new ArrayList<>();
        if (items == null || items.isEmpty()) return result;
        items.forEach(it -> result.add(create(it)));
        return result;
    }

    //--------------- UPDATE -----------------------------------
    @Transactional(rollbackFor = Exception.class)
    public Commande update(Commande item) {
        if (item == null || item.getId() == null) return null;
        var oldItem = findById(item.getId());
        if (oldItem == null) throw new NotFoundException("Unknown Commande To Be Updated!");
// update facture
        var facture = item.getFacture();
        var oldFacture = oldItem.getFacture();
        if (oldFacture == null) {
            if (facture != null) factureService.create(facture);
        } else {
// if (facture == null) factureService.delete(oldFacture);
            if (facture != null) {
                facture.setId(oldFacture.getId());
                factureService.update(facture);
            }
        }
// update addressFacturation
        var addressFacturation = item.getAddressFacturation();
        var oldAddressFacturation = oldItem.getAddressFacturation();
        if (oldAddressFacturation == null) {
            if (addressFacturation != null) adresseService.create(addressFacturation);
        } else {
// if (addressFacturation == null) adresseService.delete(oldAddressFacturation);
            if (addressFacturation != null) {
                addressFacturation.setId(oldAddressFacturation.getId());
                adresseService.update(addressFacturation);
            }
        }
// update addressExpedition
        var addressExpedition = item.getAddressExpedition();
        var oldAddressExpedition = oldItem.getAddressExpedition();
        if (oldAddressExpedition == null) {
            if (addressExpedition != null) adresseService.create(addressExpedition);
        } else {
// if (addressExpedition == null) adresseService.delete(oldAddressExpedition);
            if (addressExpedition != null) {
                addressExpedition.setId(oldAddressExpedition.getId());
                adresseService.update(addressExpedition);
            }
        }
        for(CommandeProduit cp : item.getCommandeProduit()){
            Produit pUpdated = produitService.findById(cp.getProduit().getId());
            pUpdated.setDisponible(cp.getProduit().getDisponible());
            produitService.update(pUpdated);
        }
        Commande saved = dao.save(item);
        return saved;
    }

    @Transactional(rollbackFor = Exception.class)
    public List<Commande> update(List<Commande> items) {
        List<Commande> result = new ArrayList<>();
        if (items == null || items.isEmpty()) return result;
        items.forEach(it -> result.add(update(it)));
        return result;
    }

    //--------------- DELETE -----------------------------------
    @Transactional(rollbackFor = Exception.class)
    public void deleteById(Long id) {
        Commande item = findById(id);
        if (item != null) delete(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(Commande item) {
        deleteAssociated(item);
        dao.delete(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(List<Commande> items) {
        if (items == null || items.isEmpty()) return;
        items.forEach(this::delete);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteByIdIn(List<Long> ids) {
        ids.forEach(id -> {
            Commande item = findById(id);
            if (item != null) {
                deleteAssociated(item);
            }
        });
        dao.deleteByIdIn(ids);
    }

    //--------------- FIND AND DELETE BYs ----------------------
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByFactureId(Long id) {
        Commande found = findByFactureId(id);
        if (found == null) return 0;
        this.deleteAssociated(found);
        return dao.deleteByFactureId(id);
    }

    @Override
    public Commande findByFactureId(Long id) {
        return dao.findByFactureId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByTaxeId(Long id) {
        if (id == null) return 0;
        List<Commande> found = findByTaxeId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByTaxeId(id);
    }

    @Override
    public List<Commande> findByTaxeId(Long id) {
        return dao.findByTaxeId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByTaxeExpeditionId(Long id) {
        if (id == null) return 0;
        List<Commande> found = findByTaxeExpeditionId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByTaxeExpeditionId(id);
    }

    @Override
    public List<Commande> findByTaxeExpeditionId(Long id) {
        return dao.findByTaxeExpeditionId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByClientId(Long id) {
        if (id == null) return 0;
        List<Commande> found = findByClientId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByClientId(id);
    }

    @Override
    public List<Commande> findByClientId(Long id) {
        return dao.findByClientId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByDevisesId(Long id) {
        if (id == null) return 0;
        List<Commande> found = findByDevisesId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByDevisesId(id);
    }

    @Override
    public List<Commande> findByDevisesId(Long id) {
        return dao.findByDevisesId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByNiveauPrixId(Long id) {
        if (id == null) return 0;
        List<Commande> found = findByNiveauPrixId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByNiveauPrixId(id);
    }

    @Override
    public List<Commande> findByNiveauPrixId(Long id) {
        return dao.findByNiveauPrixId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByAddressFacturationId(Long id) {
        Commande found = findByAddressFacturationId(id);
        if (found == null) return 0;
        this.deleteAssociated(found);
        return dao.deleteByAddressFacturationId(id);
    }

    @Override
    public Commande findByAddressFacturationId(Long id) {
        return dao.findByAddressFacturationId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByAddressExpeditionId(Long id) {
        Commande found = findByAddressExpeditionId(id);
        if (found == null) return 0;
        this.deleteAssociated(found);
        return dao.deleteByAddressExpeditionId(id);
    }

    @Override
    public Commande findByAddressExpeditionId(Long id) {
        return dao.findByAddressExpeditionId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByEntrepriseId(Long id) {
        if (id == null) return 0;
        List<Commande> found = findByEntrepriseId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByEntrepriseId(id);
    }

    @Override
    public List<Commande> findByEntrepriseId(Long id) {
        return dao.findByEntrepriseId(id);
    }

    @Override
    public void commandeFacture(Long idC, Long idF) {
        System.out.println(idC);
        System.out.println(idF);
        Commande commande = findById(idC);
        Facture facture = new Facture();
        facture.setId(idF);
        commande.setFacture(facture);
        this.dao.save(commande);

    }


    //----------------------------------------------------------
    public void createAssociatedObject(Commande item) {
        if (item == null) return;
        ServiceHelper.createObject(item, Commande::getFacture, factureService::create);
        ServiceHelper.createObject(item, Commande::getAddressFacturation, adresseService::create);
        ServiceHelper.createObject(item, Commande::getAddressExpedition, adresseService::create);
    }

    public void createAssociatedList(Commande item) {
        if (item == null || item.getId() == null) return;
        ServiceHelper.createList(item, Commande::getCommandeProduit, CommandeProduit::setCommande, commandeProduitService::create);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteAssociated(Commande item) {
        deleteAssociatedList(item);
    }

    public void deleteAssociatedList(Commande item) {
        commandeProduitService.deleteByCommandeId(item.getId());
    }

    public Long findMaxId() {
        return dao.findMaxId();
    }


    @Override
    public double getNbCommandes(Long entrepriseId){
        List<Commande> commandes = dao.findByEntrepriseId(entrepriseId);
        return commandes.size();
    }

    @Override
    public List<Commande> getCommandes(Long entrepriseId){
        return dao.findByEntrepriseId(entrepriseId);
    }

    //----------------------------------------------------------
    @Autowired
    private CommandeDao dao;
    @Lazy
    @Autowired
    private FactureService factureService;
    @Lazy
    @Autowired
    private TaxeService taxeService;
    @Lazy
    @Autowired
    private ClientService clientService;
    @Lazy
    @Autowired
    private DevisesService devisesService;
    @Lazy
    @Autowired
    private NiveauPrixService niveauPrixService;
    @Lazy
    @Autowired
    private AdresseService adresseService;
    @Lazy
    @Autowired
    private CommandeProduitService commandeProduitService;
    @Lazy
    @Autowired
    private EntrepriseService entrepriseService;
    @Lazy
    @Autowired
    private ProduitService produitService;
}
