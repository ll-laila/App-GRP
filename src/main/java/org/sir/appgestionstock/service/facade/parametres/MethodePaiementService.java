package org.sir.appgestionstock.service.facade.parametres;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.bean.core.parametres.MethodePaiement;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface MethodePaiementService {
MethodePaiement findById(Long id);
List<MethodePaiement> findAllOptimized();
List<MethodePaiement> findAll();
Pagination<MethodePaiement> findPaginated(int page, int size);
MethodePaiement create(MethodePaiement item);
List<MethodePaiement> create(List<MethodePaiement> item);
MethodePaiement update(MethodePaiement item);
List<MethodePaiement> update(List<MethodePaiement> item);
void deleteById(Long id);
void delete(MethodePaiement item);
void delete(List<MethodePaiement> items);
void deleteByIdIn(List<Long> ids);

List<MethodePaiement> findByEntreprise(Long id);
}