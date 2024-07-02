package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum EstimationPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    EstimationPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "estimation";
    }

    @Override
    public String authority() {
        return value;
    }
}
