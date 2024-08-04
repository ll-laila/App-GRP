package org.sir.appgestionstock.service.impl.parametres;
import org.sir.appgestionstock.bean.core.parametres.MethodePaiement;
import org.sir.appgestionstock.dao.parametres.MethodePaiementDao;
import org.sir.appgestionstock.service.facade.parametres.MethodePaiementService;
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
public class MethodePaiementServiceImpl implements MethodePaiementService {
//--------------- FIND -------------------------------------
public MethodePaiement findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<MethodePaiement> findAll() {
return dao.findAll();
}
public List<MethodePaiement> findAllOptimized() {
return findAll();
}
@Override
public Pagination<MethodePaiement> findPaginated(int page, int size) {
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
public MethodePaiement create(MethodePaiement item) {
if (item == null) return null;
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<MethodePaiement> create(List<MethodePaiement> items) {
List<MethodePaiement> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public MethodePaiement update(MethodePaiement item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown MethodePaiement To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<MethodePaiement> update(List<MethodePaiement> items) {
List<MethodePaiement> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
MethodePaiement item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(MethodePaiement item) {
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<MethodePaiement> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
dao.deleteByIdIn(ids);
}


@Override
public List<MethodePaiement> findByEntreprise(Long id){
    return dao.findByEntreprise(id);
}



//--------------- FIND AND DELETE BYs ----------------------
//----------------------------------------------------------
//----------------------------------------------------------
@Autowired private MethodePaiementDao dao;
}
