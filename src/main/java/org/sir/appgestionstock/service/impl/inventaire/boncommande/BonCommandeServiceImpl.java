package org.sir.appgestionstock.service.impl.inventaire.boncommande;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommande;
import org.sir.appgestionstock.bean.core.ventes.Paiement;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.sir.appgestionstock.bean.core.ventes.facture.Facture;
import org.sir.appgestionstock.bean.enums.StatutFactureEnum;
import org.sir.appgestionstock.dao.inventaire.boncommande.BonCommandeDao;
import org.sir.appgestionstock.service.facade.inventaire.boncommande.BonCommandeService;
import org.sir.appgestionstock.bean.core.inventaire.livraison.Livraison;
import org.sir.appgestionstock.service.facade.inventaire.livraison.LivraisonService;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.service.facade.parametres.TaxeService;
import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.sir.appgestionstock.service.facade.contacts.FournisseurService;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.service.facade.parametres.DevisesService;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.service.facade.parametres.NiveauPrixService;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommandeProduit;
import org.sir.appgestionstock.service.facade.inventaire.boncommande.BonCommandeProduitService;
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
public class  BonCommandeServiceImpl implements BonCommandeService {
//--------------- FIND -------------------------------------
public BonCommande findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<BonCommande> findAll() {
return dao.findAll();
}
public List<BonCommande> findAllByIdFor(Long id) {
        return dao.findByFournisseurId(id);
}

public List<BonCommande> findAllOptimized() {
return dao.findAllOptimized();
}
@Override
public Pagination<BonCommande> findPaginated(int page, int size) {
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
public BonCommande create(BonCommande item) {
if (item == null) return null;
// check if taxe exists
var taxe = item.getTaxe();
if (taxe != null) {
if(taxe.getId() == null) item.setTaxe(null);
else {
var found = taxeService.findById(taxe.getId());
if (found == null) throw new NotFoundException("Unknown Given Taxe");
item.setTaxe(found);
}
}
// check if taxeExpedition exists
var taxeExpedition = item.getTaxeExpedition();
if (taxeExpedition != null) {
if(taxeExpedition.getId() == null) item.setTaxeExpedition(null);
else {
var found = taxeService.findById(taxeExpedition.getId());
if (found == null) throw new NotFoundException("Unknown Given TaxeExpedition");
item.setTaxeExpedition(found);
}
}
// check if fournisseur exists
var fournisseur = item.getFournisseur();
if (fournisseur != null) {
if(fournisseur.getId() == null) item.setFournisseur(null);
else {
var found = fournisseurService.findById(fournisseur.getId());
if (found == null) throw new NotFoundException("Unknown Given Fournisseur");
item.setFournisseur(found);
}
}
// check if devises exists
var devises = item.getDevises();
if (devises != null) {
if(devises.getId() == null) item.setDevises(null);
else {
var found = devisesService.findById(devises.getId());
if (found == null) throw new NotFoundException("Unknown Given Devises");
item.setDevises(found);
}
}
// check if niveauPrix exists
var niveauPrix = item.getNiveauPrix();
if (niveauPrix != null) {
if(niveauPrix.getId() == null) item.setNiveauPrix(null);
else {
var found = niveauPrixService.findById(niveauPrix.getId());
if (found == null) throw new NotFoundException("Unknown Given NiveauPrix");
item.setNiveauPrix(found);
}
}
// check if entreprise exists
var entreprise = item.getEntreprise();
if (entreprise != null) {
if(entreprise.getId() == null) item.setEntreprise(null);
else {
var found = entrepriseService.findById(entreprise.getId());
if (found == null) throw new NotFoundException("Unknown Given Entreprise");
item.setEntreprise(found);
}
}
//createAssociatedObject(item);
BonCommande saved = dao.save(item);
createAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<BonCommande> create(List<BonCommande> items) {
List<BonCommande> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public BonCommande update(BonCommande item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown BonCommande To Be Updated!");
// update livraison
var livraison = item.getLivraison();
var oldLivraison = oldItem.getLivraison();
if (oldLivraison == null) {
if (livraison != null) livraisonService.create(livraison);
} else {
// if (livraison == null) livraisonService.delete(oldLivraison);
if (livraison != null) {
livraison.setId(oldLivraison.getId());
livraisonService.update(livraison);
}
}
BonCommande saved = dao.save(item);
updateAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<BonCommande> update(List<BonCommande> items) {
List<BonCommande> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
BonCommande item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(BonCommande item) {
deleteAssociated(item);
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<BonCommande> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
ids.forEach(id -> {
BonCommande item = findById(id);
if (item != null) {
deleteAssociated(item);
}
});
dao.deleteByIdIn(ids);
}
//--------------- FIND AND DELETE BYs ----------------------
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByLivraisonId(Long id){
BonCommande found = findByLivraisonId(id);
if (found == null) return 0;
this.deleteAssociated(found);
return dao.deleteByLivraisonId(id);
}
@Override
public BonCommande findByLivraisonId(Long id){
return dao.findByLivraisonId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByTaxeId(Long id){
if (id == null) return 0;
List<BonCommande> found = findByTaxeId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByTaxeId(id);
}
@Override
public List<BonCommande> findByTaxeId(Long id){
return dao.findByTaxeId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByTaxeExpeditionId(Long id){
if (id == null) return 0;
List<BonCommande> found = findByTaxeExpeditionId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByTaxeExpeditionId(id);
}
@Override
public List<BonCommande> findByTaxeExpeditionId(Long id){
return dao.findByTaxeExpeditionId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByFournisseurId(Long id){
if (id == null) return 0;
List<BonCommande> found = findByFournisseurId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByFournisseurId(id);
}
@Override
public List<BonCommande> findByFournisseurId(Long id){
return dao.findByFournisseurId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByDevisesId(Long id){
if (id == null) return 0;
List<BonCommande> found = findByDevisesId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByDevisesId(id);
}
@Override
public List<BonCommande> findByDevisesId(Long id){
return dao.findByDevisesId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByNiveauPrixId(Long id){
if (id == null) return 0;
List<BonCommande> found = findByNiveauPrixId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByNiveauPrixId(id);
}
@Override
public List<BonCommande> findByNiveauPrixId(Long id){
return dao.findByNiveauPrixId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByEntrepriseId(Long id){
if (id == null) return 0;
List<BonCommande> found = findByEntrepriseId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByEntrepriseId(id);
}
@Override
public List<BonCommande> findByEntrepriseId(Long id){
return dao.findByEntrepriseId(id);
}






    @Override
    public void bonCmdLivraispn(Long idC, Long idL) {
        System.out.println(idC);
        System.out.println(idL);
        BonCommande bonCommande = findById(idC);
        Livraison livraison = new Livraison();
        livraison.setId(idL);
        bonCommande.setLivraison(livraison);
        this.dao.save(bonCommande);

    }

/*public void createAssociatedObject(BonCommande item) {
if (item == null) return;
ServiceHelper.createObject(item, BonCommande::getLivraison, livraisonService::create);
}*/
public void createAssociatedList(BonCommande item) {
if (item == null || item.getId() == null) return;
ServiceHelper.createList(item, BonCommande::getBonCommandeProduit, BonCommandeProduit::setBonCommande, bonCommandeProduitService::create);
}
public void updateAssociatedList(BonCommande item) {
if (item == null || item.getId() == null) return;
ServiceHelper.updateList(
item, bonCommandeProduitService.findByBonCommandeId(item.getId()),
item.getBonCommandeProduit(), BonCommandeProduit::setBonCommande,
bonCommandeProduitService::update,
bonCommandeProduitService::delete
);
}
    public Long findMaxId() {
        return dao.findMaxId();
    }
@Transactional(rollbackFor = Exception.class)
public void deleteAssociated(BonCommande item) {
deleteAssociatedList(item);
}
public void deleteAssociatedList(BonCommande item) {
bonCommandeProduitService.deleteByBonCommandeId(item.getId());
}



@Override
public double getCout(Long id){
    Entreprise entreprise = entrepriseService.findById(id);
    List<BonCommande> Boncommandes = dao.findByEntreprise(entreprise);
    double sommeTotale = 0;

    for (BonCommande boncommande : Boncommandes) {
        sommeTotale += boncommande.getTotal();
    }

    return sommeTotale;

}


    @Override
    public double getNbrAchats(Long id){
        Entreprise entreprise = entrepriseService.findById(id);
        List<BonCommande> boncommandes = dao.findByEntreprise(entreprise);
        return boncommandes.size();

    }

    @Override
    public List<BonCommande> getBonCommandes(Long id){
        Entreprise entreprise = entrepriseService.findById(id);
        return dao.findByEntreprise(entreprise);
    }

//----------------------------------------------------------
@Autowired private BonCommandeDao dao;
@Lazy @Autowired private LivraisonService livraisonService;
@Lazy @Autowired private TaxeService taxeService;
@Lazy @Autowired private FournisseurService fournisseurService;
@Lazy @Autowired private DevisesService devisesService;
@Lazy @Autowired private NiveauPrixService niveauPrixService;
@Lazy @Autowired private BonCommandeProduitService bonCommandeProduitService;
@Lazy @Autowired private EntrepriseService entrepriseService;
}
