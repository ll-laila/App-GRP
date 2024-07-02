package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum EntreprisePermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    EntreprisePermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "entreprise";
    }

    @Override
    public String authority() {
        return value;
    }
}
