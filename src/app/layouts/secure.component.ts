import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
declare var jQuery: any;

@Component({
    selector: 'secure-root',
    templateUrl: './secure.component.html',
    //  styleUrls: ['./secure.component.css']
})
export class SecureComponent {

    constructor(
    private router: Router,
        private auth: AuthService
    ){}
    ngOnInit() {

    }

    public menuClicked() {
        jQuery('.demo.sidebar')
            .sidebar({ context: jQuery('#app-secure') })
            .sidebar('setting', 'transition', 'push')
            .sidebar('toggle');
    }

    public logOut() {
        this.router.navigate(['/home']).catch(err => console.error(err));
        this.auth.logout();
    }
}
