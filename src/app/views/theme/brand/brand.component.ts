import { WebsettingService } from './../../pages/Services/websetting.service';
// Angular
import { AfterViewInit, Component, OnInit } from '@angular/core';
// Layout
import { LayoutConfigService, ToggleOptions } from '../../../core/_base/layout';
import { HtmlClassService } from '../html-class.service';
import { ApiLinks } from '../../pages/Services/APILinks';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'kt-brand',
	templateUrl: './brand.component.html',
})
export class BrandComponent implements OnInit, AfterViewInit {
	// Public properties
	headerLogo: string;
	headerStickyLogo: string;

	toggleOptions: ToggleOptions = {
		target: 'body',
		targetState: 'kt-aside--minimize',
		togglerState: 'kt-aside__brand-aside-toggler--active'
	};

	/**
	 * Component constructor
	 *
	 * @param layoutConfigService: LayoutConfigService
	 * @param htmlClassService: HtmlClassService
	 */
	constructor(private layoutConfigService: LayoutConfigService, public htmlClassService: HtmlClassService, private webService: WebsettingService,
		private apiLinks: ApiLinks) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {

		this.webService.getallWebsetting()
			.subscribe((res: any) => {
				debugger
				if (res[0] && res[0].id && res[0] !== undefined) {
					this.headerLogo = this.apiLinks.imagePath + res[0].logo
				}
				else {
					this.headerLogo = this.apiLinks.imagePath + localStorage.getItem("Logo")
				}
			}, (err: HttpErrorResponse) => {
				alert(err.error)
			});
		this.webService.websettingObject.subscribe((res: any) => {
			if (res) {
				this.headerLogo = this.apiLinks.imagePath + res.logo
			}
			else {
				this.headerLogo = this.apiLinks.imagePath + localStorage.getItem("Logo")
			}
		})
		// this.headerLogo = this.layoutConfigService.getLogo();
		this.headerStickyLogo = this.layoutConfigService.getStickyLogo();
		// this.webService.websettingObject.subscribe((res: any) => {
		// 	debugger
		// 	if (res) {
		// 		this.headerLogo = this.apiLinks.imagePath + res.logo
		// 	}
		// })
	}

	/**
	 * On after view init
	 */
	ngAfterViewInit(): void {
	}
}
