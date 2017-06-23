import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from '../../services/user.service';
import { GlobalService } from 'app/global.service';
import { UtilService } from 'app/util.service';
declare var jQuery: any;

@Component({
    selector: 'app-registeruser',
    templateUrl: './registeruser.component.html',
    styleUrls: ['./registeruser.component.css'],
    providers: [UserService],
})
export class RegisteruserComponent implements OnInit {

    model = {};
    messages = [];
    message = {};
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private user: UserService,
        private gs: GlobalService,
        private us: UtilService,
        private router: Router,
    ) {
        this.messages = [
            { text: 'Enviando Informacion', icon: 'notched circle loading icon huge' },
            { text: 'Completado', icon: 'green checkmark icon huge' },
            { text: 'Error', icon: 'red remove icon huge' },
        ];
    }

    ngOnInit() {
        //        console.log('token' + this.us.randomString(64, '#aA!'));
        jQuery('body,html').animate({ scrollTop: 0 }, 800);
        //        this.isLoading$.next(false);
        this.message = this.messages[0];
        jQuery('#birthdate').calendar({
            type: 'date',
            onChange: (date, text) => {
                if (!date) return '';
//                console.log(date);
                this.model["birthdate"] = this.formatDate(date);
//                console.log(this.model["birthdate"]);
            }
        });
        jQuery('.ui.dropdown').dropdown();
        jQuery('.ui.checkbox').checkbox();
        this.initFormValidation();
    }   
    
    public keyDownFunction(e) {
        if (e.keyCode == 13) {
            alert("enter");
//            e.preventDefault();
            return false;
        }
    }

    private formatDate(date: any) {
        var date = date;
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        date = yyyy + '/' + mm + '/' + dd;
        return date;
    }

    public InitValidation(e) {
        //        jQuery('.ui.secondary.button').addClass('loading');
        e.preventDefault();
        this.isLoading$.next(true);
        setTimeout(function() {
            jQuery('.ui.form').form('validate form');
        }, 100);
    }

    private addStudent(o: {}) {
        var x: any;
        jQuery('.ui.page.dimmer').dimmer('show');
        this.user.create(o)
            .subscribe(
            data => x = data,
            error => alert(error),
            () => {
                if (parseInt(x.id) > 0) {
                    jQuery('.ui.form').form('clear');
                    this.message = this.messages[1];
                    setTimeout(function() {
                        jQuery('.ui.page.dimmer').dimmer('hide');                        
                    }, 1500);
                    setTimeout(() => {
                       this.router.navigate(['/login']).catch(err => console.error(err));                       
                    }, 1500);
                    
                } else {
                    this.message = this.messages[2];
                    setTimeout(function() {
                        jQuery('.ui.page.dimmer').dimmer('hide');
                    }, 1500);
                }
            }
            );
        this.message = this.messages[0];
    }

    private initFormValidation() {        
        jQuery('.ui.form')
            .form({
                fields: {
                    firstname: {
                        identifier: 'firstname',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Ingresa tus nombres.'
                            }
                        ]
                    },
                    lastname: {
                        identifier: 'lastname',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Ingresa tus apellidos.'
                            }
                        ]
                    },
                    birthdate: {
                        identifier: 'birthdate',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Selecciona tu fecha de nacimiento.'
                            }
                        ]
                    },
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
                                type: 'verifyEmail',
                                prompt: 'El correo proporcionado ya se encuentra registrado.'
                            }
                        ]
                    },
                    gender: {
                        identifier: 'gender',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Indica tu sexo.'
                            }
                        ]
                    },
                    username: {
                        identifier: 'username',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Ingresa un usuario.'
                            },
                            {
                                type: 'minLength[6]',
                                prompt: 'Tu usuario debe ser al menos de {ruleValue} caracteres.'
                            },
                            {
                                type: 'verifyUsername',
                                prompt: 'Este usuario no esta disponible.'
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
                    specialkey: {
                        identifier: 'specialkey',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Para registrarte debes proporcionar una clave administrativa.'
                            },
                            {
                                type: 'verifySpecialKey',
                                prompt: 'La clave administrativa no es correcta.'
                            }
                        ]
                    }
                },
                inline: true,
                keyboardShortcuts: false,
                on: 'blur',
                onApprove: () => {
                    this.isLoading$.next(false);
                },
                onSuccess: () => {
                    this.isLoading$.next(false);
                    this.model['accessToken'] = this.us.randomString(50, '#aA!');
//                    this.model['authKey'] = this.us.randomString(50, '#aA');
                    this.model['authKey'] = this.us.generateJWT(this.model['id'], this.model['username'], this.model['password']);
                    console.log('accessToken ' + this.model['accessToken']);
                    console.log('authKey ' + this.model['authKey']);
                    this.addStudent(this.model);
                },
                onFailure: () => {
                    this.isLoading$.next(false);
                },
            });
    }

}
