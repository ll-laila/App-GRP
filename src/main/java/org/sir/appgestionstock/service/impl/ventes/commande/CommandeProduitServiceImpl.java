package org.sir.appgestionstock.service.impl.ventes.commande;
import org.sir.appgestionstock.bean.core.ventes.commande.CommandeProduit;
import org.sir.appgestionstock.dao.ventes.commande.CommandeProduitDao;
import org.sir.appgestionstock.service.facade.ventes.commande.CommandeProduitService;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.service.facade.produit.ProduitService;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.sir.appgestionstock.service.facade.ventes.commande.CommandeService;
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
public class CommandeProduitServiceImpl implements CommandeProduitService {
//--------------- FIND -------------------------------------
public CommandeProduit findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<CommandeProduit> findAll() {
return dao.findAll();
}
public List<CommandeProduit> findAllOptimized() {
return findAll();
}
@Override
public Pagination<CommandeProduit> findPaginated(int page, int size) {
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
public CommandeProduit create(CommandeProduit item) {
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
// check if commande exists
var commande = item.getCommande();
if (commande != null) {
if(commande.getId() == null) item.setCommande(null);
else {
var found = commandeService.findById(commande.getId());
if (found == null) throw new NotFoundException("Unknown Given Commande");
item.setCommande(found);
}
}
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<CommandeProduit> create(List<CommandeProduit> items) {
List<CommandeProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public CommandeProduit update(CommandeProduit item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown CommandeProduit To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<CommandeProduit> update(List<CommandeProduit> items) {
List<CommandeProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
CommandeProduit item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(CommandeProduit item) {
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<CommandeProduit> items) {
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
public List<CommandeProduit> findByProduitId(Long id){
return dao.findByProduitId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByCommandeId(Long id){
if (id == null) return 0;
return dao.deleteByCommandeId(id);
}
    public Long findMaxId() {
        return dao.findMaxId();
    }
@Override
public List<CommandeProduit> findByCommandeId(Long id){
return dao.findByCommandeId(id);
}
//----------------------------------------------------------
//----------------------------------------------------------
@Autowired private CommandeProduitDao dao;
@Lazy @Autowired private ProduitService produitService;
@Lazy @Autowired private CommandeService commandeService;
}
