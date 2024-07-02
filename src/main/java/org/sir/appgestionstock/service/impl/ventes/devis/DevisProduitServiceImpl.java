package org.sir.appgestionstock.service.impl.ventes.devis;
import org.sir.appgestionstock.bean.core.ventes.devis.DevisProduit;
import org.sir.appgestionstock.dao.ventes.devis.DevisProduitDao;
import org.sir.appgestionstock.service.facade.ventes.devis.DevisProduitService;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.service.facade.produit.ProduitService;
import org.sir.appgestionstock.bean.core.ventes.devis.Devis;
import org.sir.appgestionstock.service.facade.ventes.devis.DevisService;
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
public class DevisProduitServiceImpl implements DevisProduitService {
//--------------- FIND -------------------------------------
public DevisProduit findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<DevisProduit> findAll() {
return dao.findAll();
}
public List<DevisProduit> findAllOptimized() {
return findAll();
}
@Override
public Pagination<DevisProduit> findPaginated(int page, int size) {
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
public DevisProduit create(DevisProduit item) {
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
// check if devis exists
var devis = item.getDevis();
if (devis != null) {
if(devis.getId() == null) item.setDevis(null);
else {
var found = devisService.findById(devis.getId());
if (found == null) throw new NotFoundException("Unknown Given Devis");
item.setDevis(found);
}
}
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<DevisProduit> create(List<DevisProduit> items) {
List<DevisProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public DevisProduit update(DevisProduit item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown DevisProduit To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<DevisProduit> update(List<DevisProduit> items) {
List<DevisProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
DevisProduit item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(DevisProduit item) {
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<DevisProduit> items) {
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
public List<DevisProduit> findByProduitId(Long id){
return dao.findByProduitId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByDevisId(Long id){
if (id == null) return 0;
return dao.deleteByDevisId(id);
}
    public Long findMaxId() {
        return dao.findMaxId();
    }
@Override
public List<DevisProduit> findByDevisId(Long id){
return dao.findByDevisId(id);
}
//----------------------------------------------------------
//----------------------------------------------------------
@Autowired private DevisProduitDao dao;
@Lazy @Autowired private ProduitService produitService;
@Lazy @Autowired private DevisService devisService;
}
