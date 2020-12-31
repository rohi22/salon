import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerorderService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	GetCustomerOrder() {
		return this._http.get(this._links.GetCustomerOrder, { headers: this._commonServices.getHeaders() });
	}

	SaveCustomerOrder(body, headers) {
		return this._http.post(this._links.PostCustomerOrder, body, headers);
	}

	EditCustomerOrder(body, header) {
		return this._http.put(this._links.PutCustomerOrder, body, header);
	}

	DeletCustomerOrder(id, headers) {
		return this._http.delete(this._links.DeleteCustomerOrder + id, headers);
	}
}
