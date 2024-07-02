package org.sir.appgestionstock.service.impl.adresse;
import org.sir.appgestionstock.bean.core.adresse.Pays;
import org.sir.appgestionstock.dao.adresse.PaysDao;
import org.sir.appgestionstock.service.facade.adresse.PaysService;
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
public class PaysServiceImpl implements PaysService {
//--------------- FIND -------------------------------------
public Pays findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<Pays> findAll() {
return dao.findAll();
}
public List<Pays> findAllOptimized() {
return dao.findAllOptimized();
}
@Override
public Pagination<Pays> findPaginated(int page, int size) {
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
public Pays create(Pays item) {
if (item == null) return null;

return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<Pays> create(List<Pays> items) {
List<Pays> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public Pays update(Pays item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown Pays To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<Pays> update(List<Pays> items) {
List<Pays> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
Pays item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(Pays item) {
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<Pays> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
dao.deleteByIdIn(ids);
}
//--------------- FIND AND DELETE BYs ----------------------
//----------------------------------------------------------
//----------------------------------------------------------
@Autowired private PaysDao dao;
}
