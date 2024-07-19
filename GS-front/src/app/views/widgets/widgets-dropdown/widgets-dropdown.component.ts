import {Component, OnInit, inject} from '@angular/core';
import { RowComponent, ColComponent, DropdownComponent } from '@coreui/angular';
import { Entreprise } from '../../../controller/entities/parametres/entreprise';
import {CommandeService} from "../../../controller/services/ventes/commande/commande.service";
import {BonCommandeService} from "../../../controller/services/inventaire/boncommande/bon-commande.service";
import {ClientService} from "../../../controller/services/contacts/client.service";
import {navItems2} from "../../../layout/default-layout/nav";
import {UserInfosService} from "../../../controller/shared/user-infos.service";
import {AppUserService} from "../../../controller/auth/services/app-user.service";
import {AppUser} from "../../../controller/auth/entities/app-user";
import {EntrepriseService} from "../../../controller/services/parametres/entreprise.service";
import {EmployeService} from "../../../controller/services/contacts/user/employe.service";
import {Employe} from "../../../controller/entities/contacts/user/employe";
import {TokenService} from "../../../controller/auth/services/token.service";
import {PaiementService} from "../../../controller/services/ventes/paiement.service";
import {EntrepriseSelectedService} from "../../../controller/shared/entreprise-selected.service";


@Component({
    selector: 'app-widgets-dropdown',
    templateUrl: './widgets-dropdown.component.html',
    styleUrls: ['./widgets-dropdown.component.scss'],
    standalone: true,
    imports: [RowComponent, ColComponent, DropdownComponent]
})
export class WidgetsDropdownComponent implements OnInit {

    private tokenService = inject(TokenService)
    private entrepriseService = inject(EntrepriseService);
    private paiementService = inject(PaiementService);
    private employeService = inject(EmployeService);
    private commandeService = inject(CommandeService);
    private bonCommandeService = inject(BonCommandeService);
    private clientService = inject(ClientService);
    private userInfosService = inject(UserInfosService);
    private entrepriseSelectedService = inject(EntrepriseSelectedService);
    private appUserService = inject(AppUserService);
    public admin! : AppUser;
    public entreprise!: Entreprise;
    public entreprises: Entreprise[] = [];
    public entreprisesAdroitAcces: Entreprise[] = [] ;

    public nbrClients: number = 0;
    public nbrCommandes: number = 0;
    public revenus: number = 0;
    public couts: number = 0;



    constructor() {


    }


    ngOnInit(): void {
        this.actionUser();


    }



    public actionUser() {
        const newVar = this.tokenService.getRole()?.some(it => it == "ADMIN") ? 1 : 0;
        if(newVar == 1){
             this.getEntreprises();
        }
        else{
             this.getEntreprisesAdroitAcces();
        }
    }




    getEntreprises() {
        if(this.entrepriseSelectedService.getEntrepriseSelected() !=0 ){
            console.log('entreprise selected work : ', this.entrepriseSelectedService.getEntrepriseSelected());
            this.getRevenus(this.entrepriseSelectedService.getEntrepriseSelected());
            this.getCouts(this.entrepriseSelectedService.getEntrepriseSelected());
            this.getNbrClients(this.entrepriseSelectedService.getEntrepriseSelected());
            this.getNbrCommandes(this.entrepriseSelectedService.getEntrepriseSelected());

        }else{
            this.entrepriseService.findByAdmin(this.userInfosService.getUsername()).subscribe( (res: Entreprise[]) => {
                this.entreprises = res;
                console.log("Entreprises : ", this.entreprises)
                if (this.entreprises && this.entreprises.length > 0) {
                    this.entreprise = this.entreprises[0];
                    console.log('Première entreprise : ', this.entreprise);
                    this.getRevenus(this.entreprise.id);
                    this.getCouts(this.entreprise.id);
                    this.getNbrClients(this.entreprise.id);
                    this.getNbrCommandes(this.entreprise.id);
                } else {
                    console.log('Aucune entreprise trouvée.');
                }
            }, error => {
                console.log(error);
            });
       }
    }



    getEntreprisesAdroitAcces(){
        if(this.entrepriseSelectedService.getEntrepriseSelected()){
            console.log('entreprise selected work : ', this.entrepriseSelectedService.getEntrepriseSelected());
            this.getRevenus(this.entrepriseSelectedService.getEntrepriseSelected());
            this.getCouts(this.entrepriseSelectedService.getEntrepriseSelected());
            this.getNbrClients(this.entrepriseSelectedService.getEntrepriseSelected());
            this.getNbrCommandes(this.entrepriseSelectedService.getEntrepriseSelected());

        }else{
            this.employeService.findByUserName(this.userInfosService.getUsername()).subscribe((res: Employe) => {
                console.log("empId : ", res.id);
                this.entrepriseService.findEntreprisesAdroitAcces(res.id).subscribe((reslt: Entreprise[]) => {
                    this.entreprisesAdroitAcces = reslt;
                    console.log("EntreprisesÀdroit :",this.entreprisesAdroitAcces);
                    if (this.entreprisesAdroitAcces && this.entreprisesAdroitAcces.length > 0) {
                        this.entreprise = this.entreprisesAdroitAcces[0];
                        console.log('Première entreprise : ', this.entreprise);
                        this.getRevenus(this.entreprise.id);
                        this.getCouts(this.entreprise.id);
                        this.getNbrClients(this.entreprise.id);
                        this.getNbrCommandes(this.entreprise.id);
                    } else {
                        console.log('Aucune entreprise trouvée.');
                    }
                }, error => {
                    console.log(error);
                });
            }, error => {
                console.log(error);
            });
        }
    }



    public getNbrClients(id: number){
        this.clientService.getNbClients(id).subscribe( res => {
            this.nbrClients = res;
            console.log("nbr Clients : ", this.nbrClients)
        }, error => {
            console.log(error);
        });
    }


    public getNbrCommandes(id: number){
        this.commandeService.getNbCommandes(id).subscribe( res => {
            this.nbrCommandes = res;
            console.log("nbr Commandes : ", this.nbrCommandes)
        }, error => {
            console.log(error);
        });
    }

    public getRevenus(id: number){
        this.paiementService.getIncome(id).subscribe( res => {
            this.revenus = res;
            console.log("nbr Revenus : ", this.revenus)
        }, error => {
            console.log(error);
        });
    }

    public getCouts(id: number){
        this.bonCommandeService.getCout(id).subscribe( res => {
            this.couts = res;
            console.log("nbr Couts : ", this.couts)
        }, error => {
            console.log(error);
        });
    }

}
