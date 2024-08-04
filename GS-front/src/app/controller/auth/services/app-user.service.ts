import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {AppUser} from 'src/app/controller/auth/entities/app-user';
import {AppUserValidator} from "src/app/controller/auth/validators/app-user.validator";
import {environment} from "src/environments/environment";
import {SubResponse} from "../../entities/parametres/abonnement/SubResponse";

@Injectable({providedIn: 'root'})
export class AppUserService {
  private readonly api = environment.apiUrl + "app-user";
  private _item!: AppUser ;
  private _items!: Array< AppUser>;
  private http = inject(HttpClient)

  public findAll() {
    return this.http.get< Array< AppUser>>(this.api);
  }


  public getDaysRemaining(username: string) {
    return this.http.get<SubResponse>(`${this.api}/essai/${username}`);
  }

  public findById(id: number) {
    return this.http.get< AppUser>(`${this.api}/id/${id}`);
  }

  public findByUsernameWithRoles(username: string) {
    return this.http.get<AppUser>(`${this.api}/username/${username}`);
  }

  public findByUsername(username: string){
    return this.http.get< AppUser>(`${this.api}/admin/${username}`);
  }

  public deleteById(id: number) {
    return this.http.delete< number>(`${this.api}/id/${id}`);
  }

  public deleteByUsername(username: string) {
    return this.http.delete< AppUser>(`${this.api}/username/${username}`);
  }

  public create() {
    return this.http.post< AppUser>(this.api, this.item);
  }

  public update() {
    return this.http.put< AppUser>(this.api, this.item);
  }

  public delete(dto: AppUser) {
    return this.http.delete< number>(this.api, {body: dto});
  }

  get item(): AppUser {
    if (this._item == null)
      this._item = new AppUser();
    return this._item;
  }

  set item(val: AppUser ) {
    this._item = val;
  }

  get items(): Array< AppUser> {
    if (this._items == undefined)
      this._items = []
    return this._items;
  }

  set items(value: Array< AppUser>) {
    this._items = value;
  }
}
