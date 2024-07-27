package org.sir.appgestionstock.service.impl.ventes.devis;
import org.sir.appgestionstock.bean.core.ventes.devis.Devis;
import org.sir.appgestionstock.dao.ventes.devis.DevisDao;
import org.sir.appgestionstock.service.facade.ventes.devis.DevisService;
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
import org.sir.appgestionstock.bean.core.ventes.devis.DevisProduit;
import org.sir.appgestionstock.service.facade.ventes.devis.DevisProduitService;
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
public class DevisServiceImpl implements DevisService {
//--------------- FIND -------------------------------------
public Devis findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<Devis> findAll() {
return dao.findAll();
}
public List<Devis> findAllOptimized() {
return dao.findAllOptimized();
}
@Override
public Pagination<Devis> findPaginated(int page, int size) {
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
public Devis create(Devis item) {
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
// check if client exists
var client = item.getClient();
if (client != null) {
if(client.getId() == null) item.setClient(null);
else {
var found = clientService.findById(client.getId());
if (found == null) throw new NotFoundException("Unknown Given Client");
item.setClient(found);
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
createAssociatedObject(item);
Devis saved = dao.save(item);
createAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<Devis> create(List<Devis> items) {
List<Devis> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public Devis update(Devis item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown Devis To Be Updated!");
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
// if (retourProduit == null) retourProduitService.delete(oldRetourProduit);
if (retourProduit != null) {
retourProduit.setId(oldRetourProduit.getId());
retourProduitService.update(retourProduit);
}
}
Devis saved = dao.save(item);
updateAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<Devis> update(List<Devis> items) {
List<Devis> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
Devis item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(Devis item) {
deleteAssociated(item);
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<Devis> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
ids.forEach(id -> {
Devis item = findById(id);
if (item != null) {
deleteAssociated(item);
}
});
dao.deleteByIdIn(ids);
}
//--------------- FIND AND DELETE BYs ----------------------
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByPaiementId(Long id){
Devis found = findByPaiementId(id);
if (found == null) return 0;
this.deleteAssociated(found);
return dao.deleteByPaiementId(id);
}
@Override
public Devis findByPaiementId(Long id){
return dao.findByPaiementId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByRetourProduitId(Long id){
Devis found = findByRetourProduitId(id);
if (found == null) return 0;
this.deleteAssociated(found);
return dao.deleteByRetourProduitId(id);
}
@Override
public Devis findByRetourProduitId(Long id){
return dao.findByRetourProduitId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByTaxeId(Long id){
if (id == null) return 0;
List<Devis> found = findByTaxeId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByTaxeId(id);
}
@Override
public List<Devis> findByTaxeId(Long id){
return dao.findByTaxeId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByTaxeExpeditionId(Long id){
if (id == null) return 0;
List<Devis> found = findByTaxeExpeditionId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByTaxeExpeditionId(id);
}
@Override
public List<Devis> findByTaxeExpeditionId(Long id){
return dao.findByTaxeExpeditionId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByClientId(Long id){
if (id == null) return 0;
List<Devis> found = findByClientId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByClientId(id);
}
@Override
public List<Devis> findByClientId(Long id){
return dao.findByClientId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByDevisesId(Long id){
if (id == null) return 0;
List<Devis> found = findByDevisesId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByDevisesId(id);
}
@Override
public List<Devis> findByDevisesId(Long id){
return dao.findByDevisesId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByNiveauPrixId(Long id){
if (id == null) return 0;
List<Devis> found = findByNiveauPrixId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByNiveauPrixId(id);
}
@Override
public List<Devis> findByNiveauPrixId(Long id){
return dao.findByNiveauPrixId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByEntrepriseId(Long id){
if (id == null) return 0;
List<Devis> found = findByEntrepriseId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByEntrepriseId(id);
}
@Override
public List<Devis> findByEntrepriseId(Long id){
return dao.findByEntrepriseId(id);
}
//----------------------------------------------------------
public void createAssociatedObject(Devis item) {
if (item == null) return;
ServiceHelper.createObject(item, Devis::getPaiement, paiementService::create);
ServiceHelper.createObject(item, Devis::getRetourProduit, retourProduitService::create);
}
public void createAssociatedList(Devis item) {
if (item == null || item.getId() == null) return;
ServiceHelper.createList(item, Devis::getDevisProduit, DevisProduit::setDevis, devisProduitService::create);
}
public void updateAssociatedList(Devis item) {
if (item == null || item.getId() == null) return;
ServiceHelper.updateList(
item, devisProduitService.findByDevisId(item.getId()),
item.getDevisProduit(), DevisProduit::setDevis,
devisProduitService::update,
devisProduitService::delete
);
}
    public Long findMaxId() {
        return dao.findMaxId();
    }



    @Override
    public List<Devis> getDevis(Long id){
        return dao.findByEntrepriseId(id);
    }

@Transactional(rollbackFor = Exception.class)
public void deleteAssociated(Devis item) {
deleteAssociatedList(item);
}
public void deleteAssociatedList(Devis item) {
devisProduitService.deleteByDevisId(item.getId());
}
//----------------------------------------------------------
@Autowired private DevisDao dao;
@Lazy @Autowired private PaiementService paiementService;
@Lazy @Autowired private RetourProduitService retourProduitService;
@Lazy @Autowired private TaxeService taxeService;
@Lazy @Autowired private ClientService clientService;
@Lazy @Autowired private DevisesService devisesService;
@Lazy @Autowired private NiveauPrixService niveauPrixService;
@Lazy @Autowired private DevisProduitService devisProduitService;
@Lazy @Autowired private EntrepriseService entrepriseService;
}
