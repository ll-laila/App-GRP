package org.sir.appgestionstock.service.facade.inventaire.boncommande;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommande;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommandeProduit;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.bean.core.inventaire.livraison.Livraison;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.zutils.pagination.Pagination;
import java.util.List;
public interface BonCommandeService {
double getCout(Long id);
double getNbrAchats(Long id);
List<BonCommande> getBonCommandes(Long id);
BonCommande findById(Long id);
List<BonCommande> findAllOptimized();
List<BonCommande> findAll();
List<BonCommande> findAllByIdFor(Long id);

Pagination<BonCommande> findPaginated(int page, int size);
BonCommande create(BonCommande item);
List<BonCommande> create(List<BonCommande> item);
BonCommande update(BonCommande item);
List<BonCommande> update(List<BonCommande> item);
void deleteById(Long id);
void delete(BonCommande item);
void delete(List<BonCommande> items);
void deleteByIdIn(List<Long> ids);
int deleteByLivraisonId(Long id);
BonCommande findByLivraisonId(Long id);
int deleteByTaxeId(Long id);
List<BonCommande> findByTaxeId(Long id);
int deleteByTaxeExpeditionId(Long id);
List<BonCommande> findByTaxeExpeditionId(Long id);
int deleteByFournisseurId(Long id);
List<BonCommande> findByFournisseurId(Long id);
int deleteByDevisesId(Long id);
List<BonCommande> findByDevisesId(Long id);
int deleteByNiveauPrixId(Long id);
List<BonCommande> findByNiveauPrixId(Long id);
int deleteByEntrepriseId(Long id);
List<BonCommande> findByEntrepriseId(Long id);
    void bonCmdLivraispn(Long idC,Long idL);

    Long findMaxId();
}