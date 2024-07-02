package org.sir.appgestionstock.zutils.code;

public class CodeGenerator {

    public static CodeResponse generate(String prefix, Long nextId) {
        String formattedNextId = nextId != null ? String.format("%06d", nextId) : "000000";
        return new CodeResponse(prefix + formattedNextId);
    }
}
