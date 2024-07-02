package org.sir.appgestionstock.service.impl.inventaire.boncommande;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommandeProduit;
import org.sir.appgestionstock.dao.inventaire.boncommande.BonCommandeProduitDao;
import org.sir.appgestionstock.service.facade.inventaire.boncommande.BonCommandeProduitService;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.service.facade.produit.ProduitService;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommande;
import org.sir.appgestionstock.service.facade.inventaire.boncommande.BonCommandeService;
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
public class BonCommandeProduitServiceImpl implements BonCommandeProduitService {
//--------------- FIND -------------------------------------
public BonCommandeProduit findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<BonCommandeProduit> findAll() {
return dao.findAll();
}
public List<BonCommandeProduit> findAllOptimized() {
return findAll();
}
@Override
public Pagination<BonCommandeProduit> findPaginated(int page, int size) {
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
public BonCommandeProduit create(BonCommandeProduit item) {
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
// check if bonCommande exists
var bonCommande = item.getBonCommande();
if (bonCommande != null) {
if(bonCommande.getId() == null) item.setBonCommande(null);
else {
var found = bonCommandeService.findById(bonCommande.getId());
if (found == null) throw new NotFoundException("Unknown Given BonCommande");
item.setBonCommande(found);
}
}
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<BonCommandeProduit> create(List<BonCommandeProduit> items) {
List<BonCommandeProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public BonCommandeProduit update(BonCommandeProduit item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown BonCommandeProduit To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<BonCommandeProduit> update(List<BonCommandeProduit> items) {
List<BonCommandeProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
BonCommandeProduit item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(BonCommandeProduit item) {
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<BonCommandeProduit> items) {
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
public List<BonCommandeProduit> findByProduitId(Long id){
return dao.findByProduitId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByBonCommandeId(Long id){
if (id == null) return 0;
return dao.deleteByBonCommandeId(id);
}
    public Long findMaxId() {
        return dao.findMaxId();
    }
@Override
public List<BonCommandeProduit> findByBonCommandeId(Long id){
return dao.findByBonCommandeId(id);
}
//----------------------------------------------------------
//----------------------------------------------------------
@Autowired private BonCommandeProduitDao dao;
@Lazy @Autowired private ProduitService produitService;
@Lazy @Autowired private BonCommandeService bonCommandeService;
}
