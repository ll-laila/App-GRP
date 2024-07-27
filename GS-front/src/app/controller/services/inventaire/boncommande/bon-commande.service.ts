import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { BonCommande } from 'src/app/controller/entities/inventaire/boncommande/bon-commande';
import { BonCommandeValidator } from 'src/app/controller/validators/inventaire/boncommande/bon-commande.validator';
import { LivraisonValidator } from 'src/app/controller/validators/inventaire/livraison/livraison.validator';
import {CodeResponse} from "../../../utils/code/code-response";
import {Facture} from "../../../entities/ventes/facture/facture";
import {NiveauStock} from "../../../entities/inventaire/niveau-stock";

@Injectable({ providedIn: 'root' })
export class BonCommandeService {
  private readonly api = environment.apiUrl + "boncommande";
  private _item!: BonCommande ;
  private _items!: Array<BonCommande>;
  private _pagination!: Pagination<BonCommande>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined

    public getCout(entrepriseId: number) {
        return this.http.get<number>(`${this.api}/cout/${entrepriseId}`);
    }

    public getBonCommandes(entrepriseId: number) {
        return this.http.get<Array<BonCommande>>(`${this.api}/bonCommandesErp/${entrepriseId}`);
    }

    public getNbAchats(entrepriseId: number) {
        return this.http.get<number>(`${this.api}/achats/${entrepriseId}`);
    }

  public findAll() {
    return this.http.get<Array<BonCommande>>(this.api);
  }

  public findByIdFor(idFor: number) {
      return this.http.get<Array<BonCommande>>(`${this.api}/idFor/${idFor}`);
  }

    public findById(id: number | undefined) {
    return this.http.get<BonCommande>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<BonCommande>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<BonCommande>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<BonCommande>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<BonCommande>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<BonCommande>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<BonCommande>>(`${this.api}/all`, this.items);
  }

  public delete(dto: BonCommande) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<BonCommande>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByLivraisonId(id: number){
    return this.http.delete<number>(`${this.api}/livraison/${id}`);
  }
  public bonCmdLivraispn(  idC : number,   idL: number){
    return this.http.put<BonCommande>(this.api + "/idC/" + idC + "/idL/" + idL,null);
  }
  public findByLivraisonId(id: number){
    return this.http.get<BonCommande>(`${this.api}/livraison/${id}`);
  }
  public deleteByTaxeId(id: number){
    return this.http.delete<number>(`${this.api}/taxe/${id}`);
  }

  public findByTaxeId(id: number){
    return this.http.get<Array<BonCommande>>(`${this.api}/taxe/${id}`);
  }
  public deleteByTaxeExpeditionId(id: number){
    return this.http.delete<number>(`${this.api}/taxeexpedition/${id}`);
  }

  public findByTaxeExpeditionId(id: number){
    return this.http.get<Array<BonCommande>>(`${this.api}/taxeexpedition/${id}`);
  }
  public deleteByFournisseurId(id: number){
    return this.http.delete<number>(`${this.api}/fournisseur/${id}`);
  }

  public findByFournisseurId(id: number){
    return this.http.get<Array<BonCommande>>(`${this.api}/fournisseur/${id}`);
  }
  public deleteByDevisesId(id: number){
    return this.http.delete<number>(`${this.api}/devises/${id}`);
  }

  public findByDevisesId(id: number){
    return this.http.get<Array<BonCommande>>(`${this.api}/devises/${id}`);
  }
  public deleteByNiveauPrixId(id: number){
    return this.http.delete<number>(`${this.api}/niveauPrix/${id}`);
  }

  public findByNiveauPrixId(id: number){
    return this.http.get<Array<BonCommande>>(`${this.api}/niveauPrix/${id}`);
  }
  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<BonCommande>>(`${this.api}/entreprise/${id}`);
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

  public get item(): BonCommande {
    if (this._item == null)
      this._item = new BonCommande();
    return this._item;
  }

  public set item(value: BonCommande ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new BonCommande()

    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
}

