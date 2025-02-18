import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './pages/home/home.component.js';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './pages/product-list/product-list.component.js';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule,  RouterOutlet],
  templateUrl: './app.component.html',


})
export class AppComponent implements OnInit {
  public errorServer:boolean = false;
  title = 'HardwareHaven';
  constructor(){

  }
  ngOnInit(): void {

  }







}

