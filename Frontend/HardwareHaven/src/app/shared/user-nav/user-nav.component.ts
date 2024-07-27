import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent implements OnInit {
  
  
  @Input() usuario:any;
  public userName:string= "";
  isDropdownOpen = false;

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

  

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
