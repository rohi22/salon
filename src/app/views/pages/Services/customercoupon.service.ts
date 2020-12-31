import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CustomercouponService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	GetCustomerCoupon() {
		return this._http.get(this._links.GetCustomerCoupon, { headers: this._commonServices.getHeaders() });
	}

	SaveCustomerCoupon(body, headers) {
		return this._http.post(this._links.PostCustomerCoupon, body, headers);
	}

	EditCustomerCoupon(body, header) {
		return this._http.put(this._links.PutCustomerCoupon, body, header);
	}

	DeletCustomerCoupon(id, headers) {
		return this._http.delete(this._links.DeleteCustomerCoupon + id, headers);
	}
}
