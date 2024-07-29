import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Paiement } from 'src/app/controller/entities/ventes/paiement';
import { PaiementValidator } from 'src/app/controller/validators/ventes/paiement.validator';
import {CodeResponse} from "../../utils/code/code-response";
import {Facture} from "../../entities/ventes/facture/facture";

@Injectable({ providedIn: 'root' })
export class PaiementService {
  private readonly api = environment.apiUrl + "paiement";
  private _item!: Paiement ;
  private _items!: Array<Paiement>;
  private _pagination!: Pagination<Paiement>

  private http = inject(HttpClient)
    private facture!:Facture;

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined

    public getIncome(entrepriseId: number) {
        return this.http.get<number>(`${this.api}/income/${entrepriseId}`);
    }

    public getPaiements(id: number) {
        return this.http.get<Array<Paiement>>(`${this.api}/paiementsErp/${id}`);
    }

    public findAll() {
    return this.http.get<Array<Paiement>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<Paiement>(`${this.api}/id/${id}`);
  }

    public findByIdFacture(id: number) {
        return this.http.get<Paiement>(`${this.api}/idFacture/${id}`);
    }

  public findAllOptimized() {
    return this.http.get<Array<Paiement>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Paiement>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<Paiement>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<Paiement>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Paiement>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Paiement>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Paiement) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Paiement>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByMethodePaiementId(id: number){
    return this.http.delete<number>(`${this.api}/methodepaiement/${id}`);
  }

  public findByMethodePaiementId(id: number){
    return this.http.get<Array<Paiement>>(`${this.api}/methodepaiement/${id}`);
  }
  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<Paiement>>(`${this.api}/entreprise/${id}`);
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

  public get item(): Paiement {
    if (this._item == null)
      this._item = new Paiement();
    return this._item;
  }

  public set item(value: Paiement ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Paiement()

    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
}

