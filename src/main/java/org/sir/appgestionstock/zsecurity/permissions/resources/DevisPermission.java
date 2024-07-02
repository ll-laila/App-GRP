package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum DevisPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    DevisPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "devis";
    }

    @Override
    public String authority() {
        return value;
    }
}
