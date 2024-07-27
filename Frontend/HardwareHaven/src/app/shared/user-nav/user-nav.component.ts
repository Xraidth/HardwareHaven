import { Component, Input, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SweetAlertService } from '../../core/services/notifications/sweet-alert.service';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent implements OnInit {
  
  
  @Input() usuario:any;
  public userName:string= "";
  isDropdownOpen = false;
  constructor(private swa:SweetAlertService){}

  ngOnInit(): void {
    this.userName= this.truncateString(this.usuario.name);
  }

  truncateString(str: string, maxLength: number = 17): string {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    } else {
      return str;
    }
  }
  async configurarCuenta(){
    let respuesta = await this.swa.mostrarConfigurarCuenta(this.usuario);
    //Seguir con la conexion de cambio de datos de cuenta
  }
  

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
