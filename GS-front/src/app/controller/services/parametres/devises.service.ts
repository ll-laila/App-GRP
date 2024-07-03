import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Devises } from 'src/app/controller/entities/parametres/devises';
import { DevisesValidator } from 'src/app/controller/validators/parametres/devises.validator';

@Injectable({ providedIn: 'root' })
export class DevisesService {
  private readonly api = environment.apiUrl + "devises";
  private _item!: Devises ;
  private _items!: Array<Devises>;
  private _pagination!: Pagination<Devises>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<Devises>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<Devises>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<Devises>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Devises>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<Devises>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<Devises>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Devises>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Devises>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Devises) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Devises>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByNouvelleDeviseId(id: number){
    return this.http.delete<number>(`${this.api}/nouvelledevise/${id}`);
  }

  public findByNouvelleDeviseId(id: number){
    return this.http.get<Array<Devises>>(`${this.api}/nouvelledevise/${id}`);
  }
  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<Devises>>(`${this.api}/entreprise/${id}`);
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

  public get item(): Devises {
    if (this._item == null)
      this._item = new Devises();
    return this._item;
  }

  public set item(value: Devises ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Devises()

    return created
  }
}

