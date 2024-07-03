import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { DestinataireEmploye } from 'src/app/controller/entities/parametres/destinataire-employe';

@Injectable({ providedIn: 'root' })
export class DestinataireEmployeService {
  private readonly api = environment.apiUrl + "destinataireemploye";
  private _item!: DestinataireEmploye ;
  private _items!: Array<DestinataireEmploye>;
  private _pagination!: Pagination<DestinataireEmploye>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<DestinataireEmploye>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<DestinataireEmploye>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<DestinataireEmploye>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<DestinataireEmploye>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<DestinataireEmploye>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<DestinataireEmploye>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<DestinataireEmploye>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<DestinataireEmploye>>(`${this.api}/all`, this.items);
  }

  public delete(dto: DestinataireEmploye) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<DestinataireEmploye>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByEmployeId(id: number){
    return this.http.delete<number>(`${this.api}/employe/${id}`);
  }

  public findByEmployeId(id: number){
    return this.http.get<Array<DestinataireEmploye>>(`${this.api}/employe/${id}`);
  }
  public deleteByAlerteId(id: number){
    return this.http.delete<number>(`${this.api}/alerte/${id}`);
  }

  public findByAlerteId(id: number){
    return this.http.get<Array<DestinataireEmploye>>(`${this.api}/alerte/${id}`);
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

  public get item(): DestinataireEmploye {
    if (this._item == null)
      this._item = new DestinataireEmploye();
    return this._item;
  }

  public set item(value: DestinataireEmploye ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new DestinataireEmploye()

    return created
  }
}

