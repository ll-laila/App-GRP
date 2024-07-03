import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { BonCommandeProduit } from 'src/app/controller/entities/inventaire/boncommande/bon-commande-produit';
import { BonCommandeProduitValidator } from 'src/app/controller/validators/inventaire/boncommande/bon-commande-produit.validator';
import {CodeResponse} from "../../../utils/code/code-response";

@Injectable({ providedIn: 'root' })
export class BonCommandeProduitService {
  private readonly api = environment.apiUrl + "boncommandeproduit";
  private _item!: BonCommandeProduit ;
  private _items!: Array<BonCommandeProduit>;
  private _pagination!: Pagination<BonCommandeProduit>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<BonCommandeProduit>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<BonCommandeProduit>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<BonCommandeProduit>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<BonCommandeProduit>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<BonCommandeProduit>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<BonCommandeProduit>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<BonCommandeProduit>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<BonCommandeProduit>>(`${this.api}/all`, this.items);
  }

  public delete(dto: BonCommandeProduit) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<BonCommandeProduit>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByProduitId(id: number){
    return this.http.delete<number>(`${this.api}/produit/${id}`);
  }

  public findByProduitId(id: number){
    return this.http.get<Array<BonCommandeProduit>>(`${this.api}/produit/${id}`);
  }
  public deleteByBonCommandeId(id: number){
    return this.http.delete<number>(`${this.api}/boncommande/${id}`);
  }

  public findByBonCommandeId(id: number){
    return this.http.get<Array<BonCommandeProduit>>(`${this.api}/boncommande/${id}`);
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

  public get item(): BonCommandeProduit {
    if (this._item == null)
      this._item = new BonCommandeProduit();
    return this._item;
  }

  public set item(value: BonCommandeProduit ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new BonCommandeProduit()

    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
}

