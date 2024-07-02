package org.sir.appgestionstock.zsecurity.permissions.resources;
import org.sir.appgestionstock.zsecurity.permissions.PermissionResource;

public enum MethodePaiementPermission implements PermissionResource {
    CREATE(create),
    READ(read),
    EDIT(edit),
    DELETE(delete),
    ;

    private final String value;

    MethodePaiementPermission(String action) {
        this.value = authority(action);
    }

    @Override
    public String resource() {
        return "methodePaiement";
    }

    @Override
    public String authority() {
        return value;
    }
}
