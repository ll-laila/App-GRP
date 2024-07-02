package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum TaxePermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    TaxePermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "taxe";
    }

    @Override
    public String authority() {
        return value;
    }
}
