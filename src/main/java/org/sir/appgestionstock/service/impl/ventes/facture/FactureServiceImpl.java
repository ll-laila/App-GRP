package org.sir.appgestionstock.service.impl.ventes.facture;

import org.sir.appgestionstock.bean.core.ventes.facture.Facture;
import org.sir.appgestionstock.bean.enums.StatutFactureEnum;
import org.sir.appgestionstock.dao.ventes.facture.FactureDao;
import org.sir.appgestionstock.service.facade.ventes.facture.FactureService;
import org.sir.appgestionstock.bean.core.ventes.Paiement;
import org.sir.appgestionstock.service.facade.ventes.PaiementService;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduit;
import org.sir.appgestionstock.service.facade.ventes.retourproduit.RetourProduitService;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.service.facade.parametres.TaxeService;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.service.facade.contacts.ClientService;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.service.facade.parametres.DevisesService;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.service.facade.parametres.NiveauPrixService;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.service.facade.adresse.AdresseService;
import org.sir.appgestionstock.bean.core.ventes.facture.FactureProduit;
import org.sir.appgestionstock.service.facade.ventes.facture.FactureProduitService;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.sir.appgestionstock.service.facade.ventes.commande.CommandeService;
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
public class FactureServiceImpl implements FactureService {
    //--------------- FIND -------------------------------------
    public Facture findById(Long id) {
        return dao.findById(id).orElse(null);
    }

    public List<Facture> findAll() {
        return dao.findAll();
    }

    public List<Facture> findAllOptimized() {
        return dao.findAllOptimized();
    }

    @Override
    public Pagination<Facture> findPaginated(int page, int size) {
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
    public Facture create(Facture item) {
        if (item == null) return null;
 /* if(item.set().StatutFactureEnumgetMontantPaye() == (item.getFactureProduit().getFirst().getTotal())){
            item.setStatut(StatutFactureEnum.PAYE);
        } else if (item.getPaiement().getMontantPaye() < (item.getFactureProduit().getFirst().getTotal())) {
            item.setStatut(StatutFactureEnum.PARTIEL);
        }else if (item.getPaiement().getMontantPaye() == 0) {
            item.setStatut(StatutFactureEnum.NONPAYE);}*/
        item.setStatut(StatutFactureEnum.NONPAYE);

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
        Facture saved = dao.save(item);
        createAssociatedList(saved);
        return saved;
    }

    @Transactional(rollbackFor = Exception.class)
    public List<Facture> create(List<Facture> items) {
        List<Facture> result = new ArrayList<>();
        if (items == null || items.isEmpty()) return result;
        items.forEach(it -> result.add(create(it)));
        return result;
    }

    //--------------- UPDATE -----------------------------------
    @Transactional(rollbackFor = Exception.class)
    public Facture update(Facture item) {
        if (item == null || item.getId() == null) return null;
        var oldItem = findById(item.getId());
        if (oldItem == null) throw new NotFoundException("Unknown Facture To Be Updated!");
// update paiement
        var paiement = item.getPaiement();
        var oldPaiement = oldItem.getPaiement();
        if (oldPaiement == null) {
            if (paiement != null) paiementService.create(paiement);
        } else {
           // if (paiement == null) paiementService.delete(oldPaiement);
            if (paiement != null) {
                paiement.setId(oldPaiement.getId());
                paiementService.update(paiement);
            }
        }
// update retourProduit
        var retourProduit = item.getRetourProduit();
        var oldRetourProduit = oldItem.getRetourProduit();
        if (oldRetourProduit == null) {
            if (retourProduit != null) retourProduitService.create(retourProduit);
        } else {
          //  if (retourProduit == null) retourProduitService.delete(oldRetourProduit);
            if (retourProduit != null) {
                retourProduit.setId(oldRetourProduit.getId());
                retourProduitService.update(retourProduit);
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
        Facture saved = dao.save(item);
        updateAssociatedList(saved);
        return saved;
    }

    @Transactional(rollbackFor = Exception.class)
    public List<Facture> update(List<Facture> items) {
        List<Facture> result = new ArrayList<>();
        if (items == null || items.isEmpty()) return result;
        items.forEach(it -> result.add(update(it)));
        return result;
    }

    //--------------- DELETE -----------------------------------
    @Transactional(rollbackFor = Exception.class)
    public void deleteById(Long id) {
        Facture item = findById(id);
        if (item != null) delete(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(Facture item) {
        deleteAssociated(item);
        dao.delete(item);
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(List<Facture> items) {
        if (items == null || items.isEmpty()) return;
        items.forEach(this::delete);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteByIdIn(List<Long> ids) {
        ids.forEach(id -> {
            Facture item = findById(id);
            if (item != null) {
                deleteAssociated(item);
            }
        });
        dao.deleteByIdIn(ids);
    }

    //--------------- FIND AND DELETE BYs ----------------------
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByPaiementId(Long id) {
        Facture found = findByPaiementId(id);
        if (found == null) return 0;
        this.deleteAssociated(found);
        return dao.deleteByPaiementId(id);
    }

    @Override
    public Facture findByPaiementId(Long id) {
        return dao.findByPaiementId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByRetourProduitId(Long id) {
        Facture found = findByRetourProduitId(id);
        if (found == null) return 0;
        this.deleteAssociated(found);
        return dao.deleteByRetourProduitId(id);
    }

    @Override
    public Facture findByRetourProduitId(Long id) {
        return dao.findByRetourProduitId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByTaxeId(Long id) {
        if (id == null) return 0;
        List<Facture> found = findByTaxeId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByTaxeId(id);
    }

    @Override
    public List<Facture> findByTaxeId(Long id) {
        return dao.findByTaxeId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByTaxeExpeditionId(Long id) {
        if (id == null) return 0;
        List<Facture> found = findByTaxeExpeditionId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByTaxeExpeditionId(id);
    }

    @Override
    public List<Facture> findByTaxeExpeditionId(Long id) {
        return dao.findByTaxeExpeditionId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByClientId(Long id) {
        if (id == null) return 0;
        List<Facture> found = findByClientId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByClientId(id);
    }

    @Override
    public List<Facture> findByClientId(Long id) {
        return dao.findByClientId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByDevisesId(Long id) {
        if (id == null) return 0;
        List<Facture> found = findByDevisesId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByDevisesId(id);
    }

    @Override
    public List<Facture> findByDevisesId(Long id) {
        return dao.findByDevisesId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByNiveauPrixId(Long id) {
        if (id == null) return 0;
        List<Facture> found = findByNiveauPrixId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByNiveauPrixId(id);
    }

    @Override
    public List<Facture> findByNiveauPrixId(Long id) {
        return dao.findByNiveauPrixId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByAddressFacturationId(Long id) {
        Facture found = findByAddressFacturationId(id);
        if (found == null) return 0;
        this.deleteAssociated(found);
        return dao.deleteByAddressFacturationId(id);
    }

    @Override
    public Facture findByAddressFacturationId(Long id) {
        return dao.findByAddressFacturationId(id);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByAddressExpeditionId(Long id) {
        Facture found = findByAddressExpeditionId(id);
        if (found == null) return 0;
        this.deleteAssociated(found);
        return dao.deleteByAddressExpeditionId(id);
    }

    @Override
    public Facture findByAddressExpeditionId(Long id) {
        return dao.findByAddressExpeditionId(id);
    }

    @Override
    public void facturePaiement(Long idF, Long idP) {
        System.out.println(idF);
        System.out.println(idP);
        Facture facture = findById(idF);
        Paiement paiement = new Paiement();
        paiement.setId(idP);
        facture.setPaiement(paiement);
        facture.setStatut(StatutFactureEnum.PAYE);
        this.dao.save(facture);

    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByEntrepriseId(Long id) {
        if (id == null) return 0;
        List<Facture> found = findByEntrepriseId(id);
        if (found == null) return 0;
        found.forEach(this::deleteAssociated);
        return dao.deleteByEntrepriseId(id);
    }

    @Override
    public List<Facture> findByEntrepriseId(Long id) {
        return dao.findByEntrepriseId(id);
    }

    //----------------------------------------------------------
    public void createAssociatedObject(Facture item) {
        if (item == null) return;
        ServiceHelper.createObject(item, Facture::getPaiement, paiementService::create);
        ServiceHelper.createObject(item, Facture::getRetourProduit, retourProduitService::create);
        ServiceHelper.createObject(item, Facture::getAddressFacturation, adresseService::create);
        ServiceHelper.createObject(item, Facture::getAddressExpedition, adresseService::create);
    }

    public void createAssociatedList(Facture item) {
        if (item == null || item.getId() == null) return;
        ServiceHelper.createList(item, Facture::getFactureProduit, FactureProduit::setFacture, factureProduitService::create);
    }

    public void updateAssociatedList(Facture item) {
        if (item == null || item.getId() == null) return;
        ServiceHelper.updateList(
                item, factureProduitService.findByFactureId(item.getId()),
                item.getFactureProduit(), FactureProduit::setFacture,
                factureProduitService::update,
                factureProduitService::delete
        );
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteAssociated(Facture item) {
        deleteAssociatedList(item);
        deleteAssociatedObjects(item);
    }

    public void deleteAssociatedList(Facture item) {
        factureProduitService.deleteByFactureId(item.getId());
    }

    public void deleteAssociatedObjects(Facture item) {
        ServiceHelper.nullifyInContainer(item.getId(), commandeService::findByFactureId, Commande::setFacture, (Commande value) -> commandeService.update(value));
    }

    public Long findMaxId() {
        return dao.findMaxId();
    }

    //----------------------------------------------------------
    @Autowired
    private FactureDao dao;
    @Lazy
    @Autowired
    private PaiementService paiementService;
    @Lazy
    @Autowired
    private RetourProduitService retourProduitService;
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
    private FactureProduitService factureProduitService;
    @Lazy
    @Autowired
    private EntrepriseService entrepriseService;
    @Lazy
    @Autowired
    private CommandeService commandeService;
}
