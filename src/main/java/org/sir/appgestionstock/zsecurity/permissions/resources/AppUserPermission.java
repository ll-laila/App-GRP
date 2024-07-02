package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum AppUserPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    AppUserPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "appUser";
    }

    @Override
    public String authority() {
        return value;
    }
}
