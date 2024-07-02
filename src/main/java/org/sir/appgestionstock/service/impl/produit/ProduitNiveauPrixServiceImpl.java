package org.sir.appgestionstock.service.impl.produit;
import org.sir.appgestionstock.bean.core.produit.ProduitNiveauPrix;
import org.sir.appgestionstock.dao.produit.ProduitNiveauPrixDao;
import org.sir.appgestionstock.service.facade.produit.ProduitNiveauPrixService;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.service.facade.produit.ProduitService;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.service.facade.parametres.NiveauPrixService;
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
public class ProduitNiveauPrixServiceImpl implements ProduitNiveauPrixService {
//--------------- FIND -------------------------------------
public ProduitNiveauPrix findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<ProduitNiveauPrix> findAll() {
return dao.findAll();
}
public List<ProduitNiveauPrix> findAllOptimized() {
return findAll();
}
@Override
public Pagination<ProduitNiveauPrix> findPaginated(int page, int size) {
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
public ProduitNiveauPrix create(ProduitNiveauPrix item) {
if (item == null) return null;
// check if produit exists
var produit = item.getProduit();
if (produit != null) {
if(produit.getId() == null) item.setProduit(null);
else {
var found = produitService.findById(produit.getId());
if (found == null) throw new NotFoundException("Unknown Given Produit");
item.setProduit(found);
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
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<ProduitNiveauPrix> create(List<ProduitNiveauPrix> items) {
List<ProduitNiveauPrix> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public ProduitNiveauPrix update(ProduitNiveauPrix item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown ProduitNiveauPrix To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<ProduitNiveauPrix> update(List<ProduitNiveauPrix> items) {
List<ProduitNiveauPrix> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
ProduitNiveauPrix item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(ProduitNiveauPrix item) {
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<ProduitNiveauPrix> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
dao.deleteByIdIn(ids);
}
//--------------- FIND AND DELETE BYs ----------------------
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByProduitId(Long id){
if (id == null) return 0;
return dao.deleteByProduitId(id);
}
@Override
public List<ProduitNiveauPrix> findByProduitId(Long id){
return dao.findByProduitId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByNiveauPrixId(Long id){
if (id == null) return 0;
return dao.deleteByNiveauPrixId(id);
}
@Override
public List<ProduitNiveauPrix> findByNiveauPrixId(Long id){
return dao.findByNiveauPrixId(id);
}
//----------------------------------------------------------
//----------------------------------------------------------
@Autowired private ProduitNiveauPrixDao dao;
@Lazy @Autowired private ProduitService produitService;
@Lazy @Autowired private NiveauPrixService niveauPrixService;
}
