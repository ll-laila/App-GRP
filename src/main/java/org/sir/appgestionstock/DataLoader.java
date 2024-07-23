package org.sir.appgestionstock;
import org.sir.appgestionstock.bean.core.contacts.user.PermissionsAcces;
import org.sir.appgestionstock.dao.adresse.AdresseDao;
import org.sir.appgestionstock.dao.adresse.PaysDao;
import org.sir.appgestionstock.dao.contacts.ClientDao;
import org.sir.appgestionstock.dao.contacts.FournisseurDao;
import org.sir.appgestionstock.dao.contacts.user.EmployeDao;
import org.sir.appgestionstock.dao.inventaire.NiveauStockDao;
import org.sir.appgestionstock.dao.inventaire.boncommande.BonCommandeDao;
import org.sir.appgestionstock.dao.inventaire.boncommande.BonCommandeProduitDao;
import org.sir.appgestionstock.dao.inventaire.livraison.LivraisonDao;
import org.sir.appgestionstock.dao.inventaire.livraison.LivraisonProduitDao;
import org.sir.appgestionstock.dao.parametres.*;
import org.sir.appgestionstock.dao.produit.ProduitDao;
import org.sir.appgestionstock.dao.produit.ProduitNiveauPrixDao;
import org.sir.appgestionstock.dao.ventes.PaiementDao;
import org.sir.appgestionstock.dao.ventes.commande.CommandeDao;
import org.sir.appgestionstock.dao.ventes.commande.CommandeProduitDao;
import org.sir.appgestionstock.dao.ventes.devis.DevisDao;
import org.sir.appgestionstock.dao.ventes.devis.DevisProduitDao;

import org.sir.appgestionstock.dao.ventes.facture.FactureDao;
import org.sir.appgestionstock.dao.ventes.facture.FactureProduitDao;

import org.sir.appgestionstock.dao.ventes.retourproduit.RetourProduitDao;
import org.sir.appgestionstock.dao.ventes.retourproduit.RetourProduitProduitDao;
import org.sir.appgestionstock.zsecurity.entity.AppUser;
import org.sir.appgestionstock.zsecurity.entity.Role;
import org.sir.appgestionstock.zsecurity.service.facade.AppUserService;
import org.sir.appgestionstock.zsecurity.service.facade.RoleService;
import org.sir.appgestionstock.zsecurity.permissions.RoleEnum;
import org.sir.appgestionstock.bean.core.contacts.Fournisseur;
import org.sir.appgestionstock.bean.core.contacts.Client;
import org.sir.appgestionstock.bean.core.produit.ProduitNiveauPrix;
import org.sir.appgestionstock.bean.core.produit.Produit;
import org.sir.appgestionstock.bean.core.ventes.Paiement;

import org.sir.appgestionstock.bean.core.ventes.commande.CommandeProduit;
import org.sir.appgestionstock.bean.core.ventes.commande.Commande;
import org.sir.appgestionstock.bean.core.ventes.facture.FactureProduit;
import org.sir.appgestionstock.bean.core.ventes.facture.Facture;
import org.sir.appgestionstock.bean.core.ventes.devis.DevisProduit;
import org.sir.appgestionstock.bean.core.ventes.devis.Devis;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduitProduit;
import org.sir.appgestionstock.bean.core.ventes.retourproduit.RetourProduit;

import org.sir.appgestionstock.bean.core.inventaire.NiveauStock;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommandeProduit;
import org.sir.appgestionstock.bean.core.inventaire.boncommande.BonCommande;
import org.sir.appgestionstock.bean.core.inventaire.livraison.LivraisonProduit;
import org.sir.appgestionstock.bean.core.inventaire.livraison.Livraison;
import org.sir.appgestionstock.bean.core.parametres.DestinataireEmploye;
import org.sir.appgestionstock.bean.core.parametres.Alerte;
import org.sir.appgestionstock.bean.core.parametres.EntrepriseDevises;
import org.sir.appgestionstock.bean.core.parametres.Entreprise;
import org.sir.appgestionstock.bean.core.parametres.Devises;
import org.sir.appgestionstock.bean.core.parametres.NouvelleDevise;
import org.sir.appgestionstock.bean.core.parametres.MethodePaiement;
import org.sir.appgestionstock.bean.core.parametres.NiveauPrix;
import org.sir.appgestionstock.bean.core.parametres.Taxe;
import org.sir.appgestionstock.bean.core.adresse.Adresse;
import org.sir.appgestionstock.bean.core.adresse.Pays;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import java.util.ArrayList;

@Component
public class DataLoader implements ApplicationRunner {
@Value("${app.data-loader.load}")
private boolean load;
@Override
public void run(ApplicationArguments args) throws Exception {
if (load) {
System.out.println("Data Loading...");
generatePermission();

generateEmployeAccount();
generateFournisseur();
generateClient();
generateProduitNiveauPrix();
generateProduit();
generatePaiement();
generateCommandeProduit();
generateCommande();
generateFactureProduit();
generateFacture();
generateDevisProduit();
generateDevis();
generateRetourProduitProduit();
generateRetourProduit();

generateNiveauStock();
generateBonCommandeProduit();
generateBonCommande();
generateLivraisonProduit();
generateLivraison();
generateDestinataireEmploye();
generateAlerte();
generateEntrepriseDevises();
generateEntreprise();
generateDevises();
generateNouvelleDevise();
generateMethodePaiement();
generateNiveauPrix();
generateTaxe();
generateAdresse();
generatePays();
System.out.println("Data Loaded!");
}
}
private void generatePermission() {
for (RoleEnum role : RoleEnum.values()) {
var roleEntity = role.getRole();
roleDao.save(roleEntity);
}
}

private void generateEmployeAccount() {
AppUser user = new AppUser("employe");
user.setPassword("123");
Role role = new Role();
role.setName(RoleEnum.EMPLOYE.name());
user.setRoles(new ArrayList<>());
user.getRoles().add(role);
appUserDao.save(user);
System.out.println("One Account For EMPLOYE role is created: 'employe' :: '123'");
}
private void generateFournisseur() {
for (int i = 0; i < 50; i++) {
Fournisseur item = new Fournisseur();
item.setNom("nom " + i);
item.setCode("code " + i);
item.setEmail("email " + i);
item.setSiteweb("siteweb " + i);
item.setTelephone("telephone " + i);
fournisseurDao.save(item);
}
System.out.println("Data For Fournisseur Generated!");
}
private void generateClient() {
for (int i = 0; i < 50; i++) {
Client item = new Client();
item.setNom("nom " + i);
item.setCode("code " + i);
item.setEmail("email " + i);
item.setSiteweb("siteweb " + i);
item.setTelephone("telephone " + i);
clientDao.save(item);
}
System.out.println("Data For Client Generated!");
}
/*
private void generateAdmin() {
for (int i = 0; i < 50; i++) {
Admin item = new Admin();
item.setNom("nom " + i);
item.setPrenom("prenom " + i);
item.setTelephone("telephone " + i);
item.setUsername("Admin " + i);
item.setPassword(appUserDao.cryptPassword("Admin " + i));
List<Role> savedRoles = roleDao.save(item.getRoles());
item.setRoles(savedRoles);
adminDao.save(item);
}
System.out.println("Data For Admin Generated!");
}
private void generateEmploye() {
for (int i = 0; i < 50; i++) {
Employe item = new Employe();
item.setCode("code " + i);
item.setNom("nom " + i);
item.setPrenom("prenom " + i);
item.setTelephone("telephone " + i);
item.setUsername("Employe " + i);
item.setPassword(appUserDao.cryptPassword("Employe " + i));
List<Role> savedRoles = roleDao.save(item.getRoles());
item.setRoles(savedRoles);
employeDao.save(item);
}
System.out.println("Data For Employe Generated!");
}*/
private void generateProduitNiveauPrix() {
for (int i = 0; i < 50; i++) {
ProduitNiveauPrix item = new ProduitNiveauPrix();
produitNiveauPrixDao.save(item);
}
System.out.println("Data For ProduitNiveauPrix Generated!");
}
private void generateProduit() {
for (int i = 0; i < 50; i++) {
Produit item = new Produit();
item.setNom("nom " + i);
item.setSku("sku " + i);
item.setBarcode("barcode " + i);
item.setEmplacementDeBac("emplacementDeBac " + i);
produitDao.save(item);
}
System.out.println("Data For Produit Generated!");
}

private void generatePaiement() {
for (int i = 0; i < 50; i++) {
Paiement item = new Paiement();
paiementDao.save(item);
}
System.out.println("Data For Paiement Generated!");
}


private void generateCommandeProduit() {
for (int i = 0; i < 50; i++) {
CommandeProduit item = new CommandeProduit();
commandeProduitDao.save(item);
}
System.out.println("Data For CommandeProduit Generated!");
}
private void generateCommande() {
for (int i = 0; i < 50; i++) {
Commande item = new Commande();
item.setCode("code " + i);
commandeDao.save(item);
}
System.out.println("Data For Commande Generated!");
}
private void generateFactureProduit() {
for (int i = 0; i < 50; i++) {
FactureProduit item = new FactureProduit();
factureProduitDao.save(item);
}
System.out.println("Data For FactureProduit Generated!");
}
private void generateFacture() {
for (int i = 0; i < 50; i++) {
Facture item = new Facture();
item.setCode("code " + i);
factureDao.save(item);
}
System.out.println("Data For Facture Generated!");
}
private void generateDevisProduit() {
for (int i = 0; i < 50; i++) {
DevisProduit item = new DevisProduit();
devisProduitDao.save(item);
}
System.out.println("Data For DevisProduit Generated!");
}
private void generateDevis() {
for (int i = 0; i < 50; i++) {
Devis item = new Devis();
item.setCode("code " + i);
devisDao.save(item);
}
System.out.println("Data For Devis Generated!");
}
private void generateRetourProduitProduit() {
for (int i = 0; i < 50; i++) {
RetourProduitProduit item = new RetourProduitProduit();
retourProduitProduitDao.save(item);
}
System.out.println("Data For RetourProduitProduit Generated!");
}
private void generateRetourProduit() {
for (int i = 0; i < 50; i++) {
RetourProduit item = new RetourProduit();
item.setCode("code " + i);
retourProduitDao.save(item);
}
System.out.println("Data For RetourProduit Generated!");
}



private void generateNiveauStock() {
for (int i = 0; i < 50; i++) {
NiveauStock item = new NiveauStock();
item.setNom("nom " + i);
item.setSku("sku " + i);
item.setDisponible("disponible " + i);
niveauStockDao.save(item);
}
System.out.println("Data For NiveauStock Generated!");
}
private void generateBonCommandeProduit() {
for (int i = 0; i < 50; i++) {
BonCommandeProduit item = new BonCommandeProduit();
bonCommandeProduitDao.save(item);
}
System.out.println("Data For BonCommandeProduit Generated!");
}
private void generateBonCommande() {
for (int i = 0; i < 50; i++) {
BonCommande item = new BonCommande();
item.setCode("code " + i);
bonCommandeDao.save(item);
}
System.out.println("Data For BonCommande Generated!");
}
private void generateLivraisonProduit() {
for (int i = 0; i < 50; i++) {
LivraisonProduit item = new LivraisonProduit();
livraisonProduitDao.save(item);
}
System.out.println("Data For LivraisonProduit Generated!");
}
private void generateLivraison() {
for (int i = 0; i < 50; i++) {
Livraison item = new Livraison();
item.setCode("code " + i);
livraisonDao.save(item);
}
System.out.println("Data For Livraison Generated!");
}
private void generateDestinataireEmploye() {
for (int i = 0; i < 50; i++) {
DestinataireEmploye item = new DestinataireEmploye();
destinataireEmployeDao.save(item);
}
System.out.println("Data For DestinataireEmploye Generated!");
}
private void generateAlerte() {
for (int i = 0; i < 50; i++) {
Alerte item = new Alerte();
item.setNom("nom " + i);
alerteDao.save(item);
}
System.out.println("Data For Alerte Generated!");
}
private void generateEntrepriseDevises() {
for (int i = 0; i < 50; i++) {
EntrepriseDevises item = new EntrepriseDevises();
entrepriseDevisesDao.save(item);
}
System.out.println("Data For EntrepriseDevises Generated!");
}
private void generateEntreprise() {
for (int i = 0; i < 50; i++) {
Entreprise item = new Entreprise();
item.setNom("nom " + i);
item.setEmail("email " + i);
item.setTelephone("telephone " + i);
item.setSiteweb("siteweb " + i);
entrepriseDao.save(item);
}
System.out.println("Data For Entreprise Generated!");
}
private void generateDevises() {
for (int i = 0; i < 50; i++) {
Devises item = new Devises();
devisesDao.save(item);
}
System.out.println("Data For Devises Generated!");
}
private void generateNouvelleDevise() {
for (int i = 0; i < 50; i++) {
NouvelleDevise item = new NouvelleDevise();
item.setLabelle("labelle " + i);
nouvelleDeviseDao.save(item);
}
System.out.println("Data For NouvelleDevise Generated!");
}
private void generateMethodePaiement() {
for (int i = 0; i < 50; i++) {
MethodePaiement item = new MethodePaiement();
item.setNom("nom " + i);
methodePaiementDao.save(item);
}
System.out.println("Data For MethodePaiement Generated!");
}
private void generateNiveauPrix() {
for (int i = 0; i < 50; i++) {
NiveauPrix item = new NiveauPrix();
item.setNom("nom " + i);
niveauPrixDao.save(item);
}
System.out.println("Data For NiveauPrix Generated!");
}
private void generateTaxe() {
for (int i = 0; i < 50; i++) {
Taxe item = new Taxe();
item.setNom("nom " + i);
taxeDao.save(item);
}
System.out.println("Data For Taxe Generated!");
}
private void generateAdresse() {
for (int i = 0; i < 50; i++) {
Adresse item = new Adresse();
item.setAddress1("address1 " + i);
item.setAddress2("address2 " + i);
item.setPostalCode("postalCode " + i);
item.setCity("city " + i);
adresseDao.save(item);
}
System.out.println("Data For Adresse Generated!");
}
private void generatePays() {
for (int i = 0; i < 50; i++) {
Pays item = new Pays();
item.setName("name " + i);
paysDao.save(item);
}
System.out.println("Data For Pays Generated!");
}
@Autowired private FournisseurDao fournisseurDao;
@Autowired private ClientDao clientDao;

@Autowired private EmployeDao employeDao;
@Autowired private ProduitNiveauPrixDao produitNiveauPrixDao;
@Autowired private ProduitDao produitDao;

@Autowired private PaiementDao paiementDao;

@Autowired private CommandeProduitDao commandeProduitDao;
@Autowired private CommandeDao commandeDao;
@Autowired private FactureProduitDao factureProduitDao;
@Autowired private FactureDao factureDao;
@Autowired private DevisProduitDao devisProduitDao;
@Autowired private DevisDao devisDao;
@Autowired private RetourProduitProduitDao retourProduitProduitDao;
@Autowired private RetourProduitDao retourProduitDao;

@Autowired private NiveauStockDao niveauStockDao;
@Autowired private BonCommandeProduitDao bonCommandeProduitDao;
@Autowired private BonCommandeDao bonCommandeDao;
@Autowired private LivraisonProduitDao livraisonProduitDao;
@Autowired private LivraisonDao livraisonDao;
@Autowired private DestinataireEmployeDao destinataireEmployeDao;
@Autowired private AlerteDao alerteDao;
@Autowired private EntrepriseDevisesDao entrepriseDevisesDao;
@Autowired private EntrepriseDao entrepriseDao;
@Autowired private DevisesDao devisesDao;
@Autowired private NouvelleDeviseDao nouvelleDeviseDao;
@Autowired private MethodePaiementDao methodePaiementDao;
@Autowired private NiveauPrixDao niveauPrixDao;
@Autowired private TaxeDao taxeDao;
@Autowired private AdresseDao adresseDao;
@Autowired private PaysDao paysDao;
@Autowired private AppUserService appUserDao;
@Autowired private RoleService roleDao;
}
