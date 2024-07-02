package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum BonCommandeProduitPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    BonCommandeProduitPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "bonCommandeProduit";
    }

    @Override
    public String authority() {
        return value;
    }
}
