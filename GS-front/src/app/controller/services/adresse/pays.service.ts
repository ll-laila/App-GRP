import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Pays } from 'src/app/controller/entities/adresse/pays';
import { PaysValidator } from 'src/app/controller/validators/adresse/pays.validator';

@Injectable({ providedIn: 'root' })
export class PaysService {
  private readonly api = environment.apiUrl + "pays";
  private _item!: Pays ;
  private _items!: Array<Pays>;
  private _pagination!: Pagination<Pays>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<Pays>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<Pays>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<Pays>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Pays>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<Pays>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<Pays>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Pays>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Pays>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Pays) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Pays>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
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

  public get item(): Pays {
    if (this._item == null)
      this._item = new Pays();
    return this._item;
  }

  public set item(value: Pays ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Pays()
    return created
  }
}

