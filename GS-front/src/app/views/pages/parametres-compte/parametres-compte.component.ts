import {Component, inject, OnInit} from '@angular/core';
import {SubscriptionService} from "../../../controller/services/parametres/abonnement/subscription.service";
import {Plan} from "../../../controller/entities/parametres/abonnement/Plan";

@Component({
  selector: 'app-parametres-compte',
  standalone: true,
  imports: [],
  templateUrl: './parametres-compte.component.html',
  styleUrl: './parametres-compte.component.scss'
})
export class ParametresCompteComponent implements OnInit {

  private subscriptionService = inject(SubscriptionService);

  public FIRST!: Plan;
  public PREMIUM!: Plan
  public ELITE!: Plan

  ngOnInit(): void {
    this.getPlan("FIRST",this.FIRST);
    this.getPlan("PREMIUM",this.PREMIUM);
    this.getPlan("ELITE",this.ELITE);
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


}
