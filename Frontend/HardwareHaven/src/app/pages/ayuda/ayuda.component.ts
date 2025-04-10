import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class HelpComponent {

  constructor(private router: Router){

  }

  gotoHome(){
    this.router.navigate(['home']);
  }




}
