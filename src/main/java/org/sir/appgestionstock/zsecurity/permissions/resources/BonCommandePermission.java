package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum BonCommandePermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    BonCommandePermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "bonCommande";
    }

    @Override
    public String authority() {
        return value;
    }
}
