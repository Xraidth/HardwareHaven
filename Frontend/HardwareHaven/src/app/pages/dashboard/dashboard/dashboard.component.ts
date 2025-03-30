import { Component } from '@angular/core';
import { StartDashBoardComponent } from '../../../features/dashboard/start-dash-board/start-dash-board.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StartDashBoardComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public currentView:string = 'start';
  public currentDetail:string = 'view';


  setView(view: string) {
    this.currentView = view;
  }

  setDetail(view:string){
    this.currentDetail=view;
  }


}
