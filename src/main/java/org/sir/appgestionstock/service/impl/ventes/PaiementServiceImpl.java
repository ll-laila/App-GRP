package org.sir.appgestionstock.service.impl.ventes;
import org.sir.appgestionstock.bean.core.ventes.Paiement;
import org.sir.appgestionstock.dao.ventes.PaiementDao;
import org.sir.appgestionstock.service.facade.ventes.PaiementService;
import org.sir.appgestionstock.bean.core.parametres.MethodePaiement;
import org.sir.appgestionstock.service.facade.parametres.MethodePaiementService;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.service.facade.parametres.EntrepriseService;
import org.sir.appgestionstock.bean.core.ventes.devis.Devis;
import org.sir.appgestionstock.service.facade.ventes.devis.DevisService;
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

import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;
import java.util.Objects;

@Service
public class PaiementServiceImpl implements PaiementService {

//--------------- FIND -------------------------------------

    public Paiement findByIdFacture(Long id){
        return dao.findByIdFacture(id);
    }

    public Paiement findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<Paiement> findAll() {
return dao.findAll();
}
public List<Paiement> findAllOptimized() {
return findAll();
}
@Override
public Pagination<Paiement> findPaginated(int page, int size) {
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
public Paiement create(Paiement item) {
if (item == null) return null;
// check if methodePaiement exists
var methodePaiement = item.getMethodePaiement();
if (methodePaiement != null) {
if(methodePaiement.getId() == null) item.setMethodePaiement(null);
else {
var found = methodePaiementService.findById(methodePaiement.getId());
if (found == null) throw new NotFoundException("Unknown Given MethodePaiement");
item.setMethodePaiement(found);
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
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<Paiement> create(List<Paiement> items) {
List<Paiement> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public Paiement update(Paiement item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown Paiement To Be Updated!");
item.setMontantPaye(oldItem.getMontantPaye()+item.getMontantPaye());
item.setDatePaiement(LocalDate.now());
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<Paiement> update(List<Paiement> items) {
List<Paiement> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
Paiement item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(Paiement item) {
deleteAssociated(item);
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<Paiement> items) {
if (items == null || items.isEmpty()) return;
items.forEach(this::delete);
}
@Transactional(rollbackFor = Exception.class)
public void deleteByIdIn(List<Long> ids) {
ids.forEach(id -> {
Paiement item = findById(id);
if (item != null) {
deleteAssociated(item);
}
});
dao.deleteByIdIn(ids);
}
//--------------- FIND AND DELETE BYs ----------------------
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByMethodePaiementId(Long id){
if (id == null) return 0;
List<Paiement> found = findByMethodePaiementId(id);
if (found == null) return 0;
//found.forEach(this::deleteAssociated);
return dao.deleteByMethodePaiementId(id);
}
@Override
public List<Paiement> findByMethodePaiementId(Long id){
return dao.findByMethodePaiementId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByEntrepriseId(Long id){
if (id == null) return 0;
List<Paiement> found = findByEntrepriseId(id);
if (found == null) return 0;
found.forEach(this::deleteAssociated);
return dao.deleteByEntrepriseId(id);
}
@Override
public List<Paiement> findByEntrepriseId(Long id){
return dao.findByEntrepriseId(id);
}
//----------------------------------------------------------

@Transactional(rollbackFor = Exception.class)
public void deleteAssociated(Paiement item) {
deleteAssociatedObjects(item);
}

public void deleteAssociatedObjects(Paiement item) {
ServiceHelper.nullifyInContainer(item.getId(), devisService::findByPaiementId, Devis::setPaiement, (Devis value) -> devisService.update(value));
ServiceHelper.nullifyInContainer(item.getId(), factureService::findByPaiementId, Facture::setPaiement, (Facture value) -> factureService.update(value));
}


    @Override
    public double getIncome(Long entrepriseId) {
        List<Paiement> paiements = dao.findByIdEntreprise(entrepriseId);
        double sommeTotale = 0;


        for (Paiement paiement : paiements) {
            MethodePaiement m = methodePaiementService.findById(paiement.getMethodePaiement().getId());

            if (!m.getNom().equals("Bon d'achat")) {
                sommeTotale += paiement.getMontantPaye();
            }
        }

        return sommeTotale;
    }



    @Override
    public List<Paiement> getPaiements(Long id){
        return dao.findByIdEntreprise(id);
    }



//----------------------------------------------------------
@Autowired private PaiementDao dao;
@Lazy @Autowired private MethodePaiementService methodePaiementService;
@Lazy @Autowired private EntrepriseService entrepriseService;
@Lazy @Autowired private DevisService devisService;
@Lazy @Autowired private FactureService factureService;
}
