import { Component } from '@angular/core';
import { StartDashBoardComponent } from '../../../features/dashboard/start-dash-board/start-dash-board.component';
import { CommonModule } from '@angular/common';
import { TimeChartComponent } from '../../../features/dashboard/charts/time-chart/time-chart.component';
import { BarLateralChartComponent } from '../../../features/dashboard/charts/bar-lateral-chart/bar-lateral-chart.component';
import { PieChartComponent } from '../../../features/dashboard/charts/pie-chart/pie-chart.component';
import { Router } from '@angular/router';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StartDashBoardComponent, CommonModule, TimeChartComponent, BarLateralChartComponent, PieChartComponent ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public currentView:string = 'start';
  public currentDetail:string = 'view';

  constructor(private router:Router){}

  setView(view: string) {
    this.currentView = view;
    this.currentDetail="view"
  }

  setDetail(view:string){
    this.currentDetail=view;
  }

  gotoHome(){
    this.router.navigate(['home']);
  }

  timelineData = [
    {
      "name": "Compras de este mes",
      "series": [
        { "name": "01", "value": 10 },
        { "name": "02", "value": 11 },
        { "name": "03", "value": 22 },
        { "name": "16", "value": 55 },
        { "name": "17", "value": 48 },
        { "name": "18", "value": 60 },
        { "name": "19", "value": 70 },
        { "name": "20", "value": 65 },
        { "name": "21", "value": 72 },
        { "name": "22", "value": 68 },
        { "name": "27", "value": 90 },
        { "name": "28", "value": 95 },
        { "name": "29", "value": 100 },
        { "name": "30", "value": 110 },
      ]
    }
  ];

  timelineData2 = [
    {
      "name": "Compras de este mes",
      "series": [
        { "name": "1", "value": 90 },
        { "name": "2", "value": 75 },
        { "name": "3", "value": 82 },
        { "name": "4", "value": 60 },
        { "name": "5", "value": 95 },
        { "name": "6", "value": 88 },
        { "name": "7", "value": 72 },
        { "name": "8", "value": 99 },
        { "name": "9", "value": 65 },
        { "name": "10", "value": 80 },

      ]
    }
  ];

  productData = [
    { name: 'Procesadores', value: 250 },
    { name: 'Fuentes de Poder', value: 200 },
    { name: 'Memorias RAM', value: 180 },
    { name: 'Almacenamiento SSD', value: 130 },
    { name: 'Tarjetas Gráficas', value: 120 },
  ];

  clienteData = [
    { name: "Username 1", value: 90 },
    { name: "Username 2", value: 75 },
    { name: "Username 3", value: 30 },
    { name: "Username 4", value: 10 },
    { name: "Username 5", value: 7 }
  ];

  payData = [
    { name: "Cash", value: 90 },
    { name: "Card", value: 7 },
    { name: "Electronic payment", value: 3 },

  ];

  analysisData = [
    { name: "Usuarios Activos", value: 1200 },
    { name: "Memoria Usada (MB)", value: 2048 },
    { name: "Solicitudes por Minuto", value: 450 },
    { name: "Tiempo de Respuesta del Servidor (ms)", value: 230 },
    { name: "Latencia Promedio (ms)", value: 120 },
    { name: "Carga Promedio del CPU (%)", value: 65 },
    { name: "Tasa de Retención (%)", value: 78 },
    { name: "Tiempo Promedio de Sesión (min)", value: 15 },
    { name: "Conversiones (%)", value: 12 },
    { name: "Errores Críticos Mensuales", value: 5 }
];

dataPieAnalysis = [
  { name: "Usuarios Activos", value: 1200 },
  { name: "Memoria Usada (MB)", value: 2048 },
  { name: "Solicitudes por Minuto", value: 450 },
];



}
