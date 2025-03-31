import { TopProductsComponent } from './../topProducts/top-products/top-products.component';
import { BarChartComponent } from './../charts/bar-chart/bar-chart/bar-chart.component';
import { DashboardCardComponent } from './../dashboard-card/dashboard-card.component';
import { Component } from '@angular/core';
import { RecentSalesBoardComponent } from '../recent-sales-board/recent-sales-board.component';

@Component({
  selector: 'app-start-dash-board',
  standalone: true,
  imports: [DashboardCardComponent, BarChartComponent, RecentSalesBoardComponent, TopProductsComponent],
  templateUrl: './start-dash-board.component.html',
  styleUrl: './start-dash-board.component.css'
})
export class StartDashBoardComponent {

}
