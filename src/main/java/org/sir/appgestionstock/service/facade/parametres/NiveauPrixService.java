package org.sir.appgestionstock.service.facade.parametres;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.produit.ProduitNiveauPrix;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface NiveauPrixService {
NiveauPrix findById(Long id);
List<NiveauPrix> findAllOptimized();
List<NiveauPrix> findAll();
Pagination<NiveauPrix> findPaginated(int page, int size);
NiveauPrix create(NiveauPrix item);
List<NiveauPrix> create(List<NiveauPrix> item);
NiveauPrix update(NiveauPrix item);
List<NiveauPrix> update(List<NiveauPrix> item);
void deleteById(Long id);
void delete(NiveauPrix item);
void delete(List<NiveauPrix> items);
void deleteByIdIn(List<Long> ids);

List<NiveauPrix> findNiveauPrixByEntreprise(Long id);
}