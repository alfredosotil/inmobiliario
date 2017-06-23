import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//Grab everything with import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GlobalService } from 'app/global.service';

@Injectable()
export class UserService {

    constructor(
        private gs: GlobalService,
        private http: Http
    ) { }

    public login(o: {}) {
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        });
        return this.http.post(this.gs.getApiRestUrl() + 'api/login', 'email=' + o['email'] + '&password=' + o['password'], options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public create(o: {}) {
        let options = new RequestOptions({
            headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
        return this.http.post(this.gs.getApiRestUrl() + 'user', JSON.stringify(o), options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public list() {
        return this.http.get(this.gs.getApiRestUrl() + 'user')
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public search(data: { column: string, data: string }) {
        return this.http.get(this.gs.getApiRestUrl() + 'user/search?' + data.column + '=' + data.data)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public view(id: string) {
        return this.http.get(this.gs.getApiRestUrl() + 'user/' + id)
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public update(id: string) {

    }

    public delete(id: string) {

    }
}
