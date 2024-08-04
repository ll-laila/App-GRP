package org.sir.appgestionstock.service.impl.parametres;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.dao.parametres.NiveauPrixDao;
import org.sir.appgestionstock.service.facade.parametres.NiveauPrixService;
import org.sir.appgestionstock.bean.core.produit.ProduitNiveauPrix;
import org.sir.appgestionstock.service.facade.produit.ProduitNiveauPrixService;
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
public class NiveauPrixServiceImpl implements NiveauPrixService {
//--------------- FIND -------------------------------------
public NiveauPrix findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<NiveauPrix> findAll() {
return dao.findAll();
}
public List<NiveauPrix> findAllOptimized() {
return findAll();
}
@Override
public Pagination<NiveauPrix> findPaginated(int page, int size) {
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
public NiveauPrix create(NiveauPrix item) {
if (item == null) return null;
NiveauPrix saved = dao.save(item);
createAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<NiveauPrix> create(List<NiveauPrix> items) {
List<NiveauPrix> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public NiveauPrix update(NiveauPrix item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown NiveauPrix To Be Updated!");
NiveauPrix saved = dao.save(item);
updateAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<NiveauPrix> update(List<NiveauPrix> items) {
List<NiveauPrix> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
NiveauPrix item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(NiveauPrix item) {
deleteAssociated(item);
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<NiveauPrix> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
ids.forEach(id -> {
NiveauPrix item = findById(id);
if (item != null) {
deleteAssociated(item);
}
});
dao.deleteByIdIn(ids);
}
//--------------- FIND AND DELETE BYs ----------------------
//----------------------------------------------------------
public void createAssociatedList(NiveauPrix item) {
if (item == null || item.getId() == null) return;
ServiceHelper.createList(item, NiveauPrix::getProduitNiveauPrix, ProduitNiveauPrix::setNiveauPrix, produitNiveauPrixService::create);
}
public void updateAssociatedList(NiveauPrix item) {
if (item == null || item.getId() == null) return;
ServiceHelper.updateList(
item, produitNiveauPrixService.findByNiveauPrixId(item.getId()),
item.getProduitNiveauPrix(), ProduitNiveauPrix::setNiveauPrix,
produitNiveauPrixService::update,
produitNiveauPrixService::delete
);
}
@Transactional(rollbackFor = Exception.class)
public void deleteAssociated(NiveauPrix item) {
deleteAssociatedList(item);
}
public void deleteAssociatedList(NiveauPrix item) {
produitNiveauPrixService.deleteByNiveauPrixId(item.getId());
}


@Override
public List<NiveauPrix> findNiveauPrixByEntreprise(Long id){
    return dao.findByEntreprise(id);
}


//----------------------------------------------------------
@Autowired private NiveauPrixDao dao;
@Lazy @Autowired private ProduitNiveauPrixService produitNiveauPrixService;
}
