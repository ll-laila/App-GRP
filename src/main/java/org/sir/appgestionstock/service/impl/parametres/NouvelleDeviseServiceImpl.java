package org.sir.appgestionstock.service.impl.parametres;
import org.sir.appgestionstock.bean.core.parametres.NouvelleDevise;
import org.sir.appgestionstock.dao.parametres.NouvelleDeviseDao;
import org.sir.appgestionstock.service.facade.parametres.NouvelleDeviseService;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
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
public class NouvelleDeviseServiceImpl implements NouvelleDeviseService {
//--------------- FIND -------------------------------------
public NouvelleDevise findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<NouvelleDevise> findAll() {
return dao.findAll();
}
public List<NouvelleDevise> findAllOptimized() {
return findAll();
}
@Override
public Pagination<NouvelleDevise> findPaginated(int page, int size) {
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
public NouvelleDevise create(NouvelleDevise item) {
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
public List<NouvelleDevise> create(List<NouvelleDevise> items) {
List<NouvelleDevise> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public NouvelleDevise update(NouvelleDevise item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown NouvelleDevise To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<NouvelleDevise> update(List<NouvelleDevise> items) {
List<NouvelleDevise> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
NouvelleDevise item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(NouvelleDevise item) {
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<NouvelleDevise> items) {
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
public List<NouvelleDevise> findByEntrepriseId(Long id){
return dao.findByEntreprise(id);
}
//----------------------------------------------------------
//----------------------------------------------------------
@Autowired private NouvelleDeviseDao dao;
@Lazy @Autowired private EntrepriseService entrepriseService;
}
