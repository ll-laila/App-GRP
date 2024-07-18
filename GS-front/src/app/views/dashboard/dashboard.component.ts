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
import {EntrepriseIdService} from "../../controller/shared/entreprise-id.service";
import {EmployeService} from "../../controller/services/contacts/user/employe.service";
import {Employe} from "../../controller/entities/contacts/user/employe";
import {PermissionsAcces} from "../../controller/entities/contacts/user/PermissionsAcces";


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
  private entrepriseIdService = inject(EntrepriseIdService);
  private employeService = inject(EmployeService);
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);
  clientStats: any = {};
  public newClientAtWeek: number = 0;
  public employers: Employe[] = [];
  userList: IUser[] = [];



  ngOnInit(): void {
    this.initCharts();
    this.updateChartOnColorModeChange();

    this.clientService.getClientStats(this.entrepriseIdService.getIdEntreprise()).subscribe(data => {
      this.clientStats = data;
      console.log("data : ",data);
      Object.keys(data).forEach(day => {
       this.newClientAtWeek += data[day].newClients;
      });
    });

    this.getEmployers();

  }

  /******************************Clients charts*************************************/


  getNewClients(day: string): number {
    return this.clientStats[day]?.newClients || 0;
  }

  getRecurringClients(day: string): number {
    return this.clientStats[day]?.recurringClients || 0;
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
      this.employeService.findAll().subscribe(data => {
        this.employers = data;
        this.employers = this.employers.filter(employe => {
          const hasPermissionForEntrepriseId = employe.permissionsAcces?.some((permission: PermissionsAcces) =>
              permission.entrepriseId == this.entrepriseIdService.getIdEntreprise());
            return hasPermissionForEntrepriseId;
        });
        console.log("data 1 : ",this.employers);

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

        console.log("data 2 : ",this.userList);
      });
  }

  generateRandomColor(): string {
    const color = Math.floor(Math.random() * 96777215).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }


}
