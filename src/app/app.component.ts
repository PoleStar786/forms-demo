import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthguardService } from './core/guard-service/authguard.service';
import { ApiService } from './shared/shared-services/apis/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title!: 'forms-demo';
  tokenVisible: boolean;
  tokenUnsubscribe: Subscription;
  constructor(
    public authguardService: AuthguardService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.tokenUnsubscribe = this.api.toggleHF.subscribe((v) => {
      this.tokenVisible = v;
    });
  }

  ngOnDestroy(): void {
    this.tokenUnsubscribe.unsubscribe();
  }
}
