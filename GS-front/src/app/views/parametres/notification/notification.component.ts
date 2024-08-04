import {Component, ElementRef, HostListener, inject, ViewChild} from '@angular/core';
import {NotificationService} from "../../../controller/services/parametres/notification.service";
import {Notification} from "../../../controller/entities/parametres/notification";
import {CommonModule} from "@angular/common";
import {EntrepriseSelectedService} from "../../../controller/shared/entreprise-selected.service";
import {AppUserService} from "../../../controller/auth/services/app-user.service";
import {UserInfosService} from "../../../controller/shared/user-infos.service";
import {Router, RouterLink} from "@angular/router";
import {Employe} from "../../../controller/entities/contacts/user/employe";

@Component({
  selector: 'app-notification',
  standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  notifications: Notification[] = [];
  private entrepriseSelectedService = inject(EntrepriseSelectedService);
  private appUserService = inject(AppUserService);
  private userInfosService = inject(UserInfosService);
  readonly router = inject(Router);
  public remade: number = 0;
  public viewRemade: boolean = false;

  constructor(private notificationService: NotificationService,private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.loadNotifications(this.entrepriseSelectedService.getEntrepriseSelected());
    this.getDaysRemaining(this.userInfosService.getUsername());
  }

    delete(notification: Notification): void {
        this.notificationService.delete(notification).subscribe(() => {
            this.notifications = this.notifications.filter(n => n.id !== notification.id);
            console.log('Notification supprimée:', notification);
        }, error => {
            console.error('Erreur lors de la suppression de la notification:', error);
        });
    }

  loadNotifications(id : number) {
    this.notificationService.findAll(id).subscribe(
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


    public getDaysRemaining(username: string){
        this.appUserService.getDaysRemaining(username).subscribe( res => {
            this.remade = res.daysRemaining;
            console.log("remade  : ", this.remade);
            if(this.remade>0 && !res.haveSub){
                this.viewRemade = true;
            }
        }, error => {
            console.log(error);
        });
    }


    goToDetails(employe: Employe | undefined): void {
        this.router.navigate(['/detailsEmploye'], { state: { employe } });
    }
}
