import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class WebsettingService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getallWebsetting() {
		return this._http.get(this._links.allWebsetting, { headers: this._commonServices.getHeaders() });
	}

	getWebsettingByID(id) {
		return this._http.get(this._links.WebsettingByID + id, { headers: this._commonServices.getHeaders() });
	}

	PostWebsetting(body, headers) {
		return this._http.post(this._links.PostWebsetting, body, headers);
	}

	PutWebsetting(body, header) {
		debugger;
		return this._http.put(this._links.PutWebsetting, body, header);
	}

}
