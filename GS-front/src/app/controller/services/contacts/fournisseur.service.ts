import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Fournisseur } from 'src/app/controller/entities/contacts/fournisseur';
import { FournisseurValidator } from 'src/app/controller/validators/contacts/fournisseur.validator';
import { AdresseValidator } from 'src/app/controller/validators/adresse/adresse.validator';
import {CodeResponse} from "../../utils/code/code-response";
import {Client} from "../../entities/contacts/client";

@Injectable({ providedIn: 'root' })
export class FournisseurService {
  private readonly api = environment.apiUrl + "fournisseur";
  private _item!: Fournisseur ;
  private _items!: Array<Fournisseur>;
  private _pagination!: Pagination<Fournisseur>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


    public getNbFournisseurs(entrepriseId: number) {
        return this.http.get<number>(`${this.api}/fournisseurs/${entrepriseId}`);
    }

    public getFournisseurs(id: number) {
        return this.http.get<Array<Fournisseur>>(`${this.api}/fournisseurErp/${id}`);
    }
  public findAll() {
    return this.http.get<Array<Fournisseur>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<Fournisseur>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<Fournisseur>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Fournisseur>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<Fournisseur>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<Fournisseur>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Fournisseur>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Fournisseur>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Fournisseur) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Fournisseur>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByAdresseId(id: number){
    return this.http.delete<number>(`${this.api}/adresse/${id}`);
  }

  public findByAdresseId(id: number){
    return this.http.get<Fournisseur>(`${this.api}/adresse/${id}`);
  }
  public deleteByDevisesId(id: number){
    return this.http.delete<number>(`${this.api}/devises/${id}`);
  }

  public findByDevisesId(id: number){
    return this.http.get<Array<Fournisseur>>(`${this.api}/devises/${id}`);
  }
  public deleteByNiveauPrixId(id: number){
    return this.http.delete<number>(`${this.api}/niveauPrix/${id}`);
  }

  public findByNiveauPrixId(id: number){
    return this.http.get<Array<Fournisseur>>(`${this.api}/niveauPrix/${id}`);
  }
  public deleteByTaxeId(id: number){
    return this.http.delete<number>(`${this.api}/taxe/${id}`);
  }

  public findByTaxeId(id: number){
    return this.http.get<Array<Fournisseur>>(`${this.api}/taxe/${id}`);
  }
  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<Fournisseur>>(`${this.api}/entreprise/${id}`);
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

  public get item(): Fournisseur {
    if (this._item == null)
      this._item = new Fournisseur();
    return this._item;
  }

  public set item(value: Fournisseur ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Fournisseur()

    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
}

