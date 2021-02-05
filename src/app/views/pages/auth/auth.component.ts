// Angular
import { Component, ElementRef, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
// Layout
import { LayoutConfigService, SplashScreenService, TranslationService } from '../../../core/_base/layout';
// Auth
import { AuthNoticeService } from '../../../core/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiLinks } from '../Services/APILinks';
import { WebsettingService } from '../Services/websetting.service';

@Component({
	selector: 'kt-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
	// Public properties
	today: number = Date.now();
	headerLogo: string;
	Logo: string;

	/**
	 * Component constructor
	 *
	 * @param el
	 * @param render
	 * @param layoutConfigService: LayoutConfigService
	 * @param authNoticeService: authNoticeService
	 * @param translationService: TranslationService
	 * @param splashScreenService: SplashScreenService
	 */
	constructor(
		private el: ElementRef,
		private render: Renderer2,
		private layoutConfigService: LayoutConfigService,
		public authNoticeService: AuthNoticeService,
		private _apilinks: ApiLinks,
		private webSetting: WebsettingService,
		private translationService: TranslationService,
		private splashScreenService: SplashScreenService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.GetWebsetting()
		this.translationService.setLanguage(this.translationService.getSelectedLanguage());
		this.headerLogo = this.layoutConfigService.getLogo();

		this.splashScreenService.hide();
	}

	/**
	 * Load CSS for this specific page only, and destroy when navigate away
	 * @param styleUrl
	 */
	private loadCSS(styleUrl: string) {
		return new Promise((resolve, reject) => {
			const styleElement = document.createElement('link');
			styleElement.href = styleUrl;
			styleElement.type = 'text/css';
			styleElement.rel = 'stylesheet';
			styleElement.onload = resolve;
			this.render.appendChild(this.el.nativeElement, styleElement);
		});
	}


	GetWebsetting() {
		this.webSetting.getallWebsettingWithOutAuth().subscribe((res: any) => {
			if (res[0].logo) {
				this.Logo = this._apilinks.imagePath + res[0].logo
			}
		}, (err: HttpErrorResponse) => {
			alert(err.message)
		})
	}
}
