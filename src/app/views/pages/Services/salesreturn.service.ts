import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class SalesreturnService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	GetsalesreturnByID(id) {
		return this._http.get(this._links.GetsalesreturnByID + id, { headers: this._commonServices.getHeaders() });
	}

	Getpurchasereturn() {
		return this._http.get(this._links.Getpurchasereturn, { headers: this._commonServices.getHeaders() });
	}

	postPostpurchasereturn(body, headers) {
		return this._http.post(this._links.Postpurchasereturn, body, headers);
	}
}
