package org.sir.appgestionstock.ws.dto.parametres;


import com.fasterxml.jackson.annotation.JsonInclude;
import org.sir.appgestionstock.ws.dto.contacts.user.EmployeDto;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class NotificationDto {

        private Long id;
        private String type;
        private String message;
        private String nomEmploye;
        private EmployeDto employe;

        private Long entrepriseId;


    // Getters and Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getNomEmploye() {
            return nomEmploye;
        }

        public void setNomEmploye(String nomEmploye) {
            this.nomEmploye = nomEmploye;
        }

        public EmployeDto getEmploye() {
            return employe;
        }

        public void setEmploye(EmployeDto employe) {
            this.employe = employe;
        }

        public Long getEntrepriseId() {
            return entrepriseId;
        }

        public void setEntrepriseId(Long entrepriseId) {
            this.entrepriseId = entrepriseId;
        }
    }


