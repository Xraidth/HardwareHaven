import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../core/services/share/session.service';
import { UserNavComponent } from '../../../shared/user-nav/user-nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [UserNavComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
public usuario:any;
public username: string = 'Usuario123';
public password: string = 'miContraseñaSecreta';
public passwordFieldType: string = 'password';
  constructor(private router: Router){}
  ngOnInit(): void {
  this.usuario = SessionService.usuario;
}
togglePassword() {
  this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
}
goBack() {
  this.router.navigate(['/productList']); 
}
}
