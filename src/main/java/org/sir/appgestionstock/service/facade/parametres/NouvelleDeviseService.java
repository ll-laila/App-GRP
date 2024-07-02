package org.sir.appgestionstock.service.facade.parametres;
import org.sir.appgestionstock.bean.core.parametres.NouvelleDevise;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface NouvelleDeviseService {
NouvelleDevise findById(Long id);
List<NouvelleDevise> findAllOptimized();
List<NouvelleDevise> findAll();
Pagination<NouvelleDevise> findPaginated(int page, int size);
NouvelleDevise create(NouvelleDevise item);
List<NouvelleDevise> create(List<NouvelleDevise> item);
NouvelleDevise update(NouvelleDevise item);
List<NouvelleDevise> update(List<NouvelleDevise> item);
void deleteById(Long id);
void delete(NouvelleDevise item);
void delete(List<NouvelleDevise> items);
void deleteByIdIn(List<Long> ids);
int deleteByEntrepriseId(Long id);
List<NouvelleDevise> findByEntrepriseId(Long id);
}