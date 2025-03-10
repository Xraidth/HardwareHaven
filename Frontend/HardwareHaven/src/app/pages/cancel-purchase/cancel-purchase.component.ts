import { Component } from '@angular/core';
import { SessionService } from '../../core/services/share/session.service';
import { UserNavComponent } from '../../shared/user-nav/user-nav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurchasesMadeComponent } from '../../features/purchases/purchases-made/purchases-made.component';
import { Router } from '@angular/router';
import { directed } from '../../shared/functions/functions';


@Component({
  selector: 'app-cancel-purchase',
  standalone: true,
  imports: [UserNavComponent, CommonModule,FormsModule, PurchasesMadeComponent],
  templateUrl: './cancel-purchase.component.html',
  styleUrl: './cancel-purchase.component.css'
})
export class CancelPurchaseComponent {
  user: any;
  carga:string = "";
  nowType: string = '';
  searchQuery: string = '';
  auxsearchQuery: string = '';
  constructor(private router: Router){}
   ngOnInit(): void {
      this.user = SessionService.user;
      this.getplusbuttonChange("compra-cancel");
    }

    loadItems(type:string){
      this.nowType=type;
      }

    getplusbuttonChange(e: string): void {

      this.carga = "Cargando...";
      this.loadItems("Cargando");

      setTimeout(() => {
        this.carga = '';
        this.loadItems(e);
      }, 2000);
    }

    onSearch(event: Event): void {
        event.preventDefault();
       this.searchQuery = this.auxsearchQuery
      }



pasarAListaProductos(){
  directed(this.user.tipoUsuario, this.router)
}

}
