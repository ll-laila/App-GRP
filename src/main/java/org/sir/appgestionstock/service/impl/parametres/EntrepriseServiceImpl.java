package org.sir.appgestionstock.service.impl.parametres;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.dao.parametres.EntrepriseDao;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.service.facade.adresse.AdresseService;
import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.service.facade.contacts.user.EmployeService;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.service.facade.produit.ProduitService;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.service.facade.contacts.ClientService;
import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.sir.appgestionstock.service.facade.contacts.FournisseurService;
import org.sir.appgestionstock.bean.core.ventes.Paiement;
import org.sir.appgestionstock.service.facade.ventes.PaiementService;
import org.sir.appgestionstock.bean.core.inventaire.livraison.Livraison;
import org.sir.appgestionstock.service.facade.inventaire.livraison.LivraisonService;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommande;
import org.sir.appgestionstock.service.facade.inventaire.boncommande.BonCommandeService;
import org.sir.appgestionstock.bean.core.inventaire.NiveauStock;
import org.sir.appgestionstock.service.facade.inventaire.NiveauStockService;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduit;
import org.sir.appgestionstock.service.facade.ventes.retourproduit.RetourProduitService;
import org.sir.appgestionstock.bean.core.ventes.facture.Facture;
import org.sir.appgestionstock.service.facade.ventes.facture.FactureService;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.sir.appgestionstock.service.facade.ventes.commande.CommandeService;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.service.facade.parametres.DevisesService;
import org.sir.appgestionstock.bean.core.parametres.NouvelleDevise;
import org.sir.appgestionstock.service.facade.parametres.NouvelleDeviseService;
import org.sir.appgestionstock.bean.core.ventes.devis.Devis;
import org.sir.appgestionstock.service.facade.ventes.devis.DevisService;
import org.sir.appgestionstock.bean.core.parametres.EntrepriseDevises;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseDevisesService;
import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.sir.appgestionstock.zsecurity.service.facade.AppUserService;
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
public class EntrepriseServiceImpl implements EntrepriseService {
//--------------- FIND -------------------------------------
public Entreprise findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<Entreprise> findAll() {
return dao.findAll();
}
public List<Entreprise> findAllOptimized() {
return findAll();
}
@Override
public Pagination<Entreprise> findPaginated(int page, int size) {
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
public Entreprise create(Entreprise item) {
if (item == null) return null;
createAssociatedObject(item);
Entreprise saved = dao.save(item);
createAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<Entreprise> create(List<Entreprise> items) {
List<Entreprise> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public Entreprise update(Entreprise item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown Entreprise To Be Updated!");
// update adresse
var adresse = item.getAdresse();
var oldAdresse = oldItem.getAdresse();
if (oldAdresse == null) {
if (adresse != null) adresseService.create(adresse);
} else {
// if (adresse == null) adresseService.delete(oldAdresse);
if (adresse != null) {
adresse.setId(oldAdresse.getId());
adresseService.update(adresse);
}
}

Entreprise saved = dao.save(item);
updateAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<Entreprise> update(List<Entreprise> items) {
List<Entreprise> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
Entreprise item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(Entreprise item) {
deleteAssociated(item);
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<Entreprise> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
ids.forEach(id -> {
Entreprise item = findById(id);
if (item != null) {
deleteAssociated(item);
}
});
dao.deleteByIdIn(ids);
}
//--------------- FIND AND DELETE BYs ----------------------
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByAdresseId(Long id){
Entreprise found = findByAdresseId(id);
if (found == null) return 0;
this.deleteAssociated(found);
return dao.deleteByAdresseId(id);
}
@Override
public Entreprise findByAdresseId(Long id){
return dao.findByAdresseId(id);
}
//----------------------------------------------------------
public void createAssociatedObject(Entreprise item) {
if (item == null) return;
ServiceHelper.createObject(item, Entreprise::getAdresse, adresseService::create);
}
public void createAssociatedList(Entreprise item) {
if (item == null || item.getId() == null) return;
ServiceHelper.createList(item, Entreprise::getEmployes, Employe::setEntreprise, employeService::create);
ServiceHelper.createList(item, Entreprise::getProduits, Produit::setEntreprise, produitService::create);
ServiceHelper.createList(item, Entreprise::getClients, Client::setEntreprise, clientService::create);
ServiceHelper.createList(item, Entreprise::getFournisseurs, Fournisseur::setEntreprise, fournisseurService::create);
ServiceHelper.createList(item, Entreprise::getPaiement, Paiement::setEntreprise, paiementService::create);
ServiceHelper.createList(item, Entreprise::getLivraison, Livraison::setEntreprise, livraisonService::create);
ServiceHelper.createList(item, Entreprise::getBonCommande, BonCommande::setEntreprise, bonCommandeService::create);
ServiceHelper.createList(item, Entreprise::getNiveauStock, NiveauStock::setEntreprise, niveauStockService::create);
ServiceHelper.createList(item, Entreprise::getRetourProduit, RetourProduit::setEntreprise, retourProduitService::create);
ServiceHelper.createList(item, Entreprise::getFacture, Facture::setEntreprise, factureService::create);
ServiceHelper.createList(item, Entreprise::getCommande, Commande::setEntreprise, commandeService::create);
ServiceHelper.createList(item, Entreprise::getDevisesList, Devises::setEntreprise, devisesService::create);
ServiceHelper.createList(item, Entreprise::getNouvelleDevises, NouvelleDevise::setEntreprise, nouvelleDeviseService::create);
ServiceHelper.createList(item, Entreprise::getDevisList, Devis::setEntreprise, devisService::create);
ServiceHelper.createList(item, Entreprise::getEntrepriseDevises, EntrepriseDevises::setEntreprise, entrepriseDevisesService::create);
}
public void updateAssociatedList(Entreprise item) {
if (item == null || item.getId() == null) return;
ServiceHelper.updateList(
item, employeService.findByEntrepriseId(item.getId()),
item.getEmployes(), Employe::setEntreprise,
employeService::update,
employeService::delete
);
ServiceHelper.updateList(
item, produitService.findByEntrepriseId(item.getId()),
item.getProduits(), Produit::setEntreprise,
produitService::update,
produitService::delete
);
ServiceHelper.updateList(
item, clientService.findByEntrepriseId(item.getId()),
item.getClients(), Client::setEntreprise,
clientService::update,
clientService::delete
);
ServiceHelper.updateList(
item, fournisseurService.findByEntrepriseId(item.getId()),
item.getFournisseurs(), Fournisseur::setEntreprise,
fournisseurService::update,
fournisseurService::delete
);
ServiceHelper.updateList(
item, paiementService.findByEntrepriseId(item.getId()),
item.getPaiement(), Paiement::setEntreprise,
paiementService::update,
paiementService::delete
);
ServiceHelper.updateList(
item, livraisonService.findByEntrepriseId(item.getId()),
item.getLivraison(), Livraison::setEntreprise,
livraisonService::update,
livraisonService::delete
);
ServiceHelper.updateList(
item, bonCommandeService.findByEntrepriseId(item.getId()),
item.getBonCommande(), BonCommande::setEntreprise,
bonCommandeService::update,
bonCommandeService::delete
);
ServiceHelper.updateList(
item, niveauStockService.findByEntrepriseId(item.getId()),
item.getNiveauStock(), NiveauStock::setEntreprise,
niveauStockService::update,
niveauStockService::delete
);
ServiceHelper.updateList(
item, retourProduitService.findByEntrepriseId(item.getId()),
item.getRetourProduit(), RetourProduit::setEntreprise,
retourProduitService::update,
retourProduitService::delete
);
ServiceHelper.updateList(
item, factureService.findByEntrepriseId(item.getId()),
item.getFacture(), Facture::setEntreprise,
factureService::update,
factureService::delete
);
ServiceHelper.updateList(
item, commandeService.findByEntrepriseId(item.getId()),
item.getCommande(), Commande::setEntreprise,
commandeService::update,
commandeService::delete
);
ServiceHelper.updateList(
item, devisesService.findByEntrepriseId(item.getId()),
item.getDevisesList(), Devises::setEntreprise,
devisesService::update,
devisesService::delete
);
ServiceHelper.updateList(
item, nouvelleDeviseService.findByEntrepriseId(item.getId()),
item.getNouvelleDevises(), NouvelleDevise::setEntreprise,
nouvelleDeviseService::update,
nouvelleDeviseService::delete
);
ServiceHelper.updateList(
item, devisService.findByEntrepriseId(item.getId()),
item.getDevisList(), Devis::setEntreprise,
devisService::update,
devisService::delete
);
ServiceHelper.updateList(
item, entrepriseDevisesService.findByEntrepriseId(item.getId()),
item.getEntrepriseDevises(), EntrepriseDevises::setEntreprise,
entrepriseDevisesService::update,
entrepriseDevisesService::delete
);
}
@Transactional(rollbackFor = Exception.class)
public void deleteAssociated(Entreprise item) {
deleteAssociatedList(item);
deleteAssociatedObjects(item);
}
public void deleteAssociatedList(Entreprise item) {
employeService.deleteByEntrepriseId(item.getId());
produitService.deleteByEntrepriseId(item.getId());
clientService.deleteByEntrepriseId(item.getId());
fournisseurService.deleteByEntrepriseId(item.getId());
paiementService.deleteByEntrepriseId(item.getId());
livraisonService.deleteByEntrepriseId(item.getId());
bonCommandeService.deleteByEntrepriseId(item.getId());
niveauStockService.deleteByEntrepriseId(item.getId());
retourProduitService.deleteByEntrepriseId(item.getId());
factureService.deleteByEntrepriseId(item.getId());
commandeService.deleteByEntrepriseId(item.getId());
devisesService.deleteByEntrepriseId(item.getId());
nouvelleDeviseService.deleteByEntrepriseId(item.getId());
devisService.deleteByEntrepriseId(item.getId());
entrepriseDevisesService.deleteByEntrepriseId(item.getId());
}
public void deleteAssociatedObjects(Entreprise item) {

}
public List<Entreprise> findEntrepriseByAdmin(String username){
    AppUser admin = appUserService.findByUsername(username);
    System.out.println(admin);
    return dao.getEntrepriseByIdAdmin(admin.getId());
}


@Override
public List<Entreprise> findEntrepriseDroitAcces(Long idEmploye){
    return dao.findEntreprisesByEmployeId(idEmploye);
}


//----------------------------------------------------------
@Autowired private EntrepriseDao dao;
@Lazy @Autowired private AdresseService adresseService;
@Lazy @Autowired private EmployeService employeService;
@Lazy @Autowired private ProduitService produitService;
@Lazy @Autowired private ClientService clientService;
@Lazy @Autowired private FournisseurService fournisseurService;
@Lazy @Autowired private PaiementService paiementService;
@Lazy @Autowired private LivraisonService livraisonService;
@Lazy @Autowired private BonCommandeService bonCommandeService;
@Lazy @Autowired private NiveauStockService niveauStockService;
@Lazy @Autowired private RetourProduitService retourProduitService;
@Lazy @Autowired private FactureService factureService;
@Lazy @Autowired private CommandeService commandeService;
@Lazy @Autowired private DevisesService devisesService;
@Lazy @Autowired private NouvelleDeviseService nouvelleDeviseService;
@Lazy @Autowired private DevisService devisService;
@Lazy @Autowired private EntrepriseDevisesService entrepriseDevisesService;
@Lazy @Autowired private AppUserService appUserService;

}
