import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
//Grab everything with import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from 'app/app.component';

@Injectable()
export class UserService {
    
    private model = 'user';

    constructor(
        private app: AppComponent,
        private http: Http
    ) { }

    public login(o: {}) {
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        });
        return this.http.post(this.app.gs.getApiRestUrl() + 'api/login', 'email=' + o['email'] + '&password=' + o['password'], options)
            .map((res: Response) => {
                //                console.log(res);
                if (res.status != 200) {
                    console.log("Error server");
                    //                    throw new Error('This request has failed ' + res.status);
                }
                // If everything went fine, return the response
                else {
                    return res.json();
                }
            })
            .catch((error: any) => {
                console.log("error: " + error);
                if (error.status === 422) {
                    console.log("status: " + error.status);
                    return Observable.throw(new Error(error.status));
                }
            });
        //            .catch((error: Response | any) => {
        //                if (error instanceof Response) {
        //                    if (error.status === 400) {
        //                        console.log("Server responded with 400");
        //                        // Create a new observable with the data for the rest of the chain
        //                        return Observable.of([]);
        //                    }
        //                }
        //                // Re-throw unhandled error
        //                return Observable.throw(error);
        //            });
    }

    public create(o: {}) {
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
        return this.http.post(this.app.gs.getApiRestUrl() + this.model, JSON.stringify(o), options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public list() {
        return this.http.get(this.app.gs.getApiRestUrl() + this.model)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public search(column: string, data: string) {
        return this.http.get(this.app.gs.getApiRestUrl() + this.model + '/search?' + column + '=' + data)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public view(id: string) {
        return this.http.get(this.app.gs.getApiRestUrl() + this.model + '/' + id)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public update(id: string) {

    }

    public delete(id: string) {

    }
}
