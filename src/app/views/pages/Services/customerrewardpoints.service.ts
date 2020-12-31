import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerrewardpointsService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }

	GetCustomerRewardPoint() {
		return this._http.get(this._links.GetCustomerRewardPoint, { headers: this._commonServices.getHeaders() });
	}

	SaveCustomerRewardPoint(body, headers) {
		return this._http.post(this._links.PostCustomerRewardPoint, body, headers);
	}

	EditCustomerRewardPoint(body, header) {
		return this._http.put(this._links.PutCustomerRewardPoint, body, header);
	}

	DeletCustomerRewardPoint(id, headers) {
		return this._http.delete(this._links.DeleteCustomerRewardPoint + id, headers);
	}
}
