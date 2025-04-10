import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule,  RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']


})
export class AppComponent {
  public errorServer:boolean = false;
  title = 'HardwareHaven';
  constructor(private router:Router){

  }


  goToChatBot(){
    this.router.navigate(['chatbot']);
  }


  gotoHelp(){
    this.router.navigate(['help']);
  }






}

