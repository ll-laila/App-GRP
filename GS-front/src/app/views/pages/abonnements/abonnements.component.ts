import {Component, inject, OnInit} from '@angular/core';
import {SubscriptionService} from "../../../controller/services/parametres/abonnement/subscription.service";
import {UserInfosService} from "../../../controller/shared/user-infos.service";
import {AppUserService} from "../../../controller/auth/services/app-user.service";
import {PlanService} from "../../../controller/services/parametres/abonnement/plan.service";
import {Router} from "@angular/router";
import {Plan} from "../../../controller/entities/parametres/abonnement/Plan";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-abonnements',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './abonnements.component.html',
  styleUrl: './abonnements.component.scss'
})
export class AbonnementsComponent  implements OnInit {

  private subscriptionService = inject(SubscriptionService);
  private userInfosService = inject(UserInfosService);
  private appUserService = inject(AppUserService);
  private planService = inject(PlanService);
  readonly router = inject(Router);

  public remade: number = 0;
  public msgRemade: boolean = false;
  public msgSub: boolean = false;

  public plans!: Plan[];

  ngOnInit(): void {
    this.getDaysRemaining(this.userInfosService.getUsername());
    this.getPlans();
  }

  public getPlanFIRST(id: number) {
    this.router.navigate(['/paiement'], { queryParams: { id: id } }).then();
  }

  public getPlanPREMIUM(id: number) {
    this.router.navigate(['/paiement'], { queryParams: { id: id } }).then();
  }

  public getPlanELITE(id: number) {
    this.router.navigate(['/paiement'], { queryParams: { id: id } }).then();
  }


  public getPlans(){
    this.planService.findAllPlans().subscribe( res => {
      this.plans = res;
      console.log("Plans : ", this.plans);
    }, error => {
      console.log(error);
    });
  }




  public getDaysRemaining(username: string){
    this.appUserService.getDaysRemaining(username).subscribe( res => {
      this.remade = res.daysRemaining;
      if (this.remade <= 0 && !res.haveSub) {
        this.msgRemade = true;
      }
      if (res.haveSub && res.isSubEnd) {
        this.msgSub = true;
      }
    }, error => {
      console.log(error);
    });
  }


}

