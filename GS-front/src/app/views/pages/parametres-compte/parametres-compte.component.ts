import {Component, inject, OnInit} from '@angular/core';
import {SubscriptionService} from "../../../controller/services/parametres/abonnement/subscription.service";
import {Plan} from "../../../controller/entities/parametres/abonnement/Plan";
import {NgIf} from "@angular/common";
import {UserInfosService} from "../../../controller/shared/user-infos.service";
import {AppUserService} from "../../../controller/auth/services/app-user.service";
import {PlanService} from "../../../controller/services/parametres/abonnement/plan.service";
import {Router} from "@angular/router";
import {NgxStripeModule} from "ngx-stripe";

@Component({
  selector: 'app-parametres-compte',
  standalone: true,
  imports: [
    NgIf,
    NgxStripeModule
  ],
  templateUrl: './parametres-compte.component.html',
  styleUrl: './parametres-compte.component.scss'
})
export class ParametresCompteComponent implements OnInit {

  private subscriptionService = inject(SubscriptionService);
  private userInfosService = inject(UserInfosService);
  private appUserService = inject(AppUserService);
  private planService = inject(PlanService);
  readonly router = inject(Router);

  public remade: number = 0;
  public viewRemade: boolean = false;
  public msgRemade: boolean = false;
  public msgSub: boolean = false;


  public FIRST!: Plan;
  public PREMIUM!: Plan
  public ELITE!: Plan
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
        this.viewRemade = true;
        this.msgRemade = true;
      }
      if (res.haveSub && res.isSubEnd) {
        this.viewRemade = true;
        this.msgSub = true;
      }
    }, error => {
      console.log(error);
    });
  }


}
