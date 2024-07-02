package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum RetourProduitPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    RetourProduitPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "retourProduit";
    }

    @Override
    public String authority() {
        return value;
    }
}
