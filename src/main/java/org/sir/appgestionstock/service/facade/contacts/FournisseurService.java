package org.sir.appgestionstock.service.facade.contacts;
import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface FournisseurService {
double getNbFournisseurs(Long idEntreprise);
List<Fournisseur> getFournisseurs(Long idEntreprise);

Fournisseur findById(Long id);
List<Fournisseur> findAllOptimized();
List<Fournisseur> findAll();
Pagination<Fournisseur> findPaginated(int page, int size);
Fournisseur create(Fournisseur item);
List<Fournisseur> create(List<Fournisseur> item);
Fournisseur update(Fournisseur item);
List<Fournisseur> update(List<Fournisseur> item);
void deleteById(Long id);
void delete(Fournisseur item);
void delete(List<Fournisseur> items);
void deleteByIdIn(List<Long> ids);
int deleteByAdresseId(Long id);
Fournisseur findByAdresseId(Long id);
int deleteByDevisesId(Long id);
List<Fournisseur> findByDevisesId(Long id);
int deleteByNiveauPrixId(Long id);
List<Fournisseur> findByNiveauPrixId(Long id);
int deleteByTaxeId(Long id);
List<Fournisseur> findByTaxeId(Long id);
int deleteByEntrepriseId(Long id);
List<Fournisseur> findByEntrepriseId(Long id);
    Long findMaxId();
}