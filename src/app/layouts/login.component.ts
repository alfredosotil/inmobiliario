import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from '../services/user.service';
import { AppComponent } from '../app.component';
import { TabsetComponent } from 'ngx-bootstrap';
declare var jQuery: any;
declare var zxcvbn: any;
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    @ViewChild('staticTabs') staticTabs: TabsetComponent;
    model = {};
    registerForm = {};
    message = {};
    messages = [];
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private router: Router,
        private user: UserService,
        private app: AppComponent,
        private localStorageService: LocalStorageService
    ) {
        this.messages = [
            { text: 'Enviando Informacion', icon: 'glyphicon glyphicon-refresh glyphicon-spin' },
            { text: 'Completado', icon: 'glyphicon glyphicon-ok' },
            { text: 'Error', icon: 'glyphicon glyphicon-remove' },
            { text: 'Bienvenido', icon: 'glyphicon glyphicon-ok' },
            { text: 'Clave Incorrecta', icon: 'glyphicon glyphicon-remove' },
        ];
    }

    ngOnInit() {
        //        console.log('token' + this.us.randomString(64, '#aA!'));
        jQuery('body,html').animate({ scrollTop: 0 }, 800);
        jQuery.backstretch([
            "images/banner-1.jpg"
            , "images/banner-2.jpg"
            , "images/banner-3.jpg"
        ], { duration: 3000, fade: 750 });
        //        jQuery('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
        //            jQuery(this).removeClass('input-error');
        //        });
        //
        //
        //        jQuery('.registration-form input[type="text"], .registration-form textarea').on('focus', function() {
        //            jQuery(this).removeClass('input-error');
        //        });
        jQuery('#rbirthday').datepicker({
            format: 'yyyy/mm/dd',
            language: "es",
            autoclose: true,
            todayHighlight: true
        });
        jQuery('.selectpicker').selectpicker();
        this.initFormValidation();
    }

    public InitValidation(e) {
        //        jQuery('.ui.secondary.button').addClass('loading');
        e.preventDefault();
        this.isLoading$.next(true);
        setTimeout(() => {
            console.log('initvalid');
            jQuery('#login-form').data('bootstrapValidator').validate();
            //            this.isLoading$.next(false);
        }, 100);
    }

    public InitRegisterValidation(e) {
        //        jQuery('.ui.secondary.button').addClass('loading');        
        e.preventDefault();
        this.isLoading$.next(true);
        setTimeout(() => {
            console.log('initvalid');
            jQuery('#registration-form').data('bootstrapValidator').validate();
            //            this.isLoading$.next(false);
        }, 100);
    }

    private initFormValidation() {
        jQuery('#login-form').bootstrapValidator({
            message: 'El valor no es correcto',
            //            feedbackIcons: {
            //                valid: 'fa fa-check fa-2',
            //                invalid: 'fa fa-exclamation fa-2',
            //                validating: 'fa fa-circle-o-notch fa-spin fa-2'
            //            },
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            onError: (e) => {
                console.log('error')
                this.isLoading$.next(false);
            },
            onSuccess: (e) => {
                e.preventDefault();
                this.isLoading$.next(false);
                //                    this.model.accessToken = this.us.randomString(50, '#aA!');
                //                    console.log('token ' + this.model.accessToken);
                //                    alert("Registrado");
                this.login(this.model);
            },
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: 'El correo es requerido y no puede ser vacio'
                        },
                        emailAddress: {
                            message: 'Este no es un correo valido'
                        },
                        callback: {
                            message: 'Este correo no existe en nuestra base de informacion',
                            callback: (value, validator, $field) => {
                                var email = value;
                                var result = false;
                                if (email === "") {
                                    email = "no-email"
                                }
                                jQuery.ajax(this.app.gs.getApiRestUrl() + 'user/search?email=' + email, {
                                    async: false,
                                    type: "GET",
                                    success: function(data) {
                                        result = (data.length > 0);
                                    },
                                    error: function(jqXHR, textStatus, errorThrown) {
                                        alert(textStatus);
                                    }
                                });
                                return result;
                            }
                        }

                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'La clave es requerida y no puede ser vacia'
                        }
                    }
                }
            }
        });
        jQuery('#registration-form').bootstrapValidator({
            message: 'El valor no es correcto',
            //            feedbackIcons: {
            //                valid: 'fa fa-check fa-2',
            //                invalid: 'fa fa-exclamation fa-2',
            //                validating: 'fa fa-circle-o-notch fa-spin fa-2'
            //            },
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            onError: (e) => {
                console.log('error')
                this.isLoading$.next(false);
            },
            onSuccess: (e) => {
                e.preventDefault();
                //                var $form     = jQuery(e.target);
                this.isLoading$.next(false);
                //                this.registerForm['access_token'] = this.us.randomString(50, '#aA!');
                //                this.registerForm['id'] = this.us.randomString(10, '#');
                //                this.registerForm['accessToken'] = this.us.generateJWT(this.registerForm['id'], this.registerForm['username'], this.model['password']);
                //                console.log('accessToken ' + this.model['accessToken']);
                //                console.log('access_token ' + this.registerForm['access_token']);
                //                console.log('birthday ' + this.registerForm['birthday']);
                this.registerUser(this.registerForm);

            },
            fields: {
                rtypeidentificator: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'Debes seleccionar un tipo de documento.'
                        }
                    }
                },
                ridentificator: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'El número de documento es requerido y no puede ser vacío.'
                        },
                        stringLength: {
                            min: 6,
                            max: 20,
                            message: 'El número debe ser entre 10 y 20 caracteres.'
                        }
                    }
                },
                rname: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'El nombre es requerido y no puede ser vacío.'
                        }
                    }
                },
                rlastname: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'El apellido es requerido y no puede ser vacío.'
                        }
                    }
                },
                rsex: {
                    // The group will be set as default (.form-group)
                    validators: {
                        notEmpty: {
                            message: 'Debes seleccionar tu sexo.'
                        }
                    }
                },
                rbirthday: {
                    feedbackIcons: 'false',
                    validators: {
                        notEmpty: {
                            message: 'La fecha de nacimiento es requerida y no puede ser vacía.'
                        },
                        date: {
                            format: 'YYYY/MM/DD',
                            message: 'El valor no es válido.'
                        }
                    },
                },
                remail: {
                    validators: {
                        notEmpty: {
                            message: 'El correo es requerido y no puede ser vacio'
                        },
                        emailAddress: {
                            message: 'Este no es un correo valido'
                        },
                        callback: {
                            message: 'Este correo ya se encuentra registrado.',
                            callback: (value, validator, $field) => {
                                var email = value;
                                var result = false;
                                if (email === "") {
                                    email = "no-email"
                                }
                                jQuery.ajax(this.app.gs.getApiRestUrl() + 'user/search?email=' + email, {
                                    async: false,
                                    type: "GET",
                                    success: function(data) {
                                        result = !(data.length > 0);
                                    },
                                    error: function(jqXHR, textStatus, errorThrown) {
                                        alert(textStatus);
                                    }
                                });
                                return result;
                            }
                        }
                    }
                },
                rphone: {
                    validators: {
                        notEmpty: {
                            message: 'El teléfono es requerido y no puede ser vacio'
                        },
                        regexp: {
                            regexp: '^([2-9])(\\d{2})(-?|\\040?)(\\d{4})( ?|\\040?)(\\d{1,4}?|\\040?)$',
                            message: 'El Teléfono debe contener números unicamente.'
                        }
                    }
                },
                rusertype: {
                    validators: {
                        notEmpty: {
                            message: 'Debes escoger un tipo de usuario.'
                        }
                    }
                },
                rusername: {
                    validators: {
                        notEmpty: {
                            message: 'El usuario es requerido y no puede ser vacio'
                        },
                        callback: {
                            message: 'Este usuario ya se encuentra registrado.',
                            callback: (value, validator, $field) => {
                                var username = value;
                                var result = false;
                                if (username === "") {
                                    username = "no-user"
                                }
                                jQuery.ajax(this.app.gs.getApiRestUrl() + 'user/search?username=' + username, {
                                    async: false,
                                    type: "GET",
                                    success: function(data) {
                                        result = !(data.length > 0);
                                    },
                                    error: function(jqXHR, textStatus, errorThrown) {
                                        alert(textStatus);
                                    }
                                });
                                return result;
                            }
                        }

                    }
                },
                rpassword: {
                    validators: {
                        notEmpty: {
                            message: 'La clave es requerida y no puede ser vacia'
                        },
                        identical: {
                            field: 'rrepassword',
                            message: 'La clave y su confirmación no son iguales.'
                        },
                        callback: {
                            callback: (value, validator, $field): any => {
                                var password = $field.val();
                                if (password == '') {
                                    return true;
                                }
                                var result = zxcvbn(password),
                                    score = result.score,
                                    message = result.feedback.warning || 'La Clave es débil.';
                                // Update the progress bar width and add alert class
                                var $bar = jQuery('#strengthBar');
                                switch (score) {
                                    case 0:
                                        $bar.attr('class', 'progress-bar progress-bar-danger')
                                            .css('width', '0%');
                                        break;
                                    case 1:
                                        $bar.attr('class', 'progress-bar progress-bar-danger')
                                            .css('width', '25%');
                                        break;
                                    case 2:
                                        $bar.attr('class', 'progress-bar progress-bar-danger')
                                            .css('width', '50%');
                                        break;
                                    case 3:
                                        $bar.attr('class', 'progress-bar progress-bar-warning')
                                            .css('width', '75%');
                                        break;
                                    case 4:
                                        $bar.attr('class', 'progress-bar progress-bar-success')
                                            .css('width', '100%');
                                        break;
                                }
                                // We will treat the password as an invalid one if the score is less than 3
                                if (score < 3) {
                                    return {
                                        valid: false,
                                        message: message
                                    }
                                }
                                return true;
                            }
                        }
                    }
                },
                rrepassword: {
                    validators: {
                        notEmpty: {
                            message: 'La clave es requerida y no puede ser vacia'
                        },
                        identical: {
                            field: 'rpassword',
                            message: 'La clave y su confirmación no son iguales.'
                        }
                    }
                }
            }
        });
        jQuery('#rbirthday').on('changeDate show', (e) => {
            jQuery('#registration-form').bootstrapValidator('revalidateField', 'rbirthday');
            this.registerForm['birthday'] = e.format();
        });
    };

    private registerUser(o: {}) {
        var x: any;
        jQuery('#processing-modal').modal('show');
        this.message = this.messages[0];
        this.user.create(o)
            .subscribe(
            data => x = data,
            error => alert(error),
            () => {
                if (parseInt(x.id) > 0) {
                    //                    jQuery('.ui.form').form('clear');
                    this.message = this.messages[1];
                    setTimeout(function() {
                        jQuery('#processing-modal').modal('hide');
                    }, 1500);
                    setTimeout(() => {
                        this.staticTabs.tabs[0].active = true;
                        jQuery('#strengthBar').attr('class', 'progress-bar progress-bar-danger')
                            .css('width', '0%');
                        jQuery('#registration-form')
                            .bootstrapValidator('disableSubmitButtons', false)  // Enable the submit buttons
                            .bootstrapValidator('resetForm', true);             // Reset the form
                        //                       this.router.navigate(['/login']).catch(err => console.error(err));                       
                    }, 1500);
                } else {
                    this.message = this.messages[2];
                    setTimeout(function() {
                        jQuery('#processing-modal').modal('hide');
                    }, 1500);
                }
            }
            );
    }


    private login(o: {}) {
        var x: any;
        var user: any;
        jQuery('#processing-modal').modal('show');
        this.user.login(o).subscribe(
            data => x = data,
            error => console.log(error),
            () => {
                if (typeof x["access_token"] === 'undefined' || x["access_token"] === null) {
                    // variable is undefined or null
                    this.message = this.messages[4];
                    setTimeout(() => {
                        jQuery('#processing-modal').modal('hide');
                        jQuery('#login-form')
                            .bootstrapValidator('disableSubmitButtons', false);  // Enable the submit buttons
                        //                            .bootstrapValidator('resetForm', true);             // Reset the form
                    }, 1500);
                } else {
                    this.message = this.messages[3];
                    this.user.search({ column: 'access_token', data: x["access_token"] }).subscribe(
                        data => user = data,
                        error => console.log(error),
                        () => {
                            this.localStorageService.set('user', user);
                        }
                    );
                    setTimeout(() => {
                        jQuery('#processing-modal').modal('hide');
                        //                    localStorage.setItem('token', x["access_token"]);
                        //                    localStorage["token"] = x["access_token"];
                        this.localStorageService.set('token', x["access_token"]);
                        this.app.auth.logIn();
                        this.router.navigate(['/dashboard']).catch(err => console.error(err));
                    }, 1500);
                }
            }
        );
    }
}
