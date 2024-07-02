package org.sir.appgestionstock.exception;

import org.sir.appgestionstock.zutils.exception.ApiError;
import org.sir.appgestionstock.zutils.validators.ValidateResult;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

@ControllerAdvice
public class ExceptionsHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiError> handleNotFoundExceptionExceptions(NotFoundException e) {
        var error = new ApiError(e.getMessage(), e.getStatus());
        return ResponseEntity
                .status(error.getStatus())
                .body(error);
    }

    @ExceptionHandler(ValidatorException.class)
    public ResponseEntity<List<ValidateResult<?>>> handleValidatorException(ValidatorException e) {
        return ResponseEntity
                .status(e.getStatus())
                .body(e.getResults());
    }
}
