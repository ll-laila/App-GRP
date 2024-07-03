import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { FactureProduit } from 'src/app/controller/entities/ventes/facture/facture-produit';
import { FactureProduitValidator } from 'src/app/controller/validators/ventes/facture/facture-produit.validator';
import {CodeResponse} from "../../../utils/code/code-response";

@Injectable({ providedIn: 'root' })
export class FactureProduitService {
  private readonly api = environment.apiUrl + "factureproduit";
  private _item!: FactureProduit ;
  private _items!: Array<FactureProduit>;
  private _pagination!: Pagination<FactureProduit>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<FactureProduit>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<FactureProduit>(`${this.api}/id/${id}`);
  }


  public calculerTotal(factureProduit: FactureProduit) {
    return this.http.post<FactureProduit>(`${this.api}/calculerTotal`, this.item);
  }
  public findAllOptimized() {
    return this.http.get<Array<FactureProduit>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<FactureProduit>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<FactureProduit>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<FactureProduit>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<FactureProduit>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<FactureProduit>>(`${this.api}/all`, this.items);
  }

  public delete(dto: FactureProduit) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<FactureProduit>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByProduitId(id: number){
    return this.http.delete<number>(`${this.api}/produit/${id}`);
  }

  public findByProduitId(id: number){
    return this.http.get<Array<FactureProduit>>(`${this.api}/produit/${id}`);
  }
  public deleteByFactureId(id: number){
    return this.http.delete<number>(`${this.api}/facture/${id}`);
  }

  public findByFactureId(id: number){
    return this.http.get<Array<FactureProduit>>(`${this.api}/facture/${id}`);
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

  public get item(): FactureProduit {
    if (this._item == null)
      this._item = new FactureProduit();
    return this._item;
  }

  public set item(value: FactureProduit ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new FactureProduit()

    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
}

