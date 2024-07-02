package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum DevisProduitPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    DevisProduitPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "devisProduit";
    }

    @Override
    public String authority() {
        return value;
    }
}
