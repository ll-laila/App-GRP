import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Subscription} from "../../../entities/parametres/abonnement/Subscription";
import {Pagination} from "../../../utils/pagination/pagination";
import {HttpClient} from "@angular/common/http";
import {Entreprise} from "../../../entities/parametres/entreprise";
import {Plan} from "../../../entities/parametres/abonnement/Plan";

@Injectable({
  providedIn: 'root'
})

export class SubscriptionService {

  private readonly api = environment.apiUrl + "subscription";
  private _item!: Subscription ;
  private _items!: Array<Subscription>;
  private _pagination!: Pagination<Subscription>

  private http = inject(HttpClient)
  public keepData: boolean = false
  public returnUrl: string  = ''

  public toReturn = () => this.returnUrl != undefined

  public findByIName(name: string) {
    return this.http.get<Plan>(`${this.api}/plan/${name}`);
  }





  public get itemIsNull(): boolean {
    return this._item == undefined
  }

  public get items() {
    if (this._items == undefined)
      this._items = [];
    return this._items;
  }

  get pagination() {
    if (this._pagination == null)
      this._pagination = new Pagination();
    return this._pagination;
  }

  set pagination(value) {
    this._pagination = value;
  }

  public set items(value) {
    this._items = value;
  }

  public get item(): Subscription {
    if (this._item == null)
      this._item = new Subscription();
    return this._item;
  }

  public set item(value: Subscription ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
      created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Subscription()
    return created
  }



}
