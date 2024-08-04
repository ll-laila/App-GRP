package org.sir.appgestionstock.service.impl.parametres;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.dao.parametres.DevisesDao;
import org.sir.appgestionstock.service.facade.parametres.DevisesService;
import org.sir.appgestionstock.bean.core.parametres.NouvelleDevise;
import org.sir.appgestionstock.service.facade.parametres.NouvelleDeviseService;
import org.sir.appgestionstock.bean.core.parametres.EntrepriseDevises;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseDevisesService;
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
public class DevisesServiceImpl implements DevisesService {
//--------------- FIND -------------------------------------
public Devises findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<Devises> findAll() {
return dao.findAll();
}
public List<Devises> findAllOptimized() {
return findAll();
}
@Override
public Pagination<Devises> findPaginated(int page, int size) {
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
public Devises create(Devises item) {
if (item == null) return null;
// check if nouvelleDevise exists
var nouvelleDevise = item.getNouvelleDevise();
if (nouvelleDevise != null) {
if(nouvelleDevise.getId() == null) item.setNouvelleDevise(null);
else {
var found = nouvelleDeviseService.findById(nouvelleDevise.getId());
if (found == null) throw new NotFoundException("Unknown Given NouvelleDevise");
item.setNouvelleDevise(found);
}
}
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
Devises saved = dao.save(item);
createAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<Devises> create(List<Devises> items) {
List<Devises> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public Devises update(Devises item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown Devises To Be Updated!");
Devises saved = dao.save(item);
updateAssociatedList(saved);
return saved;
}
@Transactional(rollbackFor = Exception.class)
public List<Devises> update(List<Devises> items) {
List<Devises> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
Devises item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(Devises item) {
deleteAssociated(item);
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<Devises> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
ids.forEach(id -> {
Devises item = findById(id);
if (item != null) {
deleteAssociated(item);
}
});
dao.deleteByIdIn(ids);
}
//--------------- FIND AND DELETE BYs ----------------------
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByNouvelleDeviseId(Long id){
if (id == null) return 0;
List<Devises> found = findByNouvelleDeviseId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByNouvelleDeviseId(id);
}
@Override
public List<Devises> findByNouvelleDeviseId(Long id){
return dao.findByNouvelleDeviseId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByEntrepriseId(Long id){
if (id == null) return 0;
List<Devises> found = findByEntrepriseId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByEntrepriseId(id);
}
@Override
public List<Devises> findByEntrepriseId(Long id){
return dao.findByEntrepriseId(id);
}

    @Override
    public List<Devises> findByEntreprise(Long id){
        return dao.findByEntreprise(id);
    }

//----------------------------------------------------------
public void createAssociatedList(Devises item) {
if (item == null || item.getId() == null) return;
ServiceHelper.createList(item, Devises::getEntrepriseDevises, EntrepriseDevises::setDevises, entrepriseDevisesService::create);
}
public void updateAssociatedList(Devises item) {
if (item == null || item.getId() == null) return;
ServiceHelper.updateList(
item, entrepriseDevisesService.findByDevisesId(item.getId()),
item.getEntrepriseDevises(), EntrepriseDevises::setDevises,
entrepriseDevisesService::update,
entrepriseDevisesService::delete
);
}
@Transactional(rollbackFor = Exception.class)
public void deleteAssociated(Devises item) {
deleteAssociatedList(item);
}
public void deleteAssociatedList(Devises item) {
entrepriseDevisesService.deleteByDevisesId(item.getId());
}
//----------------------------------------------------------
@Autowired private DevisesDao dao;
@Lazy @Autowired private NouvelleDeviseService nouvelleDeviseService;
@Lazy @Autowired private EntrepriseDevisesService entrepriseDevisesService;
@Lazy @Autowired private EntrepriseService entrepriseService;
}
