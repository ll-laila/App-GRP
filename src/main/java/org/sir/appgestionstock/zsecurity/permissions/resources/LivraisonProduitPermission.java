package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum LivraisonProduitPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    LivraisonProduitPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "livraisonProduit";
    }

    @Override
    public String authority() {
        return value;
    }
}
