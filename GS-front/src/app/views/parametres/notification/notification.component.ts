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


}
