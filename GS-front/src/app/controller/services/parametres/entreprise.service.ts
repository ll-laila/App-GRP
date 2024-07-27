import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Entreprise } from 'src/app/controller/entities/parametres/entreprise';


@Injectable({ providedIn: 'root' })
export class EntrepriseService {
  private readonly api = environment.apiUrl + "entreprise";
  private _item!: Entreprise ;
  private _items!: Array<Entreprise>;
  private _pagination!: Pagination<Entreprise>

  private http = inject(HttpClient)

  public keepData: boolean = false
  public returnUrl: string  = ''
  public toReturn = () => this.returnUrl != undefined


  public findEntreprisesAdroitAcces(id : number) {
    return this.http.get<Array<Entreprise>>(`${this.api}/employe/${id}`);
  }

  public findAll() {
    return this.http.get<Array<Entreprise>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<Entreprise>(`${this.api}/id/${id}`);
  }

  public findByAdmin(username: string) {
    return this.http.get<Array<Entreprise>>(`${this.api}/Admin/Entreprises/${username} `);
  }

  public findAllOptimized() {
    return this.http.get<Array<Entreprise>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Entreprise>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  // public create() {
  //   return this.http.post<Entreprise>(this.api, this.item);
  // }

  public create(formData: FormData) {
    formData.append("item", JSON.stringify(this.item));
    return this.http.post<Entreprise>(this.api, formData);
  }


  public createList() {
    return this.http.post<Array<Entreprise>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Entreprise>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Entreprise>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Entreprise) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Entreprise>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByAdresseId(id: number){
    return this.http.delete<number>(`${this.api}/adresse/${id}`);
  }

  public findByAdresseId(id: number){
    return this.http.get<Entreprise>(`${this.api}/adresse/${id}`);
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

  public get item(): Entreprise {
    if (this._item == null)
      this._item = new Entreprise();
    return this._item;
  }

  public set item(value: Entreprise ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
      created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Entreprise()
    return created
  }
}

