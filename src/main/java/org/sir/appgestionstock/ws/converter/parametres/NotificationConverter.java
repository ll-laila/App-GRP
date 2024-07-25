package org.sir.appgestionstock.ws.converter.parametres;

import org.sir.appgestionstock.bean.core.parametres.Notification;
import org.sir.appgestionstock.ws.converter.contacts.user.EmployeConverter;
import org.sir.appgestionstock.ws.dto.parametres.NotificationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class NotificationConverter {

        @Autowired
        private EmployeConverter employeConverter;

        private boolean employe = true;

        public NotificationDto toDto(Notification item) {
            if (item == null) {
                return null;
            }

            NotificationDto dto = new NotificationDto();
            dto.setId(item.getId());
            dto.setType(item.getType());
            dto.setMessage(item.getMessage());
            dto.setNomEmploye(item.getNomEmploye());
            dto.setEntrepriseId(item.getEntrepriseId());
            dto.setEmploye(employe ? employeConverter.toDto(item.getEmployee()) : null);

            return dto;
        }

        public Notification toItem(NotificationDto dto) {
            if (dto == null) {
                return null;
            }

            Notification item = new Notification();
            item.setId(dto.getId());
            item.setType(dto.getType());
            item.setMessage(dto.getMessage());
            item.setNomEmploye(dto.getNomEmploye());
            item.setEntrepriseId(dto.getEntrepriseId());
            item.setEmployee(employeConverter.toItem(dto.getEmploye()));

            return item;
        }

        public List<Notification> toItem(List<NotificationDto> dtos) {
            if (dtos == null) {
                return null;
            }

            List<Notification> list = new ArrayList<>();
            for (NotificationDto dto : dtos) {
                list.add(toItem(dto));
            }

            return list;
        }

        public List<NotificationDto> toDto(List<Notification> items) {
            if (items == null) {
                return null;
            }

            List<NotificationDto> list = new ArrayList<>();
            for (Notification item : items) {
                list.add(toDto(item));
            }

            return list;
        }

        public void setEmploye(boolean employe) {
            this.employe = employe;
        }

        public void setEmployeConverter(EmployeConverter employeConverter) {
            this.employeConverter = employeConverter;
        }

        public EmployeConverter getEmployeConverter() {
            return employeConverter;
        }
    }
