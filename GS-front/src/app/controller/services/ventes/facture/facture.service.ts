import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Pagination} from "src/app/controller/utils/pagination/pagination";
import { Facture } from 'src/app/controller/entities/ventes/facture/facture';
import { FactureValidator } from 'src/app/controller/validators/ventes/facture/facture.validator';
import { PaiementValidator } from 'src/app/controller/validators/ventes/paiement.validator';
import { RetourProduitValidator } from 'src/app/controller/validators/ventes/retourproduit/retour-produit.validator';
import { AdresseValidator } from 'src/app/controller/validators/adresse/adresse.validator';
import {CodeResponse} from "../../../utils/code/code-response";
import {Observable} from "rxjs";
import {PaiementService} from "../paiement.service";
import {Commande} from "../../../entities/ventes/commande/commande";

@Injectable({ providedIn: 'root' })
export class FactureService {
  private readonly api = environment.apiUrl + "facture";
  private _item!: Facture ;
  private _items!: Array<Facture>;
  private _pagination!: Pagination<Facture>
  protected paiementService!:PaiementService;

  private http = inject(HttpClient)

  public keepData: boolean = false
 public returnUrl!: string  ; public toReturn = () => this.returnUrl != undefined


  public findAll() {
    return this.http.get<Array<Facture>>(this.api);
  }

  public getFactures(id: number) {
    return this.http.get<Array<Facture>>(`${this.api}/fcaturesErp/${id}`);
  }

  public findById(id: number) {
    return this.http.get<Facture>(`${this.api}/id/${id}`);
  }

  public findAllOptimized() {
    return this.http.get<Array<Facture>>(`${this.api}/optimized`);
  }

  public findPaginated(page: number = 0, size: number = 10) {
    return this.http.get<Pagination<Facture>>(`${this.api}/paginated?page=${page}&size=${size}`);
  }


  public create() {
    return this.http.post<Facture>(this.api, this.item);
  }

  public facturePaiement(  idF : number,   idP: number){
  return this.http.put<Facture>(this.api + "/idF/" + idF + "/idP/" + idP,null);
}
  public createList() {
    return this.http.post<Array<Facture>>(`${this.api}/all`, this.items);
  }

  public update() {
    return this.http.put<Facture>(this.api, this.item);
  }

  public updateList() {
    return this.http.put<Array<Facture>>(`${this.api}/all`, this.items);
  }

  public delete(dto: Facture) {
    return this.http.delete<number>(this.api, {body: dto});
  }

  public deleteAll(dtos: Array<Facture>) {
    return this.http.delete<number>(this.api, {body: dtos});
  }

  public deleteById(id: number) {
    return this.http.delete<number>(`${this.api}/id/${id}`);
  }

  public deleteByPaiementId(id: number){
    return this.http.delete<number>(`${this.api}/paiement/${id}`);
  }

  public findByPaiementId(id: number){
    return this.http.get<Facture>(`${this.api}/paiement/${id}`);
  }
  public deleteByRetourProduitId(id: number){
    return this.http.delete<number>(`${this.api}/retourproduit/${id}`);
  }

  public findByRetourProduitId(id: number){
    return this.http.get<Facture>(`${this.api}/retourproduit/${id}`);
  }
  public deleteByTaxeId(id: number){
    return this.http.delete<number>(`${this.api}/taxe/${id}`);
  }
  public findByTaxeId(id: number){
    return this.http.get<Array<Facture>>(`${this.api}/taxe/${id}`);
  }
  public deleteByTaxeExpeditionId(id: number){
    return this.http.delete<number>(`${this.api}/taxeexpedition/${id}`);
  }

  public findByTaxeExpeditionId(id: number){
    return this.http.get<Array<Facture>>(`${this.api}/taxeexpedition/${id}`);
  }
  public deleteByClientId(id: number){
    return this.http.delete<number>(`${this.api}/client/${id}`);
  }

  public findByClientId(id: number){
    return this.http.get<Array<Facture>>(`${this.api}/client/${id}`);
  }
  public deleteByDevisesId(id: number){
    return this.http.delete<number>(`${this.api}/devises/${id}`);
  }

  public findByDevisesId(id: number){
    return this.http.get<Array<Facture>>(`${this.api}/devises/${id}`);
  }
  public deleteByNiveauPrixId(id: number){
    return this.http.delete<number>(`${this.api}/niveauPrix/${id}`);
  }

  public findByNiveauPrixId(id: number){
    return this.http.get<Array<Facture>>(`${this.api}/niveauPrix/${id}`);
  }
  public deleteByAddressFacturationId(id: number){
    return this.http.delete<number>(`${this.api}/addressfacturation/${id}`);
  }

  public findByAddressFacturationId(id: number){
    return this.http.get<Facture>(`${this.api}/addressfacturation/${id}`);
  }
  public deleteByAddressExpeditionId(id: number){
    return this.http.delete<number>(`${this.api}/addressexpedition/${id}`);
  }

  public findByAddressExpeditionId(id: number){
    return this.http.get<Facture>(`${this.api}/addressexpedition/${id}`);
  }
  public deleteByEntrepriseId(id: number){
    return this.http.delete<number>(`${this.api}/entreprise/${id}`);
  }

  public findByEntrepriseId(id: number){
    return this.http.get<Array<Facture>>(`${this.api}/entreprise/${id}`);
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

  get paginationF() {
    if (this._pagination == null)
      this._pagination = new Pagination();
    return this._pagination;
  }

  set paginationF(value) {
    this._pagination = value;
  }

  public set items(value) {
    this._items = value;
  }

  public get item(): Facture {
    if (this._item == null)
      this._item = new Facture();
    return this._item;
  }

  public set item(value: Facture ) {
    this._item = value;
  }

  public get createdItemAfterReturn() {
    let created = {
      item: this.item,
       created: this.toReturn()
    }
    this.returnUrl = ""
    this.item = new Facture()

    return created
  }
  public getNextCode() {
    return this.http.get<CodeResponse>(`${this.api}/next-code`);
  }
  public  generateDocument() {
   return this.http.get<string>(`${this.api}/generate/document`);
  }


}

