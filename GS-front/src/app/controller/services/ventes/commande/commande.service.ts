import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Commande } from 'src/app/controller/entities/ventes/commande/commande';
import { CommandeValidator } from 'src/app/controller/validators/ventes/commande/commande.validator';
import { FactureValidator } from 'src/app/controller/validators/ventes/facture/facture.validator';
import { AdresseValidator } from 'src/app/controller/validators/adresse/adresse.validator';
import {CodeResponse} from "../../../utils/code/code-response";
import {Facture} from "../../../entities/ventes/facture/facture";
import {Entreprise} from "../../../entities/parametres/entreprise";
import {Client} from "../../../entities/contacts/client";


@Injectable({ providedIn: 'root' })
export class CommandeService {
  private readonly api = environment.apiUrl + "commande";
  private _item!: Commande ;
  private _items!: Array<Commande>;
  private _pagination!: Pagination<Commande>

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


    public getNbCommandes(entrepriseId: number) {
        return this.http.get<number>(`${this.api}/commandes/${entrepriseId}`);
    }

    public getCommandes(id: number) {
        return this.http.get<Array<Commande>>(`${this.api}/commandesErp/${id}`);
    }


    public findAll() {
    return this.http.get<Array<Commande>>(this.api);
  }

  public findById(id: number) {
    return this.http.get<Commande>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<Commande>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Commande>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }

  public create() {
    return this.http.post<Commande>(this.api, this.item);
  }

  public createList() {
    return this.http.post<Array<Commande>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Commande>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Commande>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Commande) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Commande>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByFactureId(id: number){
    return this.http.delete<number>(`${this.api}/facture/${id}`);
  }

  public findByFactureId(id: number){
    return this.http.get<Commande>(`${this.api}/facture/${id}`);
  }
  public deleteByTaxeId(id: number){
    return this.http.delete<number>(`${this.api}/taxe/${id}`);
  }

  public findByTaxeId(id: number){
    return this.http.get<Array<Commande>>(`${this.api}/taxe/${id}`);
  }
  public deleteByTaxeExpeditionId(id: number){
    return this.http.delete<number>(`${this.api}/taxeexpedition/${id}`);
  }

  public findByTaxeExpeditionId(id: number){
    return this.http.get<Array<Commande>>(`${this.api}/taxeexpedition/${id}`);
  }
  public deleteByClientId(id: number){
    return this.http.delete<number>(`${this.api}/client/${id}`);
  }

  public findByClientId(id: number){
    return this.http.get<Array<Commande>>(`${this.api}/client/${id}`);
  }
  public deleteByDevisesId(id: number){
    return this.http.delete<number>(`${this.api}/devises/${id}`);
  }

  public findByDevisesId(id: number){
    return this.http.get<Array<Commande>>(`${this.api}/devises/${id}`);
  }
  public deleteByNiveauPrixId(id: number){
    return this.http.delete<number>(`${this.api}/niveauPrix/${id}`);
  }

  public findByNiveauPrixId(id: number){
    return this.http.get<Array<Commande>>(`${this.api}/niveauPrix/${id}`);
  }
  public deleteByAddressFacturationId(id: number){
    return this.http.delete<number>(`${this.api}/addressfacturation/${id}`);
  }

  public findByAddressFacturationId(id: number){
    return this.http.get<Commande>(`${this.api}/addressfacturation/${id}`);
  }
  public deleteByAddressExpeditionId(id: number){
    return this.http.delete<number>(`${this.api}/addressexpedition/${id}`);
  }

  public findByAddressExpeditionId(id: number){
    return this.http.get<Commande>(`${this.api}/addressexpedition/${id}`);
  }
  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<Commande>>(`${this.api}/entreprise/${id}`);
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

  public get item(): Commande {
    if (this._item == null)
      this._item = new Commande();
    return this._item;
  }

  public set item(value: Commande ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Commande()

    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
  public commandeFacture(  idC : number,   idF: number){
    return this.http.put<Commande>(this.api + "/idC/" + idC + "/idF/" + idF,null);
  }
}

