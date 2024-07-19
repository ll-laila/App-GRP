import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {NotificationService} from "../../../controller/services/parametres/notification.service";
import {Notification} from "../../../controller/entities/parametres/notification";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-notification',
  standalone: true,
    imports: [CommonModule],
    templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService,private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.loadNotifications();
  }
    delete(notification: Notification): void {
        this.notificationService.delete(notification).subscribe(() => {
            this.notifications = this.notifications.filter(n => n.id !== notification.id);
            console.log('Notification supprimée:', notification);
        }, error => {
            console.error('Erreur lors de la suppression de la notification:', error);
        });
    }
  loadNotifications() {
    this.notificationService.findAll().subscribe(
        (notifications: Notification[]) => {
          this.notifications = notifications;
          console.log('Notifications chargées:', this.notifications);
        },
        error => {
          console.error('Erreur lors du chargement des notifications:', error);
        }
    );
  }

    isDropdownOpen = false;

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    @HostListener('document:click', ['$event'])
    onClick(event: Event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isDropdownOpen = false;
        }
    }
    getNotificationIcon(type?: string): string {
        if (!type) {
            return 'fa-info-circle';
        }
        switch (type) {
            case 'Creation d\'une commande':
                return 'fa-check-circle';
            case 'Cadeau':
                return 'fa-gift';
            case 'Embauche':
                return 'fa-plus';
            case 'Annonce':
                return 'fa-leaf';
            case 'Question':
                return 'fa-question-circle';
            default:
                return 'fa-info-circle';
        }
    }




}
