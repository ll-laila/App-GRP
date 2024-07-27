import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { NiveauStock } from 'src/app/controller/entities/inventaire/niveau-stock';
import {Paiement} from "../../entities/ventes/paiement";

@Injectable({ providedIn: 'root' })
export class NiveauStockService {
  private readonly api = environment.apiUrl + "niveaustock";
  private _item!: NiveauStock ;
  private _items!: Array<NiveauStock>;
  private _pagination!: Pagination<NiveauStock>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<NiveauStock>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<NiveauStock>(`${this.api}/id/${id}`);
  }

  public getNiveauStock(id: number) {
      return this.http.get<Array<NiveauStock>>(`${this.api}/niveauStockErp/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<NiveauStock>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<NiveauStock>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<NiveauStock>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<NiveauStock>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<NiveauStock>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<NiveauStock>>(`${this.api}/all`, this.items);
  }

  public delete(dto: NiveauStock) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<NiveauStock>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<NiveauStock>>(`${this.api}/entreprise/${id}`);
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

  public get item(): NiveauStock {
    if (this._item == null)
      this._item = new NiveauStock();
    return this._item;
  }

  public set item(value: NiveauStock ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new NiveauStock()

    return created
  }
}

