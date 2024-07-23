import {Injectable, inject} from '@angular/core';
import {environment} from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import {JwtRequest} from "src/app/controller/auth/entities/jwt-request";
import {JwtResponse} from "src/app/controller/auth/entities/jwt-response";
import {JwtRequestValidator} from "src/app/controller/auth/validators/jwt-request.validator";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _item!: JwtRequest ;
  private url = environment.login
  private http = inject(HttpClient)

  public login() {
    return this.http.post< JwtResponse>(this.url, this.item);
  }

  get item(): JwtRequest {
    if (this._item == null)
      this._item = new JwtRequest();
    return this._item;
  }

  set item(val: JwtRequest ) {
    this._item = val;
  }
}
