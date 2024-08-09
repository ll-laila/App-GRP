import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private readonly api = environment.apiUrl + "plan";
  private http = inject(HttpClient)
  public keepData: boolean = false
  public returnUrl: string  = ''

  public toReturn = () => this.returnUrl != undefined

  constructor() { }

  charge(cantidad: any, tokenId: any){
     return  this.http.post('http://localhost:3000/stripe_checkout',{
       stripeToken: tokenId,
       cantidad: cantidad
     }).toPromise()
  }




}
