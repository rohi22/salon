import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class VendorService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	GetvendorByBranch(branchid) {
		return this._http.get(this._links.vendorByBranch + branchid, { headers: this._commonServices.getHeaders() });
	}

	GetvendorID(id) {
		return this._http.get(this._links.vendorByID + id, { headers: this._commonServices.getHeaders() });
	}

	GetALLvendor() {
		return this._http.get(this._links.GetALLvendor, { headers: this._commonServices.getHeaders() });
	}

	PostVendorUpdate(body, headers) {
		return this._http.post(this._links.PostVendorUpdate, body, headers);
	}
}
