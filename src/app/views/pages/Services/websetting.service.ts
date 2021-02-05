import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class WebsettingService {

	public websettingObject = new Subject<any>();
	constructor(@Inject(DOCUMENT) private _document: HTMLDocument, private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }

	setAppFavicon(basepath: string, icon: string) {
		this._document.getElementById('appFavicon').setAttribute('href', basepath + icon);
	}

	getallWebsetting() {
		return this._http.get(this._links.allWebsetting, { headers: this._commonServices.getHeaders() });
	}

	getallWebsettingWithOutAuth() {
		return this._http.get(this._links.allWebsetting);
	}

	getWebsettingByID(id) {
		return this._http.get(this._links.WebsettingByID + id, { headers: this._commonServices.getHeaders() });
	}

	PostWebsetting(body, headers) {
		return this._http.post(this._links.PostWebsetting, body, headers);
	}

	PutWebsetting(body, header) {
		return this._http.post(this._links.PutWebsetting, body, header);
	}

}
