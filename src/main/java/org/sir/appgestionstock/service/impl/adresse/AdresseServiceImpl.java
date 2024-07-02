package org.sir.appgestionstock.service.impl.adresse;
import org.sir.appgestionstock.bean.core.adresse.Adresse;

import org.sir.appgestionstock.dao.adresse.AdresseDao;
import org.sir.appgestionstock.service.facade.adresse.AdresseService;
import org.sir.appgestionstock.service.facade.adresse.PaysService;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.sir.appgestionstock.service.facade.contacts.FournisseurService;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.sir.appgestionstock.service.facade.ventes.commande.CommandeService;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.service.facade.contacts.ClientService;
import org.sir.appgestionstock.bean.core.contacts.user.Employe;
import org.sir.appgestionstock.service.facade.contacts.user.EmployeService;
import org.sir.appgestionstock.bean.core.ventes.facture.Facture;
import org.sir.appgestionstock.service.facade.ventes.facture.FactureService;
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
public class AdresseServiceImpl implements AdresseService {
//--------------- FIND -------------------------------------
public Adresse findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<Adresse> findAll() {
return dao.findAll();
}
public List<Adresse> findAllOptimized() {
return findAll();
}
@Override
public Pagination<Adresse> findPaginated(int page, int size) {
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
public Adresse create(Adresse item) {
if (item == null) return null;
// check if pays exists
var pays = item.getPays();
if (pays != null) {
if(pays.getId() == null) item.setPays(null);
else {
var found = paysService.findById(pays.getId());
if (found == null) throw new NotFoundException("Unknown Given Pays");
item.setPays(found);
}
}
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<Adresse> create(List<Adresse> items) {
List<Adresse> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public Adresse update(Adresse item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown Adresse To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<Adresse> update(List<Adresse> items) {
List<Adresse> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
Adresse item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(Adresse item) {
deleteAssociated(item);
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<Adresse> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
ids.forEach(id -> {
Adresse item = findById(id);
if (item != null) {
deleteAssociated(item);
}
});
dao.deleteByIdIn(ids);
}
//--------------- FIND AND DELETE BYs ----------------------
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByPaysId(Long id){
if (id == null) return 0;
List<Adresse> found = findByPaysId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByPaysId(id);
}
@Override
public List<Adresse> findByPaysId(Long id){
return dao.findByPaysId(id);
}
//----------------------------------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteAssociated(Adresse item) {
deleteAssociatedObjects(item);
}
public void deleteAssociatedObjects(Adresse item) {
ServiceHelper.nullifyInContainer(item.getId(), entrepriseService::findByAdresseId, Entreprise::setAdresse, (Entreprise value) -> entrepriseService.update(value));
ServiceHelper.nullifyInContainer(item.getId(), fournisseurService::findByAdresseId, Fournisseur::setAdresse, (Fournisseur value) -> fournisseurService.update(value));
ServiceHelper.nullifyInContainer(item.getId(), commandeService::findByAddressFacturationId, Commande::setAddressFacturation, (Commande value) -> commandeService.update(value));
ServiceHelper.nullifyInContainer(item.getId(), commandeService::findByAddressExpeditionId, Commande::setAddressExpedition, (Commande value) -> commandeService.update(value));
ServiceHelper.nullifyInContainer(item.getId(), clientService::findByAdresseId, Client::setAdresse, (Client value) -> clientService.update(value));

ServiceHelper.nullifyInContainer(item.getId(), employeService::findByAdresseId, Employe::setAdresse, (Employe value) -> employeService.update(value));
ServiceHelper.nullifyInContainer(item.getId(), factureService::findByAddressFacturationId, Facture::setAddressFacturation, (Facture value) -> factureService.update(value));
ServiceHelper.nullifyInContainer(item.getId(), factureService::findByAddressExpeditionId, Facture::setAddressExpedition, (Facture value) -> factureService.update(value));
}
//----------------------------------------------------------
@Autowired private AdresseDao dao;
@Lazy @Autowired private PaysService paysService;
@Lazy @Autowired private EntrepriseService entrepriseService;
@Lazy @Autowired private FournisseurService fournisseurService;
@Lazy @Autowired private CommandeService commandeService;
@Lazy @Autowired private ClientService clientService;

@Lazy @Autowired private EmployeService employeService;
@Lazy @Autowired private FactureService factureService;
}
