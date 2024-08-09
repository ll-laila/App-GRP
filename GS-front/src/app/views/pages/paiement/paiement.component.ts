import {AfterViewInit, Component, ElementRef, inject, NgZone, OnInit, ViewChild} from '@angular/core';
import { NgIf } from "@angular/common";
import { StripeService } from "../../../controller/services/parametres/abonnement/stripe.service";
import {Plan} from "../../../controller/entities/parametres/abonnement/Plan";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PlanService} from "../../../controller/services/parametres/abonnement/plan.service";
import {AppUser} from "../../../controller/auth/entities/app-user";
import {UserInfosService} from "../../../controller/shared/user-infos.service";
import {AppUserService} from "../../../controller/auth/services/app-user.service";
import {Subscription} from "../../../controller/entities/parametres/abonnement/Subscription";
import {SubscriptionService} from "../../../controller/services/parametres/abonnement/subscription.service";
import {FormLabelDirective} from "@coreui/angular";

@Component({
    selector: 'app-paiement',
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        FormLabelDirective
    ],
    templateUrl: './paiement.component.html',
    styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements AfterViewInit {



    @ViewChild('cardNumber') cardNumber: ElementRef | undefined;
    @ViewChild('cardExpiry') cardExpiry: ElementRef | undefined;
    @ViewChild('cardCvc') cardCvc: ElementRef | undefined;
    cardError: string | null | undefined;
    cardNumberElement: any;
    cardExpiryElement: any;
    cardCvcElement: any;
    readonly route = inject(Router);
    readonly router = inject(ActivatedRoute);
    private planService = inject(PlanService);
    public planId!: number;
    public plan!: Plan;
    public price!:number | undefined;
    public confirm:boolean = false;
    public pay:boolean = true;
    public sucess:boolean = false;
    protected admin!: AppUser;
    private _userInfosService = inject(UserInfosService);
    private _appUserService = inject(AppUserService);
    public subscriptionService = inject(SubscriptionService);
    private subscription: Subscription = new Subscription();

    constructor(private ngZone: NgZone, private stripeService: StripeService) {
    }

    ngOnInit(): void {
        this.getAdminByUsername(this._userInfosService.getUsername());
        this.router.queryParams.subscribe(params => {
            this.planId = +params['id'];
            console.log("Received Plan ID: ", this.planId);
        });
        this.getPlanById(this.planId);
    }

    public getPlanById(id: number) {
        this.planService.findById(id).subscribe(res => {
            this.price = res.price;
            this.plan = res;
            this.subscription.plan = this.plan;
            console.log("Plan : ", res);
        }, error => {
            console.log(error);
        });
    }

    getAdminByUsername(username: string) {
        this._appUserService.findByUsernameWithRoles(username).subscribe({
            next: (res) => {
                this.admin = res;
                this.subscription.user = this.admin;
                console.log('Admin data:', this.admin);
            },
            error: (err) => {
                console.error('Error fetching admin data:', err);
            }
        });
    }


    confirmPay(){
        this.subscription.plan = this.plan;
        this.subscription.user = this.admin;
        this.subscriptionService.create(this.subscription).subscribe({
            next: (res) => {
                this.sucess = true;
                this.confirm = false;
                console.log('Subscription :', res);
            },
            error: (err) => {
                console.error('Error:', err);
            }
        });

    }


    annulerPay(){
        this.route.navigate(['/parametresCompte']).then();
    }



    ngAfterViewInit(): void {
        const elements = stripe.elements();
        this.cardNumberElement = elements.create('cardNumber');
        this.cardExpiryElement = elements.create('cardExpiry');
        this.cardCvcElement = elements.create('cardCvc');

        // @ts-ignore
        this.cardNumberElement.mount(this.cardNumber.nativeElement);
        // @ts-ignore
        this.cardExpiryElement.mount(this.cardExpiry.nativeElement);
        // @ts-ignore
        this.cardCvcElement.mount(this.cardCvc.nativeElement);

        this.cardNumberElement.addEventListener('change', this.onChange.bind(this));
        this.cardExpiryElement.addEventListener('change', this.onChange.bind(this));
        this.cardCvcElement.addEventListener('change', this.onChange.bind(this));
    }

    // @ts-ignore
    onChange({ error }) {
        if (error) {
            this.ngZone.run(() => this.cardError = error.message);
        } else {
            this.ngZone.run(() => this.cardError = null);
        }
    }

    async onClick() {
        const { token, error } = await stripe.createToken(this.cardNumberElement);
        if (token) {
            const response = await this.stripeService.charge(this.price, token.id);
            this.confirm = true;
            this.pay=false;
            console.log(response);
        } else {
            this.ngZone.run(() => this.cardError = error.message);
        }
    }



}













