import { Component, Input } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-bar-lateral-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './bar-lateral-chart.component.html',
  styleUrl: './bar-lateral-chart.component.css'
})
export class BarLateralChartComponent {
  @Input() Data:any;
  @Input() tittle:any;
  @Input() detail:any;

  colorScheme: Color = {
       name: 'custom',
       selectable: true,
       group: ScaleType.Ordinal,
       domain: ['#808080', '#000000'],
     };
}
