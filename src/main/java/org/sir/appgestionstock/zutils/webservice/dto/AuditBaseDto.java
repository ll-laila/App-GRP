package org.sir.appgestionstock.zutils.webservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import java.time.LocalDateTime;
import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuditBaseDto extends BaseDto {
@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonProperty(access = Access.READ_ONLY)
private LocalDateTime createdOn;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonProperty(access = Access.READ_ONLY)
private LocalDateTime updatedOn;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonProperty(access = Access.READ_ONLY)
private LocalDateTime createdBy;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
@JsonProperty(access = Access.READ_ONLY)
private LocalDateTime updatedBy;

public AuditBaseDto(Long id) {
super(id);
}

public AuditBaseDto() {
}

public LocalDateTime getCreatedOn() {
return this.createdOn;
}

public LocalDateTime getUpdatedOn() {
return this.updatedOn;
}

public LocalDateTime getCreatedBy() {
return this.createdBy;
}

public LocalDateTime getUpdatedBy() {
return this.updatedBy;
}

@JsonProperty(access = Access.READ_ONLY)
public void setCreatedOn(LocalDateTime createdOn) {
this.createdOn = createdOn;
}

@JsonProperty(access = Access.READ_ONLY)
public void setUpdatedOn(LocalDateTime updatedOn) {
this.updatedOn = updatedOn;
}

@JsonProperty(access = Access.READ_ONLY)
public void setCreatedBy(LocalDateTime createdBy) {
this.createdBy = createdBy;
}

@JsonProperty(access = Access.READ_ONLY)
public void setUpdatedBy(LocalDateTime updatedBy) {
this.updatedBy = updatedBy;
}
}
