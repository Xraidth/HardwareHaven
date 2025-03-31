import { CommonModule } from '@angular/common';
import { RecentSalesCardComponent } from './recent-sales-card/recent-sales-card.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-sales-board',
  standalone: true,
  imports: [RecentSalesCardComponent, CommonModule],
  templateUrl: './recent-sales-board.component.html',
  styleUrl: './recent-sales-board.component.css'
})
export class RecentSalesBoardComponent implements OnInit{
  public users: any[] = [];

  ngOnInit(): void {
    this.users = [
      { username: 'Username1', email: 'user1@gmail.com', recentSalesValue: 50000 },
      { username: 'Username2', email: 'user2@gmail.com', recentSalesValue: 32000 },
      { username: 'Username3', email: 'user3@gmail.com', recentSalesValue: 10000 }
    ];
  }
}
