package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum AdressePermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    AdressePermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "adresse";
    }

    @Override
    public String authority() {
        return value;
    }
}
