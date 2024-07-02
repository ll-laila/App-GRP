package org.sir.appgestionstock.service.impl.parametres;
import org.sir.appgestionstock.bean.core.parametres.DestinataireEmploye;
import org.sir.appgestionstock.dao.parametres.DestinataireEmployeDao;
import org.sir.appgestionstock.service.facade.parametres.DestinataireEmployeService;
import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.service.facade.contacts.user.EmployeService;
import org.sir.appgestionstock.bean.core.parametres.Alerte;
import org.sir.appgestionstock.service.facade.parametres.AlerteService;
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
public class DestinataireEmployeServiceImpl implements DestinataireEmployeService {
//--------------- FIND -------------------------------------
public DestinataireEmploye findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<DestinataireEmploye> findAll() {
return dao.findAll();
}
public List<DestinataireEmploye> findAllOptimized() {
return findAll();
}
@Override
public Pagination<DestinataireEmploye> findPaginated(int page, int size) {
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
public DestinataireEmploye create(DestinataireEmploye item) {
if (item == null) return null;
// check if employe exists
var employe = item.getEmploye();
if (employe != null) {
if(employe.getId() == null) item.setEmploye(null);
else {
var found = employeService.findById(employe.getId());
if (found == null) throw new NotFoundException("Unknown Given Employe");
item.setEmploye(found);
}
}
// check if alerte exists
var alerte = item.getAlerte();
if (alerte != null) {
if(alerte.getId() == null) item.setAlerte(null);
else {
var found = alerteService.findById(alerte.getId());
if (found == null) throw new NotFoundException("Unknown Given Alerte");
item.setAlerte(found);
}
}
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<DestinataireEmploye> create(List<DestinataireEmploye> items) {
List<DestinataireEmploye> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public DestinataireEmploye update(DestinataireEmploye item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown DestinataireEmploye To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<DestinataireEmploye> update(List<DestinataireEmploye> items) {
List<DestinataireEmploye> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
DestinataireEmploye item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(DestinataireEmploye item) {
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<DestinataireEmploye> items) {
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
public int deleteByEmployeId(Long id){
if (id == null) return 0;
return dao.deleteByEmployeId(id);
}
@Override
public List<DestinataireEmploye> findByEmployeId(Long id){
return dao.findByEmployeId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByAlerteId(Long id){
if (id == null) return 0;
return dao.deleteByAlerteId(id);
}
@Override
public List<DestinataireEmploye> findByAlerteId(Long id){
return dao.findByAlerteId(id);
}
//----------------------------------------------------------
//----------------------------------------------------------
@Autowired private DestinataireEmployeDao dao;
@Lazy @Autowired private EmployeService employeService;
@Lazy @Autowired private AlerteService alerteService;
}
