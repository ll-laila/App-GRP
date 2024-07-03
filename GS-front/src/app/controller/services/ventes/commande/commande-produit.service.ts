import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { CommandeProduit } from 'src/app/controller/entities/ventes/commande/commande-produit';
import { CommandeProduitValidator } from 'src/app/controller/validators/ventes/commande/commande-produit.validator';
import {CodeResponse} from "../../../utils/code/code-response";

@Injectable({ providedIn: 'root' })
export class CommandeProduitService {
  private readonly api = environment.apiUrl + "commandeproduit";
  private _item!: CommandeProduit ;
  private _items!: Array<CommandeProduit>;
  private _pagination!: Pagination<CommandeProduit>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<CommandeProduit>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<CommandeProduit>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<CommandeProduit>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<CommandeProduit>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<CommandeProduit>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<CommandeProduit>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<CommandeProduit>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<CommandeProduit>>(`${this.api}/all`, this.items);
  }

  public delete(dto: CommandeProduit) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<CommandeProduit>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByProduitId(id: number){
    return this.http.delete<number>(`${this.api}/produit/${id}`);
  }

  public findByProduitId(id: number){
    return this.http.get<Array<CommandeProduit>>(`${this.api}/produit/${id}`);
  }
  public deleteByCommandeId(id: number){
    return this.http.delete<number>(`${this.api}/commande/${id}`);
  }

  public findByCommandeId(id: number){
    return this.http.get<Array<CommandeProduit>>(`${this.api}/commande/${id}`);
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

  public get item(): CommandeProduit {
    if (this._item == null)
      this._item = new CommandeProduit();
    return this._item;
  }

  public set item(value: CommandeProduit ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new CommandeProduit()

    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
}

