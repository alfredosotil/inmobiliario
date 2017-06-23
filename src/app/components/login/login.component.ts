import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GlobalService } from 'app/global.service';
import { UtilService } from 'app/util.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
declare var jQuery: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    model = {};
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private router: Router,
        private gs: GlobalService,
        private us: UtilService,
        private auth: AuthService,
        private user: UserService,
    ) { }

    ngOnInit() {
        //        console.log('token' + this.us.randomString(64, '#aA!'));
        jQuery('body,html').animate({ scrollTop: 0 }, 800);
        //        this.isLoading$.next(false);
        this.initFormValidation();
    }

    public InitValidation(e) {
        //        jQuery('.ui.secondary.button').addClass('loading');
        e.preventDefault();
        this.isLoading$.next(true);
        setTimeout(function() {
            jQuery('.ui.form').form('validate form');
        }, 100);
    }

    private initFormValidation() {
        jQuery('.ui.form')
            .form({
                fields: {
                    email: {
                        identifier: 'email',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Indica tu correo electronico.'
                            },
                            {
                                type: 'email',
                                prompt: 'Debes indiciar un correo valido.'
                            },
                            {
                                type: 'verifyEmailUserLogin',
                                prompt: 'El correo proporcionado no se encuentra registrado.'
                            }
                        ]
                    },
                    password: {
                        identifier: 'password',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Ingresa una clave.'
                            },
                            {
                                type: 'minLength[8]',
                                prompt: 'Tu clave debe ser al menos de {ruleValue} caracteres.'
                            }
                        ]
                    },
                },
                //                inline: true,
                keyboardShortcuts: false,
                on: 'blur',
                onApprove: () => {
                    this.isLoading$.next(false);
                },
                onSuccess: () => {
                    this.isLoading$.next(false);
                    //                    this.model.accessToken = this.us.randomString(50, '#aA!');
                    //                    console.log('token ' + this.model.accessToken);
                    //                    alert("Registrado");
                    this.login(this.model);
                },
                onFailure: () => {
                    this.isLoading$.next(false);
                },
            });
    }

    private login(o: {}) {
        var x: {};

        this.user.search({ column: 'email', data: o['email'] })
            .subscribe(
            data => x = data,
            error => alert(error),
            () => {
                let password: string = x[0]['password'];
                if (password.indexOf(o['password']) === 0) {
                    this.user.login(o).subscribe(
                        data => x = data,
                        error => alert(error),
                        () => {
//                            console.log(x);
//                            console.log('login token: ' + x['access_token'])
                            localStorage.setItem('token', x['access_token']);
//                            console.log('login token local storage: ' + localStorage.getItem('token'))
                            alert('Registro Exitoso');
                            this.router.navigate(['/admin']).catch(err => console.error(err));
                        }
                    );

                } else {
                    alert('La clave no es correcta');
                }
            }
            );
    }
}
