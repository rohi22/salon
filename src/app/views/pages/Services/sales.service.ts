import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class SalesService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	GetSales() {
		return this._http.get(this._links.GetSales, { headers: this._commonServices.getHeaders() });
	}

	getSalesByID(id) {
		return this._http.get(this._links.SalesByID + id, { headers: this._commonServices.getHeaders() });
	}

	getSalesByBranch(branchid) {
		return this._http.get(this._links.SalesByBranch + branchid, { headers: this._commonServices.getHeaders() });
	}

	getSalesByDate(date) {
		return this._http.get(this._links.SalesByDate + date, { headers: this._commonServices.getHeaders() });
	}

	postSales(body, headers) {
		return this._http.post(this._links.postSales, body, headers);
	}
}
