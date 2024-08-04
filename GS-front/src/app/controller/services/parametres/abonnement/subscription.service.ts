import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Subscription} from "../../../entities/parametres/abonnement/Subscription";
import {Pagination} from "../../../utils/pagination/pagination";
import {HttpClient} from "@angular/common/http";
import {Entreprise} from "../../../entities/parametres/entreprise";
import {Plan} from "../../../entities/parametres/abonnement/Plan";
import {NiveauPrix} from "../../../entities/parametres/niveau-prix";
import {Produit} from "../../../entities/produit/produit";

@Injectable({
  providedIn: 'root'
})

export class SubscriptionService {

  private readonly api = environment.apiUrl + "subscription";


  private http = inject(HttpClient)
  public keepData: boolean = false
  public returnUrl: string  = ''

  public toReturn = () => this.returnUrl != undefined


  public create(sub: Subscription) {
    return this.http.post<Subscription>(this.api, sub);
  }

  public findById(id: number) {
    return this.http.get<Subscription>(`${this.api}/${id}`);
  }


}
