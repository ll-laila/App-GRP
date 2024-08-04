import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { NouvelleDevise } from 'src/app/controller/entities/parametres/nouvelle-devise';
import { NouvelleDeviseValidator } from 'src/app/controller/validators/parametres/nouvelle-devise.validator';

@Injectable({ providedIn: 'root' })
export class NouvelleDeviseService {
  private readonly api = environment.apiUrl + "nouvelledevise";
  private _item!: NouvelleDevise ;
  private _items!: Array<NouvelleDevise>;
  private _pagination!: Pagination<NouvelleDevise>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<NouvelleDevise>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<NouvelleDevise>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<NouvelleDevise>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<NouvelleDevise>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<NouvelleDevise>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<NouvelleDevise>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<NouvelleDevise>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<NouvelleDevise>>(`${this.api}/all`, this.items);
  }

  public delete(dto: NouvelleDevise) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<NouvelleDevise>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<NouvelleDevise>>(`${this.api}/entreprise/id/${id}`);
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

  public get item(): NouvelleDevise {
    if (this._item == null)
      this._item = new NouvelleDevise();
    return this._item;
  }

  public set item(value: NouvelleDevise ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new NouvelleDevise()

    return created
  }
}

