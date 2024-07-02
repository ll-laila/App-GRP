package org.sir.appgestionstock.service.impl.inventaire.livraison;
import org.sir.appgestionstock.bean.core.inventaire.livraison.LivraisonProduit;
import org.sir.appgestionstock.dao.inventaire.livraison.LivraisonProduitDao;
import org.sir.appgestionstock.service.facade.inventaire.livraison.LivraisonProduitService;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.service.facade.produit.ProduitService;
import org.sir.appgestionstock.bean.core.inventaire.livraison.Livraison;
import org.sir.appgestionstock.service.facade.inventaire.livraison.LivraisonService;
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
public class LivraisonProduitServiceImpl implements LivraisonProduitService {
//--------------- FIND -------------------------------------
public LivraisonProduit findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<LivraisonProduit> findAll() {
return dao.findAll();
}
public List<LivraisonProduit> findAllOptimized() {
return findAll();
}
@Override
public Pagination<LivraisonProduit> findPaginated(int page, int size) {
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
public LivraisonProduit create(LivraisonProduit item) {
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
// check if livraison exists
var livraison = item.getLivraison();
if (livraison != null) {
if(livraison.getId() == null) item.setLivraison(null);
else {
var found = livraisonService.findById(livraison.getId());
if (found == null) throw new NotFoundException("Unknown Given Livraison");
item.setLivraison(found);
}
}
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<LivraisonProduit> create(List<LivraisonProduit> items) {
List<LivraisonProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public LivraisonProduit update(LivraisonProduit item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown LivraisonProduit To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<LivraisonProduit> update(List<LivraisonProduit> items) {
List<LivraisonProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
LivraisonProduit item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(LivraisonProduit item) {
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<LivraisonProduit> items) {
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
public List<LivraisonProduit> findByProduitId(Long id){
return dao.findByProduitId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByLivraisonId(Long id){
if (id == null) return 0;
return dao.deleteByLivraisonId(id);
}
    public Long findMaxId() {
        return dao.findMaxId();
    }
@Override
public List<LivraisonProduit> findByLivraisonId(Long id){
return dao.findByLivraisonId(id);
}
//----------------------------------------------------------
//----------------------------------------------------------
@Autowired private LivraisonProduitDao dao;
@Lazy @Autowired private ProduitService produitService;
@Lazy @Autowired private LivraisonService livraisonService;
}
