package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum RemboursementPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    RemboursementPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "remboursement";
    }

    @Override
    public String authority() {
        return value;
    }
}
