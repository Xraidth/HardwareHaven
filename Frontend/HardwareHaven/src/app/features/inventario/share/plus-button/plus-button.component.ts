import { Component, Input, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-plus-button',
  standalone: true,
  imports: [],
  templateUrl: './plus-button.component.html',
  styleUrl: './plus-button.component.css'
})
export class PlusButtonComponent {
  @Input() nowType: string | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['nowType']) {
      const currentValue = changes['nowType'].currentValue;
      this.nowType = currentValue;}
  }
  
  plusButton(){
    switch (this.nowType) {
      case "Usuario": break;
      case "Compra":break;
      case "LineaCompra":break;
      case "Componente":break;
      case "Precio":break;
      case "Categoria":break;
    }
  }

  
}
