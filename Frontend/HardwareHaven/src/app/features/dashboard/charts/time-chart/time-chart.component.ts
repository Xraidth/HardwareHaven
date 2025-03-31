import { Component, Input } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-time-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './time-chart.component.html',
  styleUrl: './time-chart.component.css'
})
export class TimeChartComponent {

  @Input() timelineData:any;
  @Input() tittle:any;
  @Input() detail:any;
  view: [number, number] = [1150, 350];

   colorScheme: Color = {
      name: 'custom',
      selectable: true,
      group: ScaleType.Ordinal,
      domain: ['#808080', '#000000'],
    };

}
