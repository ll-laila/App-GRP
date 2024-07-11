package org.sir.appgestionstock.zsecurity.permissions;
import org.sir.appgestionstock.zsecurity.entity.Permission;
import org.sir.appgestionstock.zsecurity.entity.Role;
import org.sir.appgestionstock.zsecurity.permissions.resources.*;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
public enum RoleEnum {
    ADMIN(
        UserPermission.values(),
        RolePermission.values(),
        FournisseurPermission.values(),
        ClientPermission.values(),
        AdminPermission.values(),
        EmployePermission.values(),
        ProduitNiveauPrixPermission.values(),
        ProduitPermission.values(),
        CommandeExpeditionPermission.values(),
        PaiementPermission.values(),
        EstimationProduitPermission.values(),
        EstimationPermission.values(),
        CommandeProduitPermission.values(),
        CommandePermission.values(),
        FactureProduitPermission.values(),
        FacturePermission.values(),
        DevisProduitPermission.values(),
        DevisPermission.values(),
        RetourProduitProduitPermission.values(),
        RetourProduitPermission.values(),
        NoteCreditProduitPermission.values(),
        NoteCreditPermission.values(),
        RemboursementProduitPermission.values(),
        RemboursementPermission.values(),
        NiveauStockPermission.values(),
        BonCommandeProduitPermission.values(),
        BonCommandePermission.values(),
        LivraisonProduitPermission.values(),
        LivraisonPermission.values(),
        DestinataireEmployePermission.values(),
        AlertePermission.values(),
        EntrepriseDevisesPermission.values(),
        EntreprisePermission.values(),
        DevisesPermission.values(),
        NouvelleDevisePermission.values(),
        MethodePaiementPermission.values(),
        NiveauPrixPermission.values(),
        TaxePermission.values(),
        AdressePermission.values(),
        PaysPermission.values()
    ),
    EMPLOYE(
        FournisseurPermission.values(),
        ClientPermission.values(),
        ProduitPermission.values(),
        ProduitNiveauPrixPermission.values(),
        CommandeExpeditionPermission.values(),
        PaiementPermission.values(),
        EstimationProduitPermission.values(),
        EstimationPermission.values(),
        CommandeProduitPermission.values(),
        CommandePermission.values(),
        FactureProduitPermission.values(),
        FacturePermission.values(),
        DevisProduitPermission.values(),
        DevisPermission.values(),
        RetourProduitProduitPermission.values(),
        RetourProduitPermission.values(),
        NoteCreditProduitPermission.values(),
        NoteCreditPermission.values(),
        RemboursementProduitPermission.values(),
        RemboursementPermission.values(),
        NiveauStockPermission.values(),
        BonCommandeProduitPermission.values(),
        BonCommandePermission.values(),
        LivraisonProduitPermission.values(),
        LivraisonPermission.values(),
        DestinataireEmployePermission.values(),
        AlertePermission.values(),
        EntrepriseDevisesPermission.values(),
        EntreprisePermission.values(),
        DevisesPermission.values(),
        NouvelleDevisePermission.values(),
        MethodePaiementPermission.values(),
        NiveauPrixPermission.values(),
        TaxePermission.values(),
        AdressePermission.values(),
        PaysPermission.values()
    ),
    ;
    private Set<PermissionResource> permissions = null;

    RoleEnum() {}
    RoleEnum(Object... permissionsList) {
        this.permissions = Arrays.stream(permissionsList)
        .flatMap(o -> {
        if (o instanceof PermissionResource[]) {
        return Arrays.stream((PermissionResource[]) o);
        } else if (o instanceof PermissionResource) {
        return Arrays.stream(new PermissionResource[]{(PermissionResource) o});
        } else {
        throw new IllegalArgumentException("Unsupported type in permissionsList");
        }
        }).collect(Collectors.toUnmodifiableSet());
    }
    public Set<PermissionResource> getPermissions() {
    return permissions;
    }
        public Role getRole() {
        var result = new Role();
        result.setName(this.name());
        result.setPermissions(
        this.getPermissions().stream()
        .map(p -> new Permission(p.authority()))
        .collect(Collectors.toSet())
        );
        return result;
    }

    public Set<PermissionResource> getPermissionsOfType(Class<? extends PermissionResource> type) {
        return permissions.stream()
                .filter(type::isInstance)
                .collect(Collectors.toSet());
    }


}