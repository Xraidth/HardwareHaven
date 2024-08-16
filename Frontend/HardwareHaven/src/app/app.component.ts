import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './pages/home/home.component.js';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './pages/product-list/product-list.component.js';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, CommonModule, ProductListComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HardwareHaven';

  ngOnInit(): void {
    
  }


  

  
}

