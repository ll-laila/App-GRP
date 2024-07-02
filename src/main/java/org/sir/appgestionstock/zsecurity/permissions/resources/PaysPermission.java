package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum PaysPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    PaysPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "pays";
    }

    @Override
    public String authority() {
        return value;
    }
}
