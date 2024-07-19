import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
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
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {ClientService} from "../../controller/services/contacts/client.service";
import {EmployeService} from "../../controller/services/contacts/user/employe.service";
import {Employe} from "../../controller/entities/contacts/user/employe";
import {PermissionsAcces} from "../../controller/entities/contacts/user/PermissionsAcces";
import {EntrepriseSelectedService} from "../../controller/shared/entreprise-selected.service";
import {TokenService} from "../../controller/auth/services/token.service";
import { NgForOf,NgIf } from '@angular/common';
import {Entreprise} from "../../controller/entities/parametres/entreprise";
import {UserInfosService} from "../../controller/shared/user-infos.service";
import {EntrepriseService} from "../../controller/services/parametres/entreprise.service";


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
  imports: [WidgetsDropdownComponent, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, WidgetsBrandComponent, CardHeaderComponent, TableDirective, AvatarComponent]
})
export class DashboardComponent implements OnInit {

  private clientService = inject(ClientService);
  private employeService = inject(EmployeService);
  private entrepriseService = inject(EntrepriseService);
  private entrepriseSelectedService = inject(EntrepriseSelectedService);
  private userInfosService = inject(UserInfosService);
  private tokenService = inject(TokenService)
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



  ngOnInit(): void {
    const newVar = this.tokenService.getRole()?.some(it => it == "ADMIN") ? 1 : 0;
    if(newVar == 0){
      this.viewEmployers = false;
    }

    this.initCharts();
    this.updateChartOnColorModeChange();


    if(newVar == 1){
      this.getClientsForAdmin();
    }else{
      this.getClientsForEmployer();
    }

    this.getEmployers();


  }

  /******************************Clients charts*************************************/


  getNewClients(day: string): number {
    return this.clientStats[day]?.newClients || 0;
  }

  getRecurringClients(day: string): number {
    return this.clientStats[day]?.recurringClients || 0;
  }


  getClientsForEmployer() {
    if(this.entrepriseSelectedService.getEntrepriseSelected() !=0 ){
      this.clientService.getClientStats(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe(data => {
        this.clientStats = data;
        console.log("data : ",data);
      });
    }else{
      this.employeService.findByUserName(this.userInfosService.getUsername()).subscribe((res: Employe) => {
        console.log("empId : ", res.id);
        this.entrepriseService.findEntreprisesAdroitAcces(res.id).subscribe((reslt: Entreprise[]) => {
          this.entreprises = reslt;
          console.log("EntreprisesÀdroit :",this.entreprises);
          if (this.entreprises && this.entreprises.length > 0) {
            this.clientService.getClientStats( this.entreprises[0].id).subscribe(data => {
              this.clientStats = data;
              console.log("data : ",data);
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
    if(this.entrepriseSelectedService.getEntrepriseSelected() !=0 ){
      this.clientService.getClientStats(this.entrepriseSelectedService.getEntrepriseSelected()).subscribe(data => {
        this.clientStats = data;
        console.log("data : ",data);
      });
    }else{
      this.entrepriseService.findByAdmin(this.userInfosService.getUsername()).subscribe( (res: Entreprise[]) => {
        this.entreprises = res;
        console.log("Entreprises : ", this.entreprises)
        if (this.entreprises && this.entreprises.length > 0) {
          this.clientService.getClientStats(this.entreprises[0].id).subscribe(data => {
            this.clientStats = data;
            console.log("data : ",data);
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

  public mainChart: IChartProps = { type: 'line' };
  public mainChartRef: WritableSignal<any> = signal(undefined);
  #mainChartRefEffect = effect(() => {
    if (this.mainChartRef()) {
      this.setChartStyles();
    }
  });
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });


  initCharts(): void {
    this.mainChart = this.#chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.#chartsData.initMainChart(value);
    this.initCharts();
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.mainChartRef.set($chartRef);
    }
  }

  updateChartOnColorModeChange() {
    const unListen = this.#renderer.listen(this.#document.documentElement, 'ColorSchemeChange', () => {
      this.setChartStyles();
    });

    this.#destroyRef.onDestroy(() => {
      unListen();
    });
  }

  setChartStyles() {
    if (this.mainChartRef()) {
      setTimeout(() => {
        const options: ChartOptions = { ...this.mainChart.options };
        const scales = this.#chartsData.getScales();
        this.mainChartRef().options.scales = { ...options.scales, ...scales };
        this.mainChartRef().update();
      });
    }
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




}
