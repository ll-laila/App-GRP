package org.sir.appgestionstock.service.impl.inventaire;
import org.sir.appgestionstock.bean.core.inventaire.NiveauStock;
import org.sir.appgestionstock.bean.core.ventes.Paiement;
import org.sir.appgestionstock.dao.inventaire.NiveauStockDao;
import org.sir.appgestionstock.service.facade.inventaire.NiveauStockService;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.service.facade.produit.ProduitService;
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
public class NiveauStockServiceImpl implements NiveauStockService {
//--------------- FIND -------------------------------------
public NiveauStock findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<NiveauStock> findAll() {
return dao.findAll();
}
public List<NiveauStock> findAllOptimized() {
return findAll();
}
@Override
public Pagination<NiveauStock> findPaginated(int page, int size) {
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
public NiveauStock create(NiveauStock item) {
if (item == null) return null;
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
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<NiveauStock> create(List<NiveauStock> items) {
List<NiveauStock> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public NiveauStock update(NiveauStock item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown NiveauStock To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<NiveauStock> update(List<NiveauStock> items) {
List<NiveauStock> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
NiveauStock item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(NiveauStock item) {
deleteAssociated(item);
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<NiveauStock> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
ids.forEach(id -> {
NiveauStock item = findById(id);
if (item != null) {
deleteAssociated(item);
}
});
dao.deleteByIdIn(ids);
}
//--------------- FIND AND DELETE BYs ----------------------
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByEntrepriseId(Long id){
if (id == null) return 0;
List<NiveauStock> found = findByEntrepriseId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByEntrepriseId(id);
}

    @Override
    public List<NiveauStock> getNiveauStock(Long id){
        return dao.findByEntrepriseId(id);
    }

@Override
public List<NiveauStock> findByEntrepriseId(Long id){
return dao.findByEntrepriseId(id);
}
//----------------------------------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteAssociated(NiveauStock item) {
deleteAssociatedObjects(item);
}
public void deleteAssociatedObjects(NiveauStock item) {
ServiceHelper.nullifyInContainer(item.getId(), produitService::findByNiveauStockId, Produit::setNiveauStock, (Produit value) -> produitService.update(value));
}
//----------------------------------------------------------
@Autowired private NiveauStockDao dao;
@Lazy @Autowired private EntrepriseService entrepriseService;
@Lazy @Autowired private ProduitService produitService;
}
