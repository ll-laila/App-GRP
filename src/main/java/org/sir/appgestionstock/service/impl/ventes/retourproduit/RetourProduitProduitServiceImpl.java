package org.sir.appgestionstock.service.impl.ventes.retourproduit;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduitProduit;
import org.sir.appgestionstock.dao.ventes.retourproduit.RetourProduitProduitDao;
import org.sir.appgestionstock.service.facade.ventes.retourproduit.RetourProduitProduitService;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.service.facade.produit.ProduitService;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduit;
import org.sir.appgestionstock.service.facade.ventes.retourproduit.RetourProduitService;
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
public class RetourProduitProduitServiceImpl implements RetourProduitProduitService {
//--------------- FIND -------------------------------------
public RetourProduitProduit findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<RetourProduitProduit> findAll() {
return dao.findAll();
}
public List<RetourProduitProduit> findAllOptimized() {
return findAll();
}
@Override
public Pagination<RetourProduitProduit> findPaginated(int page, int size) {
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
public RetourProduitProduit create(RetourProduitProduit item) {
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
// check if retourProduit exists
var retourProduit = item.getRetourProduit();
if (retourProduit != null) {
if(retourProduit.getId() == null) item.setRetourProduit(null);
else {
var found = retourProduitService.findById(retourProduit.getId());
if (found == null) throw new NotFoundException("Unknown Given RetourProduit");
item.setRetourProduit(found);
}
}
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<RetourProduitProduit> create(List<RetourProduitProduit> items) {
List<RetourProduitProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public RetourProduitProduit update(RetourProduitProduit item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown RetourProduitProduit To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<RetourProduitProduit> update(List<RetourProduitProduit> items) {
List<RetourProduitProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
RetourProduitProduit item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(RetourProduitProduit item) {
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<RetourProduitProduit> items) {
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
public List<RetourProduitProduit> findByProduitId(Long id){
return dao.findByProduitId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByRetourProduitId(Long id){
if (id == null) return 0;
return dao.deleteByRetourProduitId(id);
}
    public Long findMaxId() {
        return dao.findMaxId();
    }
@Override
public List<RetourProduitProduit> findByRetourProduitId(Long id){
return dao.findByRetourProduitId(id);
}
//----------------------------------------------------------
//----------------------------------------------------------
@Autowired private RetourProduitProduitDao dao;
@Lazy @Autowired private ProduitService produitService;
@Lazy @Autowired private RetourProduitService retourProduitService;
}
