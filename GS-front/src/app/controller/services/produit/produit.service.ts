import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Produit } from 'src/app/controller/entities/produit/produit';
import { ProduitValidator } from 'src/app/controller/validators/produit/produit.validator';
import { NiveauStockValidator } from 'src/app/controller/validators/inventaire/niveau-stock.validator';
import {Adresse} from "../../entities/adresse/adresse";

@Injectable({ providedIn: 'root' })
export class ProduitService {
  private readonly api = environment.apiUrl + "produit";
  private _item!: Produit ;
  private _items!: Array<Produit>;
  private _pagination!: Pagination<Produit>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<Produit>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<Produit>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<Produit>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Produit>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<Produit>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<Produit>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Produit>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Produit>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Produit) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Produit>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByNiveauStockId(id: number){
    return this.http.delete<number>(`${this.api}/niveaustock/${id}`);
  }

  public findByNiveauStockId(id: number){
    return this.http.get<Produit>(`${this.api}/niveaustock/${id}`);
  }
  public deleteByDevisesId(id: number){
    return this.http.delete<number>(`${this.api}/devises/${id}`);
  }

  public findByDevisesId(id: number){
    return this.http.get<Array<Produit>>(`${this.api}/devises/${id}`);
  }
  public deleteByTaxeId(id: number){
    return this.http.delete<number>(`${this.api}/taxe/${id}`);
  }

  public findByTaxeId(id: number){
    return this.http.get<Array<Produit>>(`${this.api}/taxe/${id}`);
  }
  public deleteByFournisseurId(id: number){
    return this.http.delete<number>(`${this.api}/fournisseur/${id}`);
  }

  public findByFournisseurId(id: number){
    return this.http.get<Array<Produit>>(`${this.api}/fournisseur/${id}`);
  }
  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<Produit>>(`${this.api}/entreprise/${id}`);
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

  public get item(): Produit {
    if (this._item == null)
      this._item = new Produit();
    return this._item;
  }

  public set item(value: Produit ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Produit()
    return created
  }
}

