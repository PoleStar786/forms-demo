import { Component } from '@angular/core';
import { AuthguardService } from './authguard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public authguardService: AuthguardService) {}
  title = 'forms-demo';
}
