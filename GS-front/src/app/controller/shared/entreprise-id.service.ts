import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseIdService {

  private idEntreprise: number = 0;

  private readonly idEntreprise_KEY = 'idEntreprise';

  constructor() { }

  setIdEntreprise(idEntreprise: number) {
    this.idEntreprise = idEntreprise;
    localStorage.setItem(this.idEntreprise_KEY, idEntreprise.toString());
  }

  getIdEntreprise(): number {
    const id = localStorage.getItem(this.idEntreprise_KEY);
    return id ? Number(id) : 0;
  }

  clearIdEntreprise() {
    localStorage.removeItem(this.idEntreprise_KEY);
  }
}
