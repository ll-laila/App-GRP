import { Component } from '@angular/core';
import {Employe} from "../../../controller/entities/contacts/user/employe";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {Entreprise} from "../../../controller/entities/parametres/entreprise";

@Component({
  selector: 'app-details-employe',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './details-employe.component.html',
  styleUrl: './details-employe.component.scss'
})
export class DetailsEmployeComponent {

  employe: Employe;


  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.employe = navigation?.extras?.state?.['employe'];
    console.log("emp :", this.employe);
  }

}
