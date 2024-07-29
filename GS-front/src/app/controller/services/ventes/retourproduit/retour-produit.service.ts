import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { RetourProduit } from 'src/app/controller/entities/ventes/retourproduit/retour-produit';
import { RetourProduitValidator } from 'src/app/controller/validators/ventes/retourproduit/retour-produit.validator';

import {CodeResponse} from "../../../utils/code/code-response";
import {Facture} from "../../../entities/ventes/facture/facture";
import {Devis} from "../../../entities/ventes/devis/devis";

@Injectable({ providedIn: 'root' })
export class RetourProduitService {
  private readonly api = environment.apiUrl + "retourproduit";
  private _item!: RetourProduit ;
  private _items!: Array<RetourProduit>;
  private _pagination!: Pagination<RetourProduit>

  private http = inject(HttpClient)

  public keepData: boolean = false
  public returnUrl!: string
  private _facture !:Facture
  get facture(): Facture {
    return this._facture;
  }

  set facture(value: Facture) {
    this._facture = value;
  }

  public toReturn = () => this.returnUrl != undefined

  public getRetourProduits(id: number) {
    return this.http.get<Array<RetourProduit>>(`${this.api}/retourProduitErp/${id}`);
  }

  public findAll() {
    return this.http.get<Array<RetourProduit>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<RetourProduit>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<RetourProduit>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<RetourProduit>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<RetourProduit>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<RetourProduit>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<RetourProduit>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<RetourProduit>>(`${this.api}/all`, this.items);
  }

  public delete(dto: RetourProduit) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<RetourProduit>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByClientId(id: number){
    return this.http.delete<number>(`${this.api}/client/${id}`);
  }

  public findByClientId(id: number){
    return this.http.get<Array<RetourProduit>>(`${this.api}/client/${id}`);
  }
  public deleteByNoteCreditId(id: number){
    return this.http.delete<number>(`${this.api}/notecredit/${id}`);
  }

  public findByNoteCreditId(id: number){
    return this.http.get<RetourProduit>(`${this.api}/notecredit/${id}`);
  }
  public deleteByFactureId(id: number){
    return this.http.delete<number>(`${this.api}/facture/${id}`);
  }

  public findByFactureId(id: number){
    return this.http.get<RetourProduit>(`${this.api}/facture/${id}`);
  }
  public deleteByRemboursementsId(id: number){
    return this.http.delete<number>(`${this.api}/remboursements/${id}`);
  }

  public findByRemboursementsId(id: number){
    return this.http.get<RetourProduit>(`${this.api}/remboursements/${id}`);
  }
  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<RetourProduit>>(`${this.api}/entreprise/${id}`);
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

  public get item(): RetourProduit {
    if (this._item == null)
      this._item = new RetourProduit();
    return this._item;
  }

  public set item(value: RetourProduit ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
      created: this.toReturn()
    }
   this.returnUrl = ""
    this.item = new RetourProduit()
    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
}

