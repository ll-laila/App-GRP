import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Client } from 'src/app/controller/entities/contacts/client';
import { ClientValidator } from 'src/app/controller/validators/contacts/client.validator';
import { AdresseValidator } from 'src/app/controller/validators/adresse/adresse.validator';
import {CodeResponse} from "../../utils/code/code-response";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private readonly api = environment.apiUrl + "client";
  private _item!: Client ;
  private _items!: Array<Client>;
  private _pagination!: Pagination<Client>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined

    public getNbClients(entrepriseId: number) {
        return this.http.get<number>(`${this.api}/clients/${entrepriseId}`);
    }

    public getClients(id: number) {
        return this.http.get<Array<Client>>(`${this.api}/clientsErp/${id}`);
    }

    public getClientStats(idEntreprise: number): Observable<any> {
        return this.http.get(`${this.api}/client-stats/${idEntreprise}`);
    }

  public findAll() {
    return this.http.get<Array<Client>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<Client>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<Client>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Client>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<Client>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<Client>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Client>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Client>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Client) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Client>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByAdresseId(id: number){
    return this.http.delete<number>(`${this.api}/adresse/${id}`);
  }

  public findByAdresseId(id: number){
    return this.http.get<Client>(`${this.api}/adresse/${id}`);
  }
  public deleteByDevisesId(id: number){
    return this.http.delete<number>(`${this.api}/devises/${id}`);
  }

  public findByDevisesId(id: number){
    return this.http.get<Array<Client>>(`${this.api}/devises/${id}`);
  }
  public deleteByNiveauPrixId(id: number){
    return this.http.delete<number>(`${this.api}/niveauPrix/${id}`);
  }

  public findByNiveauPrixId(id: number){
    return this.http.get<Array<Client>>(`${this.api}/niveauPrix/${id}`);
  }
  public deleteByTaxeId(id: number){
    return this.http.delete<number>(`${this.api}/taxe/${id}`);
  }

  public findByTaxeId(id: number){
    return this.http.get<Array<Client>>(`${this.api}/taxe/${id}`);
  }
  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<Client>>(`${this.api}/entreprise/${id}`);
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
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }

  public set items(value) {
    this._items = value;
  }

  public get item(): Client {
    if (this._item == null)
      this._item = new Client();
    return this._item;
  }

  public set item(value: Client ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Client()

    return created
  }
}

