package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum DevisesPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    DevisesPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "devises";
    }

    @Override
    public String authority() {
        return value;
    }
}
