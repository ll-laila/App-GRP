import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseSelectedService {


  private entrepriseSelected: number = 0;

  private readonly entrepriseSelected_KEY = 'entrepriseSelected';

  constructor() { }

  setEntrepriseSelected(entrepriseSelected: number) {
    this.entrepriseSelected = entrepriseSelected;
    localStorage.setItem(this.entrepriseSelected_KEY, entrepriseSelected.toString());
  }

  getEntrepriseSelected(): number {
    const id = localStorage.getItem(this.entrepriseSelected_KEY);
    return id ? Number(id) : 0;
  }

  clearEntrepriseSelected() {
    localStorage.removeItem(this.entrepriseSelected_KEY);
  }
}
