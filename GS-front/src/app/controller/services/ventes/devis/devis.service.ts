import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Devis } from 'src/app/controller/entities/ventes/devis/devis';
import { DevisValidator } from 'src/app/controller/validators/ventes/devis/devis.validator';
import { PaiementValidator } from 'src/app/controller/validators/ventes/paiement.validator';
import { RetourProduitValidator } from 'src/app/controller/validators/ventes/retourproduit/retour-produit.validator';
import {CodeResponse} from "../../../utils/code/code-response";
import {Paiement} from "../../../entities/ventes/paiement";

@Injectable({ providedIn: 'root' })
export class DevisService {
  private readonly api = environment.apiUrl + "devis";
  private _item!: Devis ;
  private _items!: Array<Devis>;
  private _pagination!: Pagination<Devis>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<Devis>>(this.api);
  }

    public getDevis(id: number) {
        return this.http.get<Array<Devis>>(`${this.api}/devisErp/${id}`);
    }

  public findById(id: number) {
    return this.http.get<Devis>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<Devis>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Devis>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<Devis>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<Devis>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Devis>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Devis>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Devis) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Devis>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByPaiementId(id: number){
    return this.http.delete<number>(`${this.api}/paiement/${id}`);
  }

  public findByPaiementId(id: number){
    return this.http.get<Devis>(`${this.api}/paiement/${id}`);
  }
  public deleteByRetourProduitId(id: number){
    return this.http.delete<number>(`${this.api}/retourproduit/${id}`);
  }

  public findByRetourProduitId(id: number){
    return this.http.get<Devis>(`${this.api}/retourproduit/${id}`);
  }
  public deleteByTaxeId(id: number){
    return this.http.delete<number>(`${this.api}/taxe/${id}`);
  }

  public findByTaxeId(id: number){
    return this.http.get<Array<Devis>>(`${this.api}/taxe/${id}`);
  }
  public deleteByTaxeExpeditionId(id: number){
    return this.http.delete<number>(`${this.api}/taxeexpedition/${id}`);
  }

  public findByTaxeExpeditionId(id: number){
    return this.http.get<Array<Devis>>(`${this.api}/taxeexpedition/${id}`);
  }
  public deleteByClientId(id: number){
    return this.http.delete<number>(`${this.api}/client/${id}`);
  }

  public findByClientId(id: number){
    return this.http.get<Array<Devis>>(`${this.api}/client/${id}`);
  }
  public deleteByDevisesId(id: number){
    return this.http.delete<number>(`${this.api}/devises/${id}`);
  }

  public findByDevisesId(id: number){
    return this.http.get<Array<Devis>>(`${this.api}/devises/${id}`);
  }
  public deleteByNiveauPrixId(id: number){
    return this.http.delete<number>(`${this.api}/niveauPrix/${id}`);
  }

  public findByNiveauPrixId(id: number){
    return this.http.get<Array<Devis>>(`${this.api}/niveauPrix/${id}`);
  }
  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<Devis>>(`${this.api}/entreprise/${id}`);
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

  public get item(): Devis {
    if (this._item == null)
      this._item = new Devis();
    return this._item;
  }

  public set item(value: Devis ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Devis()

    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
}

