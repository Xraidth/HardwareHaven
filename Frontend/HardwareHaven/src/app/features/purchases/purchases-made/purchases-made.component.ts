import { Component, Input, SimpleChanges } from '@angular/core';
import { PurchaseService } from '../../../core/services/entities/purchase.service';
import { SweetAlertService } from '../../../core/services/notifications/sweet-alert.service';
import { capitalizeFirstLetterOfEachWord, getErrorMessage, specialFilter } from '../../../shared/functions/functions';
import { CommonModule } from '@angular/common';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-purchases-made',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchases-made.component.html',
  styleUrl: './purchases-made.component.css'
})
export class PurchasesMadeComponent {
@Input() searchQuery: string| undefined;
 compras: any[] = [];
  compra: any = {};
  inventarioVacio = false;
  columns: string[] = [];
  columnsLw: string[] = [];
  isLoading = false;
  originalcompras: any[] = [];

  constructor(
    private serverCompra: PurchaseService,
    private sweetAlertService: SweetAlertService

  ) {}


  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery']) {
      const currentValue = changes['searchQuery'].currentValue;
      this.searchQuery = currentValue || '';

      if (this.searchQuery === '') {

        this.compras = [...this.originalcompras];
      } else {

        this.compras = this.originalcompras.filter(x =>
          x.user.name.toLowerCase().includes(this.searchQuery?.toLowerCase())
        );
      }
    }
  }

  ngOnInit(): void {
    this.loadEntity();
  }

  loadEntity(): void {
    this.getAll();
  }

  loadColumns(): void {
    if (this.compras.length > 0) {
      this.inventarioVacio = false;
      this.columnsLw = Object.keys(this.compras[0]);
      this.columns = this.columnsLw.map(capitalizeFirstLetterOfEachWord);
      this.columns.push("Cancel");
    } else {
      this.columns = [];
      this.inventarioVacio = true;
    }
  }

  cancelItem(linea: any): void {
    this.cancel(linea.id);
    this.loadEntity();
  }
   specialFilter(nombre: string, dato: any): string {
      return specialFilter(nombre,dato);
    }

  getAll(){
    this.serverCompra.getMyPurchases().pipe(
      map((r: any) => {
        if (r && r.data && Array.isArray(r.data)) {
          return r.data;
        } else {
          return [];
        }
      }),
      catchError((error) => {
        this.isLoading = false;
        const errorMessage = getErrorMessage(error);
        this.sweetAlertService.showError(errorMessage);
        return of([]);
      })
    ).subscribe({
      next: (compras: any[]) => {
        this.compras = compras;
        this.originalcompras = [...compras];
        this.loadColumns();
      }
    });
  }

cancel(id: number){
 this.sweetAlertService.confirmBox('¿Estás seguro?', 'No podrás revertir esta acción.').then((result) => {
      if (result.isConfirmed) {
        this.serverCompra.cancel(id).pipe(
          map((response: any) => {
            if (response && response.data) {
              return response.data;
            } else {
              return null;
            }
          }),
          catchError((error) => {
            this.isLoading = false;
            const errorMessage = getErrorMessage(error);
            this.sweetAlertService.showError(errorMessage);
            return of(null);
          })
        ).subscribe((compra: any) => {
          if (compra) {
            this.compra = compra;
            this.loadEntity();
          }
        });
      } else if (result.isDismissed) {

      }
    });
  }


}



