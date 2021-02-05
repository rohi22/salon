import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class CustomerService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllCustomer() {
		return this._http.get(this._links.AllCustomer, { headers: this._commonServices.getHeaders() });
	}

	PostCustomerUpdate(body, headers) {
		return this._http.post(this._links.PostCustomerUpdate, body, headers);
	}

	PostCustomer(body) {
		return this._http.post(this._links.SaveCustomer, body, { headers: this._commonServices.getHeaders() });
	}

}
