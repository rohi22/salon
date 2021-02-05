import { WebsettingService } from './../../Services/websetting.service';
// Angular
import { ChangeDetectorRef, Component, Injector, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Login, Logout } from '../../../../core/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiLinks } from '../../Services/APILinks';

//import { LoginService } from 'src/app/Services/login.service';

/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
	// EMAIL: 'admin@demo.com',
	// PASSWORD: 'demo'
	EMAIL: 'info@minibigtech.com',
	PASSWORD: 'Salon@8787'
};

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;

	private returnUrl: any;
	baseUrl: any;
	Logo: string;

	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		//private _loginService: LoginService,
		private _http: HttpClient,
		private injector: Injector,
		// private apiLinks: api
		private _apilinks: ApiLinks,
		private webSetting: WebsettingService
	) {
		localStorage.clear();
		this.unsubscribe = new Subject();
		this.baseUrl = _apilinks.BaseUrl;

	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {

		this.initLoginForm();
		this.logout();

		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/';
		});
	}
	logout() {
		this.store.dispatch(new Logout());
	}
	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		// demo message to show

		// if (!this.authNoticeService.onNoticeChanged$.getValue()) {
		// 	const initialNotice = `Use account
		// 	<strong>${DEMO_PARAMS.EMAIL}</strong> and password
		// 	<strong>${DEMO_PARAMS.PASSWORD}</strong> to continue.`;
		// 	this.authNoticeService.setNotice(initialNotice, 'info');
		// }

		this.loginForm = this.fb.group({
			'email': ['', Validators.required],
			'password': ['', Validators.required],
			// email: [Validators.compose([
			// 	Validators.required,
			// 	Validators.email,
			// 	Validators.minLength(3),
			// 	Validators.maxLength(320)
			// ])
			// ],
			// password: [Validators.compose([
			// 	Validators.required,
			// 	Validators.minLength(3),
			// 	Validators.maxLength(100)
			// ])
			// ]
		});
	}

	Login(email: string, password: string) {
		return this._http.post<any>(this.baseUrl + "login", { email, password });
	}

	UserLogin() {
		try {
			const controls = this.loginForm.controls;
			if (this.loginForm.invalid) {
				Object.keys(controls).forEach(controlName =>
					controls[controlName].markAsTouched()
				);
				return;
			}
			const authData = {
				email: controls.email.value,
				password: controls.password.value
			};
			this.Login(authData.email, authData.password).subscribe((user) => {
				this.authNoticeService.setNotice(this.translate.instant('User Login Successfully..'), 'success');
				var token = user[2].data[0].Authorization;
				localStorage.setItem('Authorization', token);

				var user = user[2].data[1].user;
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('userId', user.id);

				console.log(this.returnUrl)
				this.router.navigate(["/ngbootstrap/menus/salonPos"]);

			}, (error: HttpErrorResponse) => {
				this.authNoticeService.setNotice(this.translate.instant('Invalid Username Or Password..'), 'danger');
			});
		}
		catch (e) {
			console.log('Error', e);
		}
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.loading = true;

		const authData = {
			email: controls.email.value,
			password: controls.password.value
		};
		this.auth
			.login(authData.email, authData.password)
			.pipe(
				tap(user => {
					if (user) {
						this.store.dispatch(new Login({ authToken: user.accessToken }));
						this.router.navigateByUrl(this.returnUrl); // Main page
					} else {
						this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
					}
				}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdr.markForCheck();
				})
			)
			.subscribe();
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
