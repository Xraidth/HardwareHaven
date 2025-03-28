import { Component } from '@angular/core';
import { DashboardCardComponent } from '../../../features/dashboard/dashboard-card/dashboard-card.component';
import { BarChartComponent } from '../../../features/dashboard/charts/bar-chart/bar-chart/bar-chart.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardCardComponent, BarChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
