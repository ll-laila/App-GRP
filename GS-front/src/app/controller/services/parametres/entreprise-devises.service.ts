import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { EntrepriseDevises } from 'src/app/controller/entities/parametres/entreprise-devises';
import { EntrepriseDevisesValidator } from 'src/app/controller/validators/parametres/entreprise-devises.validator';

@Injectable({ providedIn: 'root' })
export class EntrepriseDevisesService {
  private readonly api = environment.apiUrl + "entreprisedevises";
  private _item!: EntrepriseDevises ;
  private _items!: Array<EntrepriseDevises>;
  private _pagination!: Pagination<EntrepriseDevises>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<EntrepriseDevises>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<EntrepriseDevises>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<EntrepriseDevises>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<EntrepriseDevises>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<EntrepriseDevises>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<EntrepriseDevises>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<EntrepriseDevises>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<EntrepriseDevises>>(`${this.api}/all`, this.items);
  }

  public delete(dto: EntrepriseDevises) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<EntrepriseDevises>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<EntrepriseDevises>>(`${this.api}/entreprise/${id}`);
  }
  public deleteByDevisesId(id: number){
    return this.http.delete<number>(`${this.api}/devises/${id}`);
  }

  public findByDevisesId(id: number){
    return this.http.get<Array<EntrepriseDevises>>(`${this.api}/devises/${id}`);
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

  public get item(): EntrepriseDevises {
    if (this._item == null)
      this._item = new EntrepriseDevises();
    return this._item;
  }

  public set item(value: EntrepriseDevises ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new EntrepriseDevises()

    return created
  }
}

