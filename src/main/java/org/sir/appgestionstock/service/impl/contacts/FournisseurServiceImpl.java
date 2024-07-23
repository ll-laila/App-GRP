package org.sir.appgestionstock.service.impl.contacts;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.sir.appgestionstock.dao.contacts.FournisseurDao;
import org.sir.appgestionstock.service.facade.contacts.FournisseurService;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.service.facade.adresse.AdresseService;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.service.facade.parametres.DevisesService;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.service.facade.parametres.NiveauPrixService;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.service.facade.parametres.TaxeService;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.service.facade.produit.ProduitService;
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
public class FournisseurServiceImpl implements FournisseurService {
//--------------- FIND -------------------------------------
public Fournisseur findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<Fournisseur> findAll() {
return dao.findAll();
}
public List<Fournisseur> findAllOptimized() {
return dao.findAllOptimized();
}
@Override
public Pagination<Fournisseur> findPaginated(int page, int size) {
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
public Fournisseur create(Fournisseur item) {
if (item == null) return null;
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
createAssociatedObject(item);
Fournisseur saved = dao.save(item);
createAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<Fournisseur> create(List<Fournisseur> items) {
List<Fournisseur> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public Fournisseur update(Fournisseur item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown Fournisseur To Be Updated!");
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
Fournisseur saved = dao.save(item);
updateAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<Fournisseur> update(List<Fournisseur> items) {
List<Fournisseur> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
Fournisseur item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(Fournisseur item) {
deleteAssociated(item);
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<Fournisseur> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
ids.forEach(id -> {
Fournisseur item = findById(id);
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
Fournisseur found = findByAdresseId(id);
if (found == null) return 0;
this.deleteAssociated(found);
return dao.deleteByAdresseId(id);
}
@Override
public Fournisseur findByAdresseId(Long id){
return dao.findByAdresseId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByDevisesId(Long id){
if (id == null) return 0;
List<Fournisseur> found = findByDevisesId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByDevisesId(id);
}
@Override
public List<Fournisseur> findByDevisesId(Long id){
return dao.findByDevisesId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByNiveauPrixId(Long id){
if (id == null) return 0;
List<Fournisseur> found = findByNiveauPrixId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByNiveauPrixId(id);
}
@Override
public List<Fournisseur> findByNiveauPrixId(Long id){
return dao.findByNiveauPrixId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByTaxeId(Long id){
if (id == null) return 0;
List<Fournisseur> found = findByTaxeId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByTaxeId(id);
}
@Override
public List<Fournisseur> findByTaxeId(Long id){
return dao.findByTaxeId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByEntrepriseId(Long id){
if (id == null) return 0;
List<Fournisseur> found = findByEntrepriseId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByEntrepriseId(id);
}
@Override
public List<Fournisseur> findByEntrepriseId(Long id){
return dao.findByEntrepriseId(id);
}
//----------------------------------------------------------
public void createAssociatedObject(Fournisseur item) {
if (item == null) return;
ServiceHelper.createObject(item, Fournisseur::getAdresse, adresseService::create);
}
public void createAssociatedList(Fournisseur item) {
if (item == null || item.getId() == null) return;
ServiceHelper.createList(item, Fournisseur::getProduits, Produit::setFournisseur, produitService::create);
}
public void updateAssociatedList(Fournisseur item) {
if (item == null || item.getId() == null) return;
ServiceHelper.updateList(
item, produitService.findByFournisseurId(item.getId()),
item.getProduits(), Produit::setFournisseur,
produitService::update,
produitService::delete
);
}
    public Long findMaxId() {
        return dao.findMaxId();
    }


    @Override
    public double getNbFournisseurs(Long idEntreprise){
        List<Fournisseur> fournisseurs = dao.findByEntrepriseId(idEntreprise);
        return fournisseurs.size();
    }

    @Override
    public List<Fournisseur> getFournisseurs(Long idEntreprise){
        return dao.findByEntrepriseId(idEntreprise);
    }

@Transactional(rollbackFor = Exception.class)
public void deleteAssociated(Fournisseur item) {
deleteAssociatedList(item);
}
public void deleteAssociatedList(Fournisseur item) {
produitService.deleteByFournisseurId(item.getId());
}
//----------------------------------------------------------
@Autowired private FournisseurDao dao;
@Lazy @Autowired private AdresseService adresseService;
@Lazy @Autowired private DevisesService devisesService;
@Lazy @Autowired private NiveauPrixService niveauPrixService;
@Lazy @Autowired private TaxeService taxeService;
@Lazy @Autowired private ProduitService produitService;
@Lazy @Autowired private EntrepriseService entrepriseService;
}
