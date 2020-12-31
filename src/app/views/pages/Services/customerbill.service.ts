import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class CustomerbillService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	GetCustomerBill() {
		return this._http.get(this._links.GetCustomerBill, { headers: this._commonServices.getHeaders() });
	}

	GetCustomerBillBYID(id) {
		return this._http.get(this._links.GetCustomerBillBYID + id, { headers: this._commonServices.getHeaders() });
	}

	GetCustomerBillByCustomerID(customerid) {
		return this._http.get(this._links.GetCustomerBillByCustomerID + customerid, { headers: this._commonServices.getHeaders() });
	}

	GetCustomerBillByORderID(orderid) {
		return this._http.get(this._links.GetCustomerBillByORderID + orderid, { headers: this._commonServices.getHeaders() });
	}

	SaveCustomerBill(body, headers) {
		return this._http.post(this._links.PostCustomerBill, body, headers);
	}
}
