package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum RetourProduitProduitPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    RetourProduitProduitPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "retourProduitProduit";
    }

    @Override
    public String authority() {
        return value;
    }
}
