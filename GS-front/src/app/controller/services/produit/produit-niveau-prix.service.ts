import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { ProduitNiveauPrix } from 'src/app/controller/entities/produit/produit-niveau-prix';
import { ProduitNiveauPrixValidator } from 'src/app/controller/validators/produit/produit-niveau-prix.validator';

@Injectable({ providedIn: 'root' })
export class ProduitNiveauPrixService {
  private readonly api = environment.apiUrl + "produitniveauPrix";
  private _item!: ProduitNiveauPrix ;
  private _items!: Array<ProduitNiveauPrix>;
  private _pagination!: Pagination<ProduitNiveauPrix>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<ProduitNiveauPrix>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<ProduitNiveauPrix>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<ProduitNiveauPrix>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<ProduitNiveauPrix>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<ProduitNiveauPrix>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<ProduitNiveauPrix>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<ProduitNiveauPrix>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<ProduitNiveauPrix>>(`${this.api}/all`, this.items);
  }

  public delete(dto: ProduitNiveauPrix) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<ProduitNiveauPrix>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByProduitId(id: number){
    return this.http.delete<number>(`${this.api}/produit/${id}`);
  }

  public findByProduitId(id: number){
    return this.http.get<Array<ProduitNiveauPrix>>(`${this.api}/produit/id/${id}`);
  }
  public deleteByNiveauPrixId(id: number){
    return this.http.delete<number>(`${this.api}/niveauPrix/${id}`);
  }

  public findByNiveauPrixId(id: number){
    return this.http.get<Array<ProduitNiveauPrix>>(`${this.api}/niveauPrix/${id}`);
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

  public get item(): ProduitNiveauPrix {
    if (this._item == null)
      this._item = new ProduitNiveauPrix();
    return this._item;
  }

  public set item(value: ProduitNiveauPrix ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new ProduitNiveauPrix()
    return created
  }
}

