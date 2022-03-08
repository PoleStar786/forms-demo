import { Component } from '@angular/core';
import { AuthguardService } from './core/guard-service/authguard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title!: 'forms-demo';
  constructor(public authguardService: AuthguardService) {}
  // tokenVisible: boolean = this.authguardService.getToken();
}
