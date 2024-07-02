package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum AlertePermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    AlertePermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "alerte";
    }

    @Override
    public String authority() {
        return value;
    }
}
