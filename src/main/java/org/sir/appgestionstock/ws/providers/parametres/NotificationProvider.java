package org.sir.appgestionstock.ws.providers.parametres;


import org.sir.appgestionstock.bean.core.parametres.Notification;
import org.sir.appgestionstock.service.facade.parametres.NotificationService;

import org.sir.appgestionstock.ws.converter.parametres.NotificationConverter;
import org.sir.appgestionstock.ws.dto.parametres.EntrepriseDto;
import org.sir.appgestionstock.ws.dto.parametres.NotificationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationProvider {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private NotificationConverter notificationConverter;

    @GetMapping("/{idEntreprise}")
    public ResponseEntity<List<NotificationDto>> findAllByEntreprise(@PathVariable Long idEntreprise) {
        var notifications = notificationService.findAllByIdErp(idEntreprise);

        // Vérifiez si notificationConverter est null pour éviter NullPointerException
        if (notificationConverter == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        var notificationsDto = notificationConverter.toDto(notifications);
        return ResponseEntity.ok(notificationsDto);
    }


    @DeleteMapping()
    public ResponseEntity<NotificationDto> delete(@RequestBody NotificationDto dto) {
        if (dto == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        Notification notification = notificationConverter.toItem(dto);
        notificationService.delete(notification);
        return ResponseEntity.ok(dto);
    }

    @PostMapping()
    public ResponseEntity<NotificationDto> save(@RequestBody NotificationDto dto) {
        if (dto == null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
        var item = notificationConverter.toItem(dto);
        var result = notificationService.createNotification(item);
        var resultDto = notificationConverter.toDto(result);
        return ResponseEntity.ok(resultDto);
    }
}




