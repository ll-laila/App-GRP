import { inject, Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable} from 'rxjs';
import { navItems2 } from '../../../layout/default-layout/nav';
import { TokenService } from '../../auth/services/token.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notification } from '../../entities/parametres/notification';
import {Employe} from "../../entities/contacts/user/employe";
import {AppUser} from "../../auth/entities/app-user";
import {EntrepriseService} from "./entreprise.service";
import {Entreprise} from "../../entities/parametres/entreprise";
import {UserInfosService} from "../../shared/user-infos.service";
import {AppUserService} from "../../auth/services/app-user.service";
import {EmployeService} from "../contacts/user/employe.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _tokenService = inject(TokenService);
  private _router = inject(Router);
  private _loading = false;
  protected employe!: Employe;
  private employeService = inject(EmployeService);
  private _userInfosService=inject(UserInfosService);
  constructor() {}

  private readonly api = environment.apiUrl + 'notifications';
  private _http = inject(HttpClient);
  private _item!: Notification;
  private _items!: Array<Notification>;
  private _keepData: boolean = false;
  private _returnUrl: string = '';
  private iSemploye:number=0;
  private _toReturn = () => this._returnUrl != undefined;

  public findAll(id: number) {
    return this._http.get<Array<Notification>>(`${this.api}/${id}`);
  }

  delete(notification: Notification): Observable<void> {
    const url = `${this.api}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: notification
    };
    return this._http.delete<void>(url, httpOptions);
  }
  public createNotification(type: string, message: string, nomEmploye: string, employe: Employe, entrepriseId: number) {
    const newNotification: Notification = { type, message, nomEmploye, employe, entrepriseId };
    console.log('Notification to be sent:', newNotification);
    return this._http.post<Notification>(this.api, newNotification).pipe(
        tap(response => {
          console.log('Response from API:', response);
        }),
        catchError(error => {
          console.error('Error from API:', error);
          throw error; // Vous pouvez gérer les erreurs ici ou les propager pour une gestion ultérieure
        })
    );
  }

public handelcreate(type: string, message: string, entrepriseId: number){
  this.iSemploye = this.isEmploye;
  console.log(this.iSemploye);
  // Vérifiez si l'utilisateur est un employé avant de créer la notification
  if (this.iSemploye == 1) {
    console.log('User is an employe');
    this.getEmployeByUsername().subscribe({
      next: (employe: Employe) => {
        const nomEmploye = employe?.nom || 'Nom Inconnu';
        // Créez la notification une fois que l'employé est récupéré
        this.createNotification(
            type,
            message,
            nomEmploye,
            employe,
            entrepriseId
        ).subscribe({
          next: response => {
            console.log('Notification envoyée avec succès', response);
          },
          error: error => {
            console.error('Erreur lors de l\'envoi de la notification', error);
          }
        });
      },
      error: err => {
        console.error('Erreur lors de la récupération de l\'employé pour la notification', err);
      }
    });
  } else {
    console.log('User is not an employe');
  }
}

  public get isEmploye() {
    const newVar = this._tokenService.getRole()?.some(it => it == 'EMPLOYE') ? 1 : 0;
    return newVar;
  }

  public getEmployeByUsername(): Observable<Employe> {
    this._loading = true;
    return this.employeService.findByUserName(this._userInfosService.getUsername()).pipe(
        tap((res: Employe) => {
          this.employe = res;
          console.log('Employé récupéré:', this.employe);
          this._loading = false;
        }),
        catchError((err) => {
          console.error('Erreur lors de la récupération de l\'employé:', err);
          this._loading = false;
          throw err; // Vous pouvez gérer les erreurs ici ou les propager pour une gestion ultérieure
        })
    );
  }

  get item(): Notification {
    return this._item;
  }

  set item(value: Notification) {
    this._item = value;
  }

  get items(): Array<Notification> {
    return this._items;
  }

  set items(value: Array<Notification>) {
    this._items = value;
  }
}
