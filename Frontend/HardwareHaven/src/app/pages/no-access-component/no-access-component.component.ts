
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-access-component',
  standalone: true,
  imports: [],
  templateUrl: './no-access-component.component.html',
  styleUrl: './no-access-component.component.css'
})
export class NoAccessComponentComponent {
  constructor(private router: Router){}
  gotoHome(){
    this.router.navigate(['home']);
  }
}
