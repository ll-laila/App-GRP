import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Employe } from 'src/app/controller/entities/contacts/user/employe';
import {CodeResponse} from "../../../utils/code/code-response";
import {Entreprise} from "../../../entities/parametres/entreprise";

@Injectable({ providedIn: 'root' })
export class EmployeService {
  private readonly api = environment.apiUrl + "employe";
  private _item!: Employe ;
  private _items!: Array<Employe>;
  private _pagination!: Pagination<Employe>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


    public findAll() {
    return this.http.get<Array<Employe>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<Employe>(`${this.api}/id/${id}`);
  }

    public findByUserName(username: string) {
        return this.http.get<Employe>(`${this.api}/${username}`);
    }


  public findAllOptimized() {
    return this.http.get<Array<Employe>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Employe>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<Employe>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<Employe>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Employe>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Employe>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Employe) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Employe>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByAdresseId(id: number){
    return this.http.delete<number>(`${this.api}/adresse/${id}`);
  }

  public findByAdresseId(id: number){
    return this.http.get<Employe>(`${this.api}/adresse/${id}`);
  }
  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<Employe>>(`${this.api}/entreprise/${id}`);
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

  public get item(): Employe {
    if (this._item == null)
      this._item = new Employe();
    return this._item;
  }

  public set item(value: Employe ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Employe()

    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
}

