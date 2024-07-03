import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { DevisProduit } from 'src/app/controller/entities/ventes/devis/devis-produit';
import { DevisProduitValidator } from 'src/app/controller/validators/ventes/devis/devis-produit.validator';
import {CodeResponse} from "../../../utils/code/code-response";

@Injectable({ providedIn: 'root' })
export class DevisProduitService {
  private readonly api = environment.apiUrl + "devisproduit";
  private _item!: DevisProduit ;
  private _items!: Array<DevisProduit>;
  private _pagination!: Pagination<DevisProduit>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<DevisProduit>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<DevisProduit>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<DevisProduit>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<DevisProduit>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<DevisProduit>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<DevisProduit>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<DevisProduit>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<DevisProduit>>(`${this.api}/all`, this.items);
  }

  public delete(dto: DevisProduit) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<DevisProduit>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByProduitId(id: number){
    return this.http.delete<number>(`${this.api}/produit/${id}`);
  }

  public findByProduitId(id: number){
    return this.http.get<Array<DevisProduit>>(`${this.api}/produit/${id}`);
  }
  public deleteByDevisId(id: number){
    return this.http.delete<number>(`${this.api}/devis/${id}`);
  }

  public findByDevisId(id: number){
    return this.http.get<Array<DevisProduit>>(`${this.api}/devis/${id}`);
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

  public get item(): DevisProduit {
    if (this._item == null)
      this._item = new DevisProduit();
    return this._item;
  }

  public set item(value: DevisProduit ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new DevisProduit()

    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
}

