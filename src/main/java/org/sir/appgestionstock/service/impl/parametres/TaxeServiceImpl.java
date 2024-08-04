package org.sir.appgestionstock.service.impl.parametres;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.dao.parametres.TaxeDao;
import org.sir.appgestionstock.service.facade.parametres.TaxeService;
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
public class TaxeServiceImpl implements TaxeService {
//--------------- FIND -------------------------------------
public Taxe findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<Taxe> findAll() {
return dao.findAll();
}
public List<Taxe> findAllOptimized() {
return findAll();
}
@Override
public Pagination<Taxe> findPaginated(int page, int size) {
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
public Taxe create(Taxe item) {
if (item == null) return null;
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<Taxe> create(List<Taxe> items) {
List<Taxe> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public Taxe update(Taxe item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown Taxe To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<Taxe> update(List<Taxe> items) {
List<Taxe> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
Taxe item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(Taxe item) {
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<Taxe> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
dao.deleteByIdIn(ids);
}


    @Override
    public List<Taxe> findNiveauPrixByEntreprise(Long id){
        return dao.findByEntreprise(id);
    }


//--------------- FIND AND DELETE BYs ----------------------
//----------------------------------------------------------
//----------------------------------------------------------
@Autowired private TaxeDao dao;
}
