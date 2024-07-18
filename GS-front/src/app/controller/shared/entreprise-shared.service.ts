import { Injectable } from '@angular/core';
import { Entreprise } from '../entities/parametres/entreprise';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntrepriseSharedService {
  private entrepriseSelected!: Entreprise;

  setEntreprise(entreprise: Entreprise): void {
    this.entrepriseSelected = entreprise;
  }

  getEntreprise(): Entreprise {
    return this.entrepriseSelected;
  }


}
