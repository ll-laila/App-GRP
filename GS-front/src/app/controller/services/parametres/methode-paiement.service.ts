import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { MethodePaiement } from 'src/app/controller/entities/parametres/methode-paiement';
import { MethodePaiementValidator } from 'src/app/controller/validators/parametres/methode-paiement.validator';

@Injectable({ providedIn: 'root' })
export class MethodePaiementService {
  private readonly api = environment.apiUrl + "methodepaiement";
  private _item!: MethodePaiement ;
  private _items!: Array<MethodePaiement>;
  private _pagination!: Pagination<MethodePaiement>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<MethodePaiement>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<MethodePaiement>(`${this.api}/id/${id}`);
  }

    public findByEntrepriseId(id: number) {
        return this.http.get<Array<MethodePaiement>>(`${this.api}/Entreprise/id/${id}`);
    }


    public findAllOptimized() {
    return this.http.get<Array<MethodePaiement>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<MethodePaiement>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create(id: number) {
    return this.http.post<MethodePaiement>(`${this.api}/${id}`, this.item);
  }

  public createList() {
    return this.http.post<Array<MethodePaiement>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<MethodePaiement>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<MethodePaiement>>(`${this.api}/all`, this.items);
  }

  public delete(dto: MethodePaiement) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<MethodePaiement>) {
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

  public get item(): MethodePaiement {
    if (this._item == null)
      this._item = new MethodePaiement();
    return this._item;
  }

  public set item(value: MethodePaiement ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new MethodePaiement()

    return created
  }
}

