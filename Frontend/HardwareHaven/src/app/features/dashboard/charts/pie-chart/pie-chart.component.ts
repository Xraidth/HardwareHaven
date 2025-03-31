import { Component, Input } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent {
  @Input() Data:any;
  @Input() tittle:any;
  @Input() detail:any;
  view: [number, number] = [700, 400];


  colorScheme: Color = {
       name: 'custom',
       selectable: true,
       group: ScaleType.Ordinal,
       domain: ['#808080', '#000000'],
     };
}
