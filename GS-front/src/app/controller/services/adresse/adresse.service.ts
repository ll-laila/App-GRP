import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Adresse } from 'src/app/controller/entities/adresse/adresse';
import { AdresseValidator } from 'src/app/controller/validators/adresse/adresse.validator';

@Injectable({ providedIn: 'root' })
export class AdresseService {
  private readonly api = environment.apiUrl + "adresse";
  private _item!: Adresse ;
  private _items!: Array<Adresse>;
  private _pagination!: Pagination<Adresse>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<Adresse>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<Adresse>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<Adresse>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Adresse>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<Adresse>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<Adresse>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Adresse>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Adresse>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Adresse) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Adresse>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByPaysId(id: number){
    return this.http.delete<number>(`${this.api}/pays/${id}`);
  }

  public findByPaysId(id: number){
    return this.http.get<Array<Adresse>>(`${this.api}/pays/${id}`);
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

  public get item(): Adresse {
    if (this._item == null)
      this._item = new Adresse();
    return this._item;
  }

  public set item(value: Adresse ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Adresse()
    return created
  }
}

