import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component.js';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, CommonModule, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HardwareHaven';
  page = '';

  ngOnInit(): void {
    this.setPage('home');
  }

  setPage(p: string) {
    this.page = p;
  }
}

