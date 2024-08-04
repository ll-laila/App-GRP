import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { NiveauPrix } from 'src/app/controller/entities/parametres/niveau-prix';
import { NiveauPrixValidator } from 'src/app/controller/validators/parametres/niveau-prix.validator';
import {MethodePaiement} from "../../entities/parametres/methode-paiement";

@Injectable({ providedIn: 'root' })
export class NiveauPrixService {
  private readonly api = environment.apiUrl + "niveauprix";
  private _item!: NiveauPrix ;
  private _items!: Array<NiveauPrix>;
  private _pagination!: Pagination<NiveauPrix>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<NiveauPrix>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<NiveauPrix>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<NiveauPrix>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<NiveauPrix>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<NiveauPrix>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<NiveauPrix>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<NiveauPrix>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<NiveauPrix>>(`${this.api}/all`, this.items);
  }

  public delete(dto: NiveauPrix) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<NiveauPrix>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

    public findByEntrepriseId(id: number) {
        return this.http.get<Array<NiveauPrix>>(`${this.api}/Entreprise/id/${id}`);
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

  public get item(): NiveauPrix {
    if (this._item == null)
      this._item = new NiveauPrix();
    return this._item;
  }

  public set item(value: NiveauPrix ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new NiveauPrix()

    return created
  }
}

