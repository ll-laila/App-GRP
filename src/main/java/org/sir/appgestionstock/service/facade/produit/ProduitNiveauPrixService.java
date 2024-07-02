package org.sir.appgestionstock.service.facade.produit;
import org.sir.appgestionstock.bean.core.produit.ProduitNiveauPrix;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface ProduitNiveauPrixService {
ProduitNiveauPrix findById(Long id);
List<ProduitNiveauPrix> findAllOptimized();
List<ProduitNiveauPrix> findAll();
Pagination<ProduitNiveauPrix> findPaginated(int page, int size);
ProduitNiveauPrix create(ProduitNiveauPrix item);
List<ProduitNiveauPrix> create(List<ProduitNiveauPrix> item);
ProduitNiveauPrix update(ProduitNiveauPrix item);
List<ProduitNiveauPrix> update(List<ProduitNiveauPrix> item);
void deleteById(Long id);
void delete(ProduitNiveauPrix item);
void delete(List<ProduitNiveauPrix> items);
void deleteByIdIn(List<Long> ids);
int deleteByProduitId(Long id);
List<ProduitNiveauPrix> findByProduitId(Long id);
int deleteByNiveauPrixId(Long id);
List<ProduitNiveauPrix> findByNiveauPrixId(Long id);
}