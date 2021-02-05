// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
	// intercept request and add token
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// tslint:disable-next-line:no-
		// modify request
		// request = request.clone({
		// 	setHeaders: {
		// 		Authorization: `Bearer ${localStorage.getItem('accessToken')}`
		// 	}
		// });
		// console.log('----request----');
		// console.log(request);
		// console.log('--- end of request---');

		return next.handle(request).pipe(
			tap(
				event => {
					 if (event instanceof HttpResponse) {
						// console.log('all looks good');
						// http response status code
						// console.log(event.status);
					}
				},
				error => {
					// http response status code
					// console.log('----response----');
					// console.error('status code:');
					// tslint:disable-next-line:no-
					console.error(error.status);
					console.error('interceptError',error);
					console.error(error.message);
					// console.log('--- end of response---');
				}
			)
		);
	}
// 	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

// 		return next.handle(authReq).catch((error, caught) => {
// 		  if(error.error.status === 403) {
// 			  this.router.navigate(['/login']);
// 		  } else if(error.error.status === 400) {
// 			  console.log('Error status 400');
// 		  }
// 		  return Observable.throw(error);
// 	  }) as any;
// }
}
