import { Component } from '@angular/core';
import { Color, colorSets, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {
  view: [number, number] = [620, 300]; // Tamaño del gráfico

  data = [
    { name: 'Jan', value: 2000 },
    { name: 'Feb', value: 2500 },
    { name: 'Mar', value: 3000 },
    { name: 'Apr', value: 2800 },
    { name: 'May', value: 3200 },
    { name: 'Jun', value: 3500 },
    { name: 'Jul', value: 3700 },
    { name: 'Aug', value: 3400 },
    { name: 'Sep', value: 4000 },
    { name: 'Oct', value: 4200 },
    { name: 'Nov', value: 4500 },
    { name: 'Dec', value: 4800 },
  ];

  // Opciones
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Meses';
  showYAxisLabel = true;
  yAxisLabel = 'Ingresos ($)';

  // Esquema de color con mayor contraste en fondo blanco


  colorScheme: Color = {
    name: 'custom',            // Nombre del esquema de colores
    selectable: true,          // Si el esquema es seleccionable
    group: ScaleType.Ordinal,          // Tipo de grupo, puede ser 'Ordinal' o 'Linear'
    domain: ['#808080', '#000000'], // Gris y negro
  };

}

