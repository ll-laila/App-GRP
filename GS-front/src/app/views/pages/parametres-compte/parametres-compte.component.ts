import {Component, inject, OnInit} from '@angular/core';
import {SubscriptionService} from "../../../controller/services/parametres/abonnement/subscription.service";
import {Plan} from "../../../controller/entities/parametres/abonnement/Plan";
import {NgIf} from "@angular/common";
import {UserInfosService} from "../../../controller/shared/user-infos.service";
import {AppUserService} from "../../../controller/auth/services/app-user.service";

@Component({
  selector: 'app-parametres-compte',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './parametres-compte.component.html',
  styleUrl: './parametres-compte.component.scss'
})
export class ParametresCompteComponent implements OnInit {

  private subscriptionService = inject(SubscriptionService);
  private userInfosService = inject(UserInfosService);
  private appUserService = inject(AppUserService);
  public remade: number = 0;
  public viewRemade: boolean = false;

  public FIRST!: Plan;
  public PREMIUM!: Plan
  public ELITE!: Plan

  ngOnInit(): void {
    this.getDaysRemaining(this.userInfosService.getUsername());

    // this.getPlan("FIRST",this.FIRST);
    // this.getPlan("PREMIUM",this.PREMIUM);
    // this.getPlan("ELITE",this.ELITE);

  }

  public getPlanFIRST() {

  }

  public getPlanPREMIUM() {

  }

  public getPlanELITE() {

  }


  public getPlan(name: string, plan: Plan){
    this.subscriptionService.findByIName(name).subscribe( res => {
      plan = res;
      console.log("Plan : ", plan);
    }, error => {
      console.log(error);
    });
  }


  public getDaysRemaining(username: string){
    this.appUserService.getDaysRemaining(username).subscribe( res => {
      this.remade = res;
      if (this.remade == 0) {
        this.viewRemade = true;
      }
    }, error => {
      console.log(error);
    });
  }


}
