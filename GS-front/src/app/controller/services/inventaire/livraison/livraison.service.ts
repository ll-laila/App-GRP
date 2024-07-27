import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Livraison } from 'src/app/controller/entities/inventaire/livraison/livraison';
import { LivraisonValidator } from 'src/app/controller/validators/inventaire/livraison/livraison.validator';
import {CodeResponse} from "../../../utils/code/code-response";
import {BonCommande} from "../../../entities/inventaire/boncommande/bon-commande";
import {Facture} from "../../../entities/ventes/facture/facture";

@Injectable({ providedIn: 'root' })
export class LivraisonService {
  private readonly api = environment.apiUrl + "livraison";
  private _item!: Livraison ;
  private _items!: Array<Livraison>;
  private _pagination!: Pagination<Livraison>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<Livraison>>(this.api);
  }

  public findById(id: number) {
      return this.http.get<Livraison>(`${this.api}/id/${id}`);
  }

    public getLivraisons(entrepriseId: number) {
        return this.http.get<Array<Livraison>>(`${this.api}/livraisonErp/${entrepriseId}`);
    }

    public findAllOptimized() {
    return this.http.get<Array<Livraison>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Livraison>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<Livraison>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<Livraison>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Livraison>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Livraison>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Livraison) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Livraison>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByTaxeExpeditionId(id: number){
    return this.http.delete<number>(`${this.api}/taxeexpedition/${id}`);
  }

  public findByTaxeExpeditionId(id: number){
    return this.http.get<Array<Livraison>>(`${this.api}/taxeexpedition/${id}`);
  }
  public deleteByFournisseurId(id: number){
    return this.http.delete<number>(`${this.api}/fournisseur/${id}`);
  }

  public findByFournisseurId(id: number){
    return this.http.get<Array<Livraison>>(`${this.api}/fournisseur/${id}`);
  }
  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<Livraison>>(`${this.api}/entreprise/${id}`);
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

  public get item(): Livraison {
    if (this._item == null)
      this._item = new Livraison();
    return this._item;
  }

  public set item(value: Livraison ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Livraison()

    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
}

