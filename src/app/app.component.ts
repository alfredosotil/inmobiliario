import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { GlobalService } from 'app/global.service';
import { UtilService } from 'app/util.service';

@Component({
  selector: 'app-root',
//  providers: [ GlobalService, UtilService, AuthService ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
        public gs: GlobalService,
        public us: UtilService,
        public auth: AuthService
    ) {
//        this.auth.logIn();
    }
}
