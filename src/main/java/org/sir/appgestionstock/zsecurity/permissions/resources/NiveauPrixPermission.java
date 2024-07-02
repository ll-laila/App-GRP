package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum NiveauPrixPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    NiveauPrixPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "niveauPrix";
    }

    @Override
    public String authority() {
        return value;
    }
}
