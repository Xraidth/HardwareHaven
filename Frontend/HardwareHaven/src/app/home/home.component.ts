import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service.js';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'home',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  private users: any[]=[];
  public username: string = '';
  public password: string = '';

  constructor(private serverUser: UserService) {}
  

  ngOnInit(): void {
    console.log('Bienvenido a Hardware Haven');
    this.getAllUsers();
    
    
  }
  

  

  login() {

    const user = this.users.find(x => x.name.toLowerCase().includes(this.username.toLowerCase()) && 
    x.password.includes(this.password)
    &&
    this.username!= '' && this.password != '');


    if (this.username.trim() === '' || this.password.trim() === '') {
      console.log('Por favor ingrese un nombre de usuario y una contraseña.');
      return;
    }
    
    if (user) {
      console.log('Acceso concedido');
    } else {
      console.log('Acceso denegado');
    }
  }
  

  getAllUsers() {
    this.serverUser.getAll().subscribe({
      next: (r: any) => {
        
        try {
          
          if (r && r.data && Array.isArray(r.data)) {
            const users: any[] = r.data; 
            this.users =users;
            
          } else {
            console.log('El objeto recibido no tiene la estructura esperada.');
          }
        } catch (error) {
          console.error('Error al procesar los datos:', error);
          console.log('Objeto recibido:', r); 
        }
      },
      error: (e) => {
        console.error('Error en la llamada HTTP:', e);
      }
    });
  }
  
}
