import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { ColComponent, RowComponent, WidgetStatDComponent } from '@coreui/angular';

type BrandData = {
  icon: string
  values: any[]
 // capBg?: any
}

@Component({
  selector: 'app-widgets-brand',
  templateUrl: './widgets-brand.component.html',
  styleUrls: ['./widgets-brand.component.scss'],
  standalone: true,
  imports: [RowComponent, ColComponent, WidgetStatDComponent, IconDirective, ChartjsComponent]
})
export class WidgetsBrandComponent  {

  constructor(
  ) {}


  brandData: BrandData[] = [
    {
      icon: 'assets/images/revenus.png',
      values: [{ title: '(en MAD)', value: 'Revenus' }, { title: 'MAD', value: '0' }],
      //capBg: { '--cui-card-cap-bg': '#ffffff' },
    },
    {
      icon: 'assets/images/produits.png',
      values: [{ title: '(en MAD)', value: 'Coût' }, { title: 'MAD', value: '0' }],
     // capBg: { '--cui-card-cap-bg': '#ffffff' },

    },
    {
      icon: 'assets/images/client.png',
      values: [{title: 'personnes', value: 'Clients'}, {title: 'personnes', value: '0'}],
      // capBg: { '--cui-card-cap-bg': '#ffffff' },
    },
    {
      icon: 'assets/images/commandes.png',
      values: [{ title: 'nombre', value: 'Commandes' }, { title: 'nombre', value: '0' }],
     // capBg: { '--cui-card-cap-bg': '#ffffff' },
    }
  ];

  capStyle(value: string) {
    return !!value ? { '--cui-card-cap-bg': value } : {};
  }


}
