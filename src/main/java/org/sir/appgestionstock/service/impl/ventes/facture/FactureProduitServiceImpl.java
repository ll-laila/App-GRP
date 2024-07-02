package org.sir.appgestionstock.service.impl.ventes.facture;
import org.sir.appgestionstock.bean.core.produit.ProduitNiveauPrix;
import org.sir.appgestionstock.bean.core.ventes.facture.FactureProduit;
import org.sir.appgestionstock.bean.enums.TypeRabaisEnum;
import org.sir.appgestionstock.dao.ventes.facture.FactureProduitDao;
import org.sir.appgestionstock.service.facade.contacts.ClientService;
import org.sir.appgestionstock.service.facade.ventes.facture.FactureProduitService;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.service.facade.produit.ProduitService;
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
public class FactureProduitServiceImpl implements FactureProduitService {
//--------------- FIND -------------------------------------
public FactureProduit findById(Long id) {
return dao.findById(id).orElse(null);
}
public List<FactureProduit> findAll() {
return dao.findAll();
}
public List<FactureProduit> findAllOptimized() {
return findAll();
}
@Override
public Pagination<FactureProduit> findPaginated(int page, int size) {
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
public FactureProduit create(FactureProduit item) {
    if (item == null) return null;


// check if produit exists
    var produit = item.getProduit();
    if (produit != null && produit.getId() != null) {
        var found = produitService.findById(produit.getId());
        if (found == null) throw new NotFoundException("Unknown Given Produit");
        item.setProduit(found);
    }
// check if facture exists
    var facture = item.getFacture();
    if (facture != null && facture.getId() != null) {
        var found = factureService.findById(facture.getId());
        if (found == null) throw new NotFoundException("Unknown Given Facture");
        item.setFacture(found);
    }
    return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<FactureProduit> create(List<FactureProduit> items) {
List<FactureProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(create(it)));
return result;
}
//--------------- UPDATE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public FactureProduit update(FactureProduit item) {
if (item == null || item.getId() == null) return null;
var oldItem = findById(item.getId());
if (oldItem == null) throw new NotFoundException("Unknown FactureProduit To Be Updated!");
return dao.save(item);
}
@Transactional(rollbackFor = Exception.class)
public List<FactureProduit> update(List<FactureProduit> items) {
List<FactureProduit> result = new ArrayList<>();
if (items == null || items.isEmpty()) return result;
items.forEach(it -> result.add(update(it)));
return result;
}
//--------------- DELETE -----------------------------------
@Transactional(rollbackFor = Exception.class)
public void deleteById(Long id) {
FactureProduit item = findById(id);
if (item != null) delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(FactureProduit item) {
dao.delete(item);
}
@Transactional(rollbackFor = Exception.class)
public void delete(List<FactureProduit> items) {
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
public int deleteByProduitId(Long id){
if (id == null) return 0;
return dao.deleteByProduitId(id);
}
@Override
public List<FactureProduit> findByProduitId(Long id){
return dao.findByProduitId(id);
}
@Override
@Transactional(rollbackFor = Exception.class)
public int deleteByFactureId(Long id){
if (id == null) return 0;
return dao.deleteByFactureId(id);
}

    @Transactional(rollbackFor = Exception.class)
    public FactureProduit calculerTotal(FactureProduit item) {
        if (item == null) return null;
        if (true) {
            double prixProduit = item.getProduit().getProduitNiveauPrix().getFirst().getPrix();
            double sousTotal = item.getQuantite() * prixProduit;
            double taxeFacture = item.getFacture().getTaxe() != null ? item.getFacture().getTaxe().getTauxImposition() : 0.0;
            double taxeProduit = item.getProduit().getTaxe() != null ? item.getProduit().getTaxe().getTauxImposition() : 0.0;
            double taxeExpedition = item.getFacture().getTaxeExpedition() != null ? item.getFacture().getTaxeExpedition().getTauxImposition() : 0.0;
            double disponible = item.getProduit().getNiveauStockInitial() - item.getQuantite();
            item.setDisponible(disponible);
            if (item.getFacture().getTypeRabais() != null && item.getFacture().getTypeRabais() == TypeRabaisEnum.POURCENTAGE) {
                double totalAvecTaxe = sousTotal * (1 + ((taxeFacture + taxeProduit + taxeExpedition) / 100));
                double reduction = totalAvecTaxe * (item.getDisque() / 100);
                double totalFinal = totalAvecTaxe - reduction;
                item.setTotal(totalFinal);
            }
            if (item.getFacture().getTypeRabais() != null && item.getFacture().getTypeRabais() == TypeRabaisEnum.MONTANT) {
                double totalAvecTaxe = sousTotal * (1 + ((taxeFacture + taxeProduit + taxeExpedition) / 100));
                double reduction = item.getFacture().getRabais();
                double totalFinal = totalAvecTaxe - reduction;
                item.setTotal(totalFinal);
            }
        } else {
            item.getFacture().setSousTotal(0);
            item.setTotal(0);
        }
        return item;
    }

        public Long findMaxId() {
        return dao.findMaxId();
    }

        @Override
public List<FactureProduit> findByFactureId(Long id){
return dao.findByFactureId(id);
}
//----------------------------------------------------------
//----------------------------------------------------------
@Autowired private FactureProduitDao dao;
@Lazy @Autowired private ProduitService produitService;
@Lazy @Autowired private FactureService factureService;
}
