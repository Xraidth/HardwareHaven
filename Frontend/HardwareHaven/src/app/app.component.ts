import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component.js';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  template: '<home></home>',
  styleUrl: './app.component.css'
})
export class AppComponent{

  title = 'HardwareHaven';

}
