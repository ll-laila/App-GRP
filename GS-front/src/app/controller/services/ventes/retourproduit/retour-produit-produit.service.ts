import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { RetourProduitProduit } from 'src/app/controller/entities/ventes/retourproduit/retour-produit-produit';
import { RetourProduitProduitValidator } from 'src/app/controller/validators/ventes/retourproduit/retour-produit-produit.validator';
import {CodeResponse} from "../../../utils/code/code-response";

@Injectable({ providedIn: 'root' })
export class RetourProduitProduitService {
  private readonly api = environment.apiUrl + "retourproduitproduit";
  private _item!: RetourProduitProduit ;
  private _items!: Array<RetourProduitProduit>;
  private _pagination!: Pagination<RetourProduitProduit>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<RetourProduitProduit>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<RetourProduitProduit>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<RetourProduitProduit>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<RetourProduitProduit>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<RetourProduitProduit>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<RetourProduitProduit>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<RetourProduitProduit>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<RetourProduitProduit>>(`${this.api}/all`, this.items);
  }

  public delete(dto: RetourProduitProduit) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<RetourProduitProduit>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByProduitId(id: number){
    return this.http.delete<number>(`${this.api}/produit/${id}`);
  }

  public findByProduitId(id: number){
    return this.http.get<Array<RetourProduitProduit>>(`${this.api}/produit/${id}`);
  }
  public deleteByRetourProduitId(id: number){
    return this.http.delete<number>(`${this.api}/retourproduit/${id}`);
  }

  public findByRetourProduitId(id: number){
    return this.http.get<Array<RetourProduitProduit>>(`${this.api}/retourproduit/${id}`);
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

  public get item(): RetourProduitProduit {
    if (this._item == null)
      this._item = new RetourProduitProduit();
    return this._item;
  }

  public set item(value: RetourProduitProduit ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new RetourProduitProduit()

    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
}

