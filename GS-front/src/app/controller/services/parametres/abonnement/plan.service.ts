import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Pagination} from "../../../utils/pagination/pagination";
import {HttpClient} from "@angular/common/http";
import {Plan} from "../../../entities/parametres/abonnement/Plan";

@Injectable({
  providedIn: 'root'
})

export class PlanService {

  private readonly api = environment.apiUrl + "plan";
  private _item!: Plan ;
  private _items!: Array<Plan>;
  private _pagination!: Pagination<Plan>

  private http = inject(HttpClient)
  public keepData: boolean = false
  public returnUrl: string  = ''

  public toReturn = () => this.returnUrl != undefined

  public findById(id: number) {
    return this.http.get<Plan>(`${this.api}/plan/${id}`);
  }

  public findAllPlans() {
    return this.http.get<Array<Plan>>(`${this.api}/planList`);
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

  public get item(): Plan {
    if (this._item == null)
      this._item = new Plan();
    return this._item;
  }

  public set item(value: Plan ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
      created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Plan()
    return created
  }



}
