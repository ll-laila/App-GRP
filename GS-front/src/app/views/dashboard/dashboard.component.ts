import {DOCUMENT, NgIf, NgStyle} from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
//import { ChartData } from 'chart.js';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { DashboardChartsData } from './dashboard-charts-data'; // Removed IChartProps
import { ClientService } from "../../controller/services/contacts/client.service";
import { EmployeService } from "../../controller/services/contacts/user/employe.service";
import { Employe } from "../../controller/entities/contacts/user/employe";
import { PermissionsAcces } from "../../controller/entities/contacts/user/PermissionsAcces";
import { EntrepriseSelectedService } from "../../controller/shared/entreprise-selected.service";
import { TokenService } from "../../controller/auth/services/token.service";
import { Entreprise } from "../../controller/entities/parametres/entreprise";
import { UserInfosService } from "../../controller/shared/user-infos.service";
import { EntrepriseService } from "../../controller/services/parametres/entreprise.service";
import {FournisseurService} from "../../controller/services/contacts/fournisseur.service";
import {CommandeService} from "../../controller/services/ventes/commande/commande.service";
import {ProduitService} from "../../controller/services/produit/produit.service";
import {BonCommandeService} from "../../controller/services/inventaire/boncommande/bon-commande.service";
import {Produit} from "../../controller/entities/produit/produit";
import {Router, RouterLink} from "@angular/router";
import {AppUserService} from "../../controller/auth/services/app-user.service";
import {SubResponse} from "../../controller/entities/parametres/abonnement/SubResponse";


interface IUser {
  nom: string;
  prenom: string;
  usage: number;
  email: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent, RouterLink, NgIf]
})
export class DashboardComponent implements OnInit {

  private fournisseurService = inject(FournisseurService);
  private clientService = inject(ClientService);
  private produitService = inject(ProduitService);
  private employeService = inject(EmployeService);
  private commandeService = inject(CommandeService);
  private bonCommandeService = inject(BonCommandeService);
  private entrepriseService = inject(EntrepriseService);
  private entrepriseSelectedService = inject(EntrepriseSelectedService);
  private userInfosService = inject(UserInfosService);
  private appUserService = inject(AppUserService);
  private tokenService = inject(TokenService);
  private router = inject(Router)
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);
  clientStats: any = {};
  public newClientAtWeek: number = 0;
  public employers: Employe[] = [];
  userList: IUser[] = [];
  public viewEmployers: boolean = true;
  public entreprises!: Entreprise[];
  protected produitList!: Produit[];
  protected top5Produits!: Produit[];
  public nbrProduits: number = 0;
  public nbrFournisseurs: number = 0;
  public nbrVentes: number = 0;
  public nbrAchats: number = 0;
  public nbrClients: number = 0;
  public remade: number = 0;
  public viewRemade: boolean = false;
  public subResponse!:SubResponse;



  ngOnInit(): void {
    const newVar = this.tokenService.getRole()?.some(it => it == "ADMIN") ? 1 : 0;
    if (newVar == 0) {
      this.viewEmployers = false;
    }

    if (newVar == 1) {
      this.getClientsForAdmin();
      this.getDaysRemaining(this.userInfosService.getUsername());
    } else {
      this.getClientsForEmployer();
    }

    this.getEmployers();

  }


  public getDaysRemaining(username: string){
    this.appUserService.getDaysRemaining(username).subscribe( res => {
      this.subResponse = res;
      this.remade = res.daysRemaining;
      if (this.remade  > 0 && this.remade  <= 7) {
        this.viewRemade = true;
        console.log("remade after still 7 days : ", this.remade);
      }
    }, error => {
      console.log(error);
    });
  }

  /******************************Clients charts*************************************/

  getNewClients(day: string): number {
    return this.clientStats[day]?.newClients || 0;
  }

  getRecurringClients(day: string): number {
    return this.clientStats[day]?.recurringClients || 0;
  }

  getClientsForEmployer() {
    if (this.entrepriseSelectedService.getEntrepriseSelected() != 0) {
      this.clientService.getClientStats(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe(data => {
        this.clientStats = data;
        console.log("data: ", data);
        this.getNbrAchats(this.entrepriseSelectedService.getEntrepriseSelected());
        this.getNbrVentes(this.entrepriseSelectedService.getEntrepriseSelected());
        this.getNbrProduits(this.entrepriseSelectedService.getEntrepriseSelected());
        this.getNbrFournisseurs(this.entrepriseSelectedService.getEntrepriseSelected());
        this.loadProduitList(this.entrepriseSelectedService.getEntrepriseSelected());
        this.getNbrClients(this.entrepriseSelectedService.getEntrepriseSelected());
      });
    } else {
      this.employeService.findByUserName(this.userInfosService.getUsername()).subscribe((res: Employe) => {
        console.log("empId: ", res.id);
        this.entrepriseService.findEntreprisesAdroitAcces(res.id).subscribe((reslt: Entreprise[]) => {
          this.entreprises = reslt;
          console.log("EntreprisesÀdroit: ", this.entreprises);
          if (this.entreprises && this.entreprises.length > 0) {
            this.clientService.getClientStats(this.entreprises[0].id).subscribe(data => {
              this.clientStats = data;
              console.log("data: ", data);
              this.getNbrAchats(this.entreprises[0].id);
              this.getNbrVentes(this.entreprises[0].id);
              this.getNbrProduits(this.entreprises[0].id);
              this.getNbrFournisseurs(this.entreprises[0].id);
              this.loadProduitList(this.entreprises[0].id);
              this.getNbrClients(this.entreprises[0].id);
            });
          }
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
    }
  }

  getClientsForAdmin() {
    if (this.entrepriseSelectedService.getEntrepriseSelected() != 0) {
      this.clientService.getClientStats(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe(data => {
        this.clientStats = data;
        console.log("data: ", data);
        this.getNbrAchats(this.entrepriseSelectedService.getEntrepriseSelected());
        this.getNbrVentes(this.entrepriseSelectedService.getEntrepriseSelected());
        this.getNbrProduits(this.entrepriseSelectedService.getEntrepriseSelected());
        this.getNbrFournisseurs(this.entrepriseSelectedService.getEntrepriseSelected());
        this.loadProduitList(this.entrepriseSelectedService.getEntrepriseSelected());
        this.getNbrClients(this.entrepriseSelectedService.getEntrepriseSelected());

      });
    } else {
      this.entrepriseService.findByAdmin(this.userInfosService.getUsername()).subscribe((res: Entreprise[]) => {
        this.entreprises = res;
        console.log("Entreprises: ", this.entreprises);
        if (this.entreprises && this.entreprises.length > 0) {
          this.clientService.getClientStats(this.entreprises[0].id).subscribe(data => {
            this.clientStats = data;
            console.log("data: ", data);
            this.getNbrAchats(this.entreprises[0].id);
            this.getNbrVentes(this.entreprises[0].id);
            this.getNbrProduits(this.entreprises[0].id);
            this.getNbrFournisseurs(this.entreprises[0].id);
            this.loadProduitList(this.entreprises[0].id);
            this.getNbrClients(this.entreprises[0].id);
          });
        } else {
          console.log('Aucune entreprise trouvée.');
        }
      }, error => {
        console.log(error);
      });
    }
  }

  /******************************Charts**************************************/


  public getNbrClients(id: number){
    this.clientService.getNbClients(id).subscribe( res => {
      this.nbrClients = res;
      console.log("nbr Clients : ", this.nbrClients)
    }, error => {
      console.log(error);
    });
  }


  public getNbrProduits(id: number){
    this.produitService.getNbProduits(id).subscribe( res => {
      this.nbrProduits = res;
      console.log("nbr Produits : ", this.nbrProduits);
    }, error => {
      console.log(error);
    });
  }

  public getNbrFournisseurs(id: number){
    this.fournisseurService.getNbFournisseurs(id).subscribe( res => {
      this.nbrFournisseurs = res;
      console.log("nbr Fournisseurs : ", this.nbrFournisseurs);
    }, error => {
      console.log(error);
    });
  }

  public getNbrVentes(id: number){
    this.commandeService.getNbCommandes(id).subscribe( res => {
      this.nbrVentes = res;
      console.log("nbr Ventes : ", this.nbrVentes);
    }, error => {
      console.log(error);
    });
  }

  public getNbrAchats(id: number){
    this.bonCommandeService.getNbAchats(id).subscribe( res => {
      this.nbrAchats = res;
      console.log("nbr Achats : ", this.nbrAchats);
    }, error => {
      console.log(error);
    });
  }


  public generatRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  loadProduitList(id: number) {
    this.produitService.findByEntrepriseId(id).subscribe({
      next: data => {
        this.produitList = data;
        this.top5Produits = this.getTop5Produits(this.produitList);
      },
      error: err => console.log(err)
    });
  }

  getTop5Produits(produits: Produit[]): Produit[] {
    return produits
        .map(produit => ({
          ...produit,
          ventes: produit.niveauStockInitial - produit.disponible
        }))
        .sort((a, b) => b.ventes - a.ventes)
        .slice(0, 5);
  }



  /***********************************Employers Charts************************************/


  getEmployers(){
    if(this.entrepriseSelectedService.getEntrepriseSelected() !=0 ){
      this.employeService.findAll().subscribe(data => {
        this.employers = data;
        this.employers = this.employers.filter(employe => {
          const hasPermissionForEntrepriseId = employe.permissionsAcces?.some((permission: PermissionsAcces) =>
              permission.entrepriseId == this.entrepriseSelectedService.getEntrepriseSelected());
          return hasPermissionForEntrepriseId;
        });
        this.userList = this.employers.map(employe => {
          const entrepriseIdsSet = new Set<number>();
          employe.permissionsAcces?.forEach(permission => {
            if (permission.entrepriseId) {
              entrepriseIdsSet.add(permission.entrepriseId);
            }
          });
          return {
            nom: employe.nom || '',
            prenom: employe.prenom || '',
            usage: entrepriseIdsSet.size,
            email: employe.email || '',
            color: this.generateRandomColor()
          };
        });
      });


    }else{
      this.entrepriseService.findByAdmin(this.userInfosService.getUsername()).subscribe( (res: Entreprise[]) => {
        this.entreprises = res;
        console.log("Entreprises : ", this.entreprises)
        if (this.entreprises && this.entreprises.length > 0) {
          this.employeService.findAll().subscribe(data => {
            this.employers = data;
            this.employers = this.employers.filter(employe => {
              const hasPermissionForEntrepriseId = employe.permissionsAcces?.some((permission: PermissionsAcces) =>
                  permission.entrepriseId == this.entreprises[0].id);
              this.entrepriseSelectedService.setEntrepriseSelected(this.entreprises[0].id)
              return hasPermissionForEntrepriseId;
            });
            this.userList = this.employers.map(employe => {
              const entrepriseIdsSet = new Set<number>();
              employe.permissionsAcces?.forEach(permission => {
                if (permission.entrepriseId) {
                  entrepriseIdsSet.add(permission.entrepriseId);
                }
              });
              return {
                nom: employe.nom || '',
                prenom: employe.prenom || '',
                usage: entrepriseIdsSet.size,
                email: employe.email || '',
                color: this.generateRandomColor()
              };
            });
            console.log(this.userList);
          });

        }
      }, error => {
        console.log(error);
      });
    }
  }



  generateRandomColor(): string {
    const color = Math.floor(Math.random() * 96777215).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  update(){
    this.router.navigate(["/produit/produit"]).then()

  }

  delete(){
    this.router.navigate(["/produit/produit"]).then()
  }

}
