package org.sir.appgestionstock.service.impl.parametres;
import org.sir.appgestionstock.bean.core.parametres.Alerte;
import org.sir.appgestionstock.dao.parametres.AlerteDao;
import org.sir.appgestionstock.service.facade.parametres.AlerteService;
import org.sir.appgestionstock.bean.core.parametres.DestinataireEmploye;
import org.sir.appgestionstock.service.facade.parametres.DestinataireEmployeService;
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
public class AlerteServiceImpl implements AlerteService {
//--------------- FIND -------------------------------------
public Alerte findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<Alerte> findAll() {
return dao.findAll();
}
public List<Alerte> findAllOptimized() {
return findAll();
}
@Override
public Pagination<Alerte> findPaginated(int page, int size) {
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

    @Override
    public Alerte create(Alerte item) {
        return null;
    }
//--------------- CREATE -----------------------------------

@Transactional(rollbackFor = Exception.class)
public List<Alerte> create(List<Alerte> items) {
List<Alerte> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public Alerte update(Alerte item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown Alerte To Be Updated!");
Alerte saved = dao.save(item);
updateAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<Alerte> update(List<Alerte> items) {
List<Alerte> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
Alerte item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(Alerte item) {
deleteAssociated(item);
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<Alerte> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
ids.forEach(id -> {
Alerte item = findById(id);
if (item != null) {
deleteAssociated(item);
}
});
dao.deleteByIdIn(ids);
}

//----------------------------------------------------------
public void createAssociatedList(Alerte item) {
if (item == null || item.getId() == null) return;
ServiceHelper.createList(item, Alerte::getDestinataireEmploye, DestinataireEmploye::setAlerte, destinataireEmployeService::create);
}
public void updateAssociatedList(Alerte item) {
if (item == null || item.getId() == null) return;
ServiceHelper.updateList(
item, destinataireEmployeService.findByAlerteId(item.getId()),
item.getDestinataireEmploye(), DestinataireEmploye::setAlerte,
destinataireEmployeService::update,
destinataireEmployeService::delete
);
}
@Transactional(rollbackFor = Exception.class)
public void deleteAssociated(Alerte item) {
deleteAssociatedList(item);
}
public void deleteAssociatedList(Alerte item) {
destinataireEmployeService.deleteByAlerteId(item.getId());
}
//----------------------------------------------------------
@Autowired private AlerteDao dao;
@Lazy @Autowired private DestinataireEmployeService destinataireEmployeService;

}
