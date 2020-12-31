import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (localStorage.getItem('token')) {
            req = req.clone({
                headers: new HttpHeaders({
                    // 'Content-Type': 'application/json',
                    'Authorization': JSON.parse(localStorage.getItem('token'))
                })
            });
            return next.handle(req);
        }
        else {
            req = req.clone({
                headers: new HttpHeaders({
                    // 'Content-Type': 'application/json',
                    'Authorization': "JSON.parse(localStorage.getItem('token'))"
                })
            });
            return next.handle(req);
        }
    }
}
