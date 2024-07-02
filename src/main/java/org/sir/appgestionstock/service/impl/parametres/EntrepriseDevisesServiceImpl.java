package org.sir.appgestionstock.service.impl.parametres;
import org.sir.appgestionstock.bean.core.parametres.EntrepriseDevises;
import org.sir.appgestionstock.dao.parametres.EntrepriseDevisesDao;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseDevisesService;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.service.facade.parametres.DevisesService;
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
public class EntrepriseDevisesServiceImpl implements EntrepriseDevisesService {
//--------------- FIND -------------------------------------
public EntrepriseDevises findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<EntrepriseDevises> findAll() {
return dao.findAll();
}
public List<EntrepriseDevises> findAllOptimized() {
return findAll();
}
@Override
public Pagination<EntrepriseDevises> findPaginated(int page, int size) {
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
public EntrepriseDevises create(EntrepriseDevises item) {
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
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<EntrepriseDevises> create(List<EntrepriseDevises> items) {
List<EntrepriseDevises> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public EntrepriseDevises update(EntrepriseDevises item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown EntrepriseDevises To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<EntrepriseDevises> update(List<EntrepriseDevises> items) {
List<EntrepriseDevises> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
EntrepriseDevises item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(EntrepriseDevises item) {
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<EntrepriseDevises> items) {
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
public int deleteByEntrepriseId(Long id){
if (id == null) return 0;
return dao.deleteByEntrepriseId(id);
}
@Override
public List<EntrepriseDevises> findByEntrepriseId(Long id){
return dao.findByEntrepriseId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByDevisesId(Long id){
if (id == null) return 0;
return dao.deleteByDevisesId(id);
}
@Override
public List<EntrepriseDevises> findByDevisesId(Long id){
return dao.findByDevisesId(id);
}
//----------------------------------------------------------
//----------------------------------------------------------
@Autowired private EntrepriseDevisesDao dao;
@Lazy @Autowired private EntrepriseService entrepriseService;
@Lazy @Autowired private DevisesService devisesService;
}
