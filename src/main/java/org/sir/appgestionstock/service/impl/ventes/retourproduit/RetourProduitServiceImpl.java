package org.sir.appgestionstock.service.impl.ventes.retourproduit;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduit;
import org.sir.appgestionstock.dao.ventes.retourproduit.RetourProduitDao;
import org.sir.appgestionstock.service.facade.ventes.retourproduit.RetourProduitService;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.service.facade.contacts.ClientService;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduitProduit;
import org.sir.appgestionstock.service.facade.ventes.retourproduit.RetourProduitProduitService;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.bean.core.ventes.devis.Devis;
import org.sir.appgestionstock.service.facade.ventes.devis.DevisService;
import org.sir.appgestionstock.bean.core.ventes.facture.Facture;
import org.sir.appgestionstock.service.facade.ventes.facture.FactureService;
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
public class RetourProduitServiceImpl implements RetourProduitService {
//--------------- FIND -------------------------------------
public RetourProduit findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<RetourProduit> findAll() {
return dao.findAll();
}
public List<RetourProduit> findAllOptimized() {
return dao.findAllOptimized();
}
@Override
public Pagination<RetourProduit> findPaginated(int page, int size) {
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
public RetourProduit create(RetourProduit item) {
if (item == null) return null;
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
RetourProduit saved = dao.save(item);
createAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<RetourProduit> create(List<RetourProduit> items) {
List<RetourProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public RetourProduit update(RetourProduit item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown RetourProduit To Be Updated!");
// update noteCredit

RetourProduit saved = dao.save(item);
updateAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<RetourProduit> update(List<RetourProduit> items) {
List<RetourProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
RetourProduit item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(RetourProduit item) {
deleteAssociated(item);
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<RetourProduit> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
ids.forEach(id -> {
RetourProduit item = findById(id);
if (item != null) {
deleteAssociated(item);
}
});
dao.deleteByIdIn(ids);
}
//--------------- FIND AND DELETE BYs ----------------------
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByClientId(Long id){
if (id == null) return 0;
List<RetourProduit> found = findByClientId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByClientId(id);
}
@Override
public List<RetourProduit> findByClientId(Long id){
return dao.findByClientId(id);
}





    @Override
    @Transactional(rollbackFor = Exception.class)
    public int deleteByFactureId(Long id){
        RetourProduit found = findByFactureId(id);
        if (found == null) return 0;
        this.deleteAssociated(found);
        return dao.deleteByFactureId(id);
    }


    @Override
    public RetourProduit findByFactureId(Long id){
        return dao.findByFactureId(id);
    }


    @Override
    public List<RetourProduit> getRetourProduits(Long id){
        return dao.findByEntrepriseId(id);
    }



@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByEntrepriseId(Long id){
if (id == null) return 0;
List<RetourProduit> found = findByEntrepriseId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByEntrepriseId(id);
}
@Override
public List<RetourProduit> findByEntrepriseId(Long id){
return dao.findByEntrepriseId(id);
}
//----------------------------------------------------------
public void createAssociatedObject(RetourProduit item) {
if (item == null) return;
}
public void createAssociatedList(RetourProduit item) {
if (item == null || item.getId() == null) return;
ServiceHelper.createList(item, RetourProduit::getRetourProduitProduit, RetourProduitProduit::setRetourProduit, retourProduitProduitService::create);
}
public void updateAssociatedList(RetourProduit item) {
if (item == null || item.getId() == null) return;
ServiceHelper.updateList(
item, retourProduitProduitService.findByRetourProduitId(item.getId()),
item.getRetourProduitProduit(), RetourProduitProduit::setRetourProduit,
retourProduitProduitService::update,
retourProduitProduitService::delete
);
}
@Transactional(rollbackFor = Exception.class)
public void deleteAssociated(RetourProduit item) {
deleteAssociatedList(item);
deleteAssociatedObjects(item);
}
public void deleteAssociatedList(RetourProduit item) {
retourProduitProduitService.deleteByRetourProduitId(item.getId());
}
public void deleteAssociatedObjects(RetourProduit item) {
ServiceHelper.nullifyInContainer(item.getId(), devisService::findByRetourProduitId, Devis::setRetourProduit, (Devis value) -> devisService.update(value));
//ServiceHelper.nullifyInContainer(item.getId(), factureService::findByRetourProduitId, Facture::setRetourProduit, (Facture value) -> factureService.update(value));
}
    public Long findMaxId() {
        return dao.findMaxId();
    }
//----------------------------------------------------------
@Autowired private RetourProduitDao dao;
@Lazy @Autowired private ClientService clientService;
@Lazy @Autowired private RetourProduitProduitService retourProduitProduitService;
@Lazy @Autowired private EntrepriseService entrepriseService;
@Lazy @Autowired private DevisService devisService;
@Lazy @Autowired private FactureService factureService;
}
