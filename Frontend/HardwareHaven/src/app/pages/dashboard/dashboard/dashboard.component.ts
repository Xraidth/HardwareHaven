import { TopProductsComponent } from './../../../features/dashboard/topProducts/top-products/top-products.component';
import { Component } from '@angular/core';
import { DashboardCardComponent } from '../../../features/dashboard/dashboard-card/dashboard-card.component';
import { BarChartComponent } from '../../../features/dashboard/charts/bar-chart/bar-chart/bar-chart.component';
import { RecentSalesBoardComponent } from '../../../features/dashboard/recent-sales-board/recent-sales-board.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardCardComponent, BarChartComponent, RecentSalesBoardComponent, TopProductsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
