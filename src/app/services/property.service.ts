import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
//Grab everything with import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppComponent } from 'app/app.component';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt';
import { InterceptorService } from 'ng2-interceptors';


@Injectable()
export class PropertyService {

    private model = 'property';

    constructor(
        private app: AppComponent,
        //                private http: Http,
        private http: InterceptorService
        //        private authHttp: Jsonp,
        //        private authHttp: AuthHttp
    ) { }

    public create(o: {}) {
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
        return this.http.post(this.app.gs.getApiRestUrl() + this.model, JSON.stringify(o), options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public list() {
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
        return this.http.get(this.app.gs.getApiRestUrl() + this.model, options)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public listPropertyType() {
        return this.http.get(this.app.gs.getApiRestUrl() + this.model + '/getlistpropertytype')
            .map((response: Response) => response.json());
    }
    
    public listPropertyState() {
        return this.http.get(this.app.gs.getApiRestUrl() + this.model + '/getlistpropertystate')
            .map((response: Response) => response.json());
    }
    
    public listDetailsProperty() {
        return this.http.get(this.app.gs.getApiRestUrl() + this.model + '/getlistdetailsproperty')
            .map((response: Response) => response.json());
    }
}
