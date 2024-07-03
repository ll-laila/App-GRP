import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Alerte } from 'src/app/controller/entities/parametres/alerte';
import { AlerteValidator } from 'src/app/controller/validators/parametres/alerte.validator';

@Injectable({ providedIn: 'root' })
export class AlerteService {
  private readonly api = environment.apiUrl + "alerte";
  private _item!: Alerte ;
  private _items!: Array<Alerte>;
  private _pagination!: Pagination<Alerte>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<Alerte>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<Alerte>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<Alerte>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Alerte>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<Alerte>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<Alerte>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Alerte>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Alerte>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Alerte) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Alerte>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByAdminId(id: number){
    return this.http.delete<number>(`${this.api}/admin/${id}`);
  }

  public findByAdminId(id: number){
    return this.http.get<Array<Alerte>>(`${this.api}/admin/${id}`);
  }

  //------------- getters and setters -----------------------
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

  public get item(): Alerte {
    if (this._item == null)
      this._item = new Alerte();
    return this._item;
  }

  public set item(value: Alerte ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Alerte()

    return created
  }
}

