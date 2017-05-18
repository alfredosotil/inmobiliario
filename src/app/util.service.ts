import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//Grab everything with import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GlobalService } from 'app/global.service';
declare var jQuery: any;
declare function require(name: string);

@Injectable()
export class UtilService {

    CryptoJS = require("crypto-js");
    
    constructor(
        private gs: GlobalService,
        private http: Http
    ) {
        this.initValidation();
    }

    public initValidation() {
//        jQuery.fn.form.settings.rules.verifyEmailUserLogin = () => {
//            var email = jQuery('.ui.form').form('get value', 'email');
//            var result = false;
//            if (email === "") {
//                email = "no-email"
//            }
//            jQuery.ajax(this.gs.getApiRestUrl() + 'user/search?email=' + email, {
//                async: false,
//                type: "GET",
//                success: function(data) {
//                    result = (data.length > 0);
//                },
//                error: function(jqXHR, textStatus, errorThrown) {
//                    alert(textStatus);
//                }
//            });
//            return result;
//        };
//        jQuery.fn.form.settings.rules.verifyUsername = () => {
//            var username = jQuery('.ui.form').form('get value', 'username');
//            var result = false;
//            if (username === "") {
//                username = "no-user"
//            }
//            jQuery.ajax(this.gs.getApiRestUrl() + 'user/search?username=' + username, {
//                async: false,
//                type: "GET",
//                success: function(data) {
//                    result = !(data.length > 0);
//                },
//                error: function(jqXHR, textStatus, errorThrown) {
//                    alert(textStatus);
//                }
//            });
//            return result;
//        };
//        jQuery.fn.form.settings.rules.verifyEmail = () => {
//            var email = jQuery('.ui.form').form('get value', 'email');
//            var result = false;
//            if (email === "") {
//                email = "no-email"
//            }
//            jQuery.ajax(this.gs.getApiRestUrl() + 'user/search?email=' + email, {
//                async: false,
//                type: "GET",
//                success: function(data) {
//                    result = !(data.length > 0);
//                },
//                error: function(jqXHR, textStatus, errorThrown) {
//                    alert(textStatus);
//                }
//            });
//            return result;
//        };
//        jQuery.fn.form.settings.rules.verifyEmailSubscriber = () => {
//            var email = jQuery('.sub-form').form('get value', 'email');
//            var result = false;
//            if (email === "") {
//                email = "no-email"
//            }
//            jQuery.ajax(this.gs.getApiRestUrl() + 'emailsubscribers/search?email=' + email, {
//                async: false,
//                type: "GET",
//                success: function(data) {
//                    result = !(data.length > 0);
//                },
//                error: function(jqXHR, textStatus, errorThrown) {
//                    alert(textStatus);
//                }
//            });
//            return result;
//        };
//        jQuery.fn.form.settings.rules.verifySpecialKey = () => {
//            var key = jQuery('.ui.form').form('get value', 'specialkey');
//            var specialKeys = ['sniperfamily', 'sniperteam', 'sniperforever'];
//            if (key !== "") {
//                return (specialKeys.indexOf(key) >= 0) ? true : false;
//            }
//            //            if (key === "") {
//            //                return false;
//            //            } else {
//            //                
//            //            }
//            //            jQuery.ajax('https://coarkpro.com/sniper-api/public/studentsearch/email/' + key, {
//            //                async: false,
//            //                type: "GET",
//            //                success: function(data) {
//            //                    result = !(data.length > 0);
//            //                },
//            //                error: function(jqXHR, textStatus, errorThrown) {
//            //                    alert(textStatus);
//            //                }
//            //            });
//            //            return result;
//        };
    }

    public sendMail(m: {}) {
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
        return this.http.post(this.gs.getApiRestUrl() + 'sendmail', JSON.stringify(m), options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public generateJWT(id: string, username: string, password: string) {
        var header = {
            "alg": "HS256",
            "typ": "JWT"
        };

        var stringifiedHeader = this.CryptoJS.enc.Utf8.parse(JSON.stringify(header));
        var encodedHeader = this.base64url(stringifiedHeader);

        var data = {
            "id": id,
            "username": username
        };

        var stringifiedData = this.CryptoJS.enc.Utf8.parse(JSON.stringify(data));
        var encodedData = this.base64url(stringifiedData);

        var token = encodedHeader + "." + encodedData;

        var secret = password;

        var signature = this.CryptoJS.HmacSHA256(token, secret);
        signature = this.base64url(signature);
        var signedToken = token + "." + signature;
        return signedToken;
    }

    private base64url(source) {
        // Encode in classical base64
        let encodedSource = this.CryptoJS.enc.Base64.stringify(source);

        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');

        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');

        return encodedSource;
    }

    public randomString(length, chars) {
        let mask = '';
        if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chars.indexOf('#') > -1) mask += '0123456789';
        if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
        var result = '';
        for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
        return result;
    }

}
