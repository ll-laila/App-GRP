package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum CommandeProduitPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    CommandeProduitPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "commandeProduit";
    }

    @Override
    public String authority() {
        return value;
    }
}
