import { Component } from '@angular/core';
import { DashboardCardComponent } from '../../../features/dashboard/dashboard-card/dashboard-card.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
