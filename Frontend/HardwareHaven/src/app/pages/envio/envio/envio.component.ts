import { Component } from '@angular/core';
import { SessionService } from '../../../core/services/share/session.service';
import { UserNavComponent } from '../../../shared/user-nav/user-nav.component';

@Component({
  selector: 'app-envio',
  standalone: true,
  imports: [UserNavComponent],
  templateUrl: './envio.component.html',
  styleUrl: './envio.component.css'
})
export class EnvioComponent {
public usuario:any;
ngOnInit(): void {
  this.usuario = SessionService.user;
}
}
