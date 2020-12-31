import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor {
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {

		return next.handle(request).pipe(
			tap(
				event => {
					 if (event instanceof HttpResponse) {
						console.log('all looks good');
						console.log(event.status);
					}
				},
				error => {
					console.error('status code:');
				},
			)

		);
	}
}
