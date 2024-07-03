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
  ColDirective,
  DropdownComponent,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  FormCheckLabelDirective,
  GutterDirective,
  PageItemDirective,
  PageLinkDirective,
  PaginationComponent,
  PlaceholderAnimationDirective,
  PlaceholderDirective, ProgressBarComponent,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective, TemplateIdDirective,
  TextColorDirective, WidgetStatAComponent, WidgetStatBComponent
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {Client} from "../../controller/entities/contacts/client";
import {ClientService} from "../../controller/services/contacts/client.service";
import {RouterLink} from "@angular/router";
import {generatePageNumbers, paginationSizes} from "../../controller/utils/pagination/pagination";
import {FactureService} from "../../controller/services/ventes/facture/facture.service";
import {Facture} from "../../controller/entities/ventes/facture/facture";

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent, ColDirective, PlaceholderAnimationDirective, PlaceholderDirective, RouterLink, DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective, PageItemDirective, PageLinkDirective, PaginationComponent, WidgetStatAComponent, TemplateIdDirective, WidgetStatBComponent, ProgressBarComponent]
})
export class DashboardComponent implements OnInit {

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);

  public users: IUser[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: '',
      status: '',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: '',
      status: '',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: '',
      status: '',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: '',
      status: '',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: '',
      status: '',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: '',
      status: '',
      color: 'dark'
    }
  ];

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
  protected factureList!: Facture[]

  ngOnInit(): void {
    this.initCharts();
    this.updateChartOnColorModeChange();
    this.loadClientList()
    this.loadFactureList()
    this.findAll()

  }
  protected currentIndex: number  = 0
  protected deleteModel = false
private factureService= inject(FactureService)
  public get item(): Client {
    return this.clientService.item;
  }
  public get generatePageNumbers() {
    return generatePageNumbers(this.pagination)
  }
  loadFactureList() {
    this.factureService.findPaginated().subscribe({
      next: data => this.factureService.paginationF = data,
      error: err => console.log(err)
    })
  }
  public set item(value: Client ) {
    this.clientService.item = value;
  }
  public set itemF(value: Facture ) {
    this.factureService.item = value;
  }
  findAll() {
    this.loading = true
    this.paginate().then(() => this.loading = false)
  }
  protected paginating = false
  protected loading = false

  async paginate(page: number = this.pagination.page, size: number = this.pagination.size) {
    this.paginating = true
    this.clientService.findPaginated(page, size).subscribe({
      next: value => {
        this.pagination = value
        this.paginating = false
      },
      error: err => {
        console.log(err)
        this.paginating = false
      }
    })
  }

  initCharts(): void {
    this.mainChart = this.#chartsData.mainChart;
  }
  public get pagination() {
    return this.clientService.pagination;
  }

  public get paginationF() {
    return this.factureService.paginationF;
  }

  public set pagination(value) {
    this.clientService.pagination = value;
  }
  public set paginationF(value) {
    this.factureService.paginationF = value;
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
  private clientService = inject(ClientService)
  protected clientList!: Client[]

  loadClientList() {
    this.clientService.findAll()
      .subscribe({
        next: data => {
          this.clientList = data
        },
        error: err => console.log(err)
      })
  }


  protected readonly paginationSizes = paginationSizes;
}
