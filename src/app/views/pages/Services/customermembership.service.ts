import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CustomermembershipService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	GetCustomerMemberdhipCard() {
		return this._http.get(this._links.GetCustomerMemberdhipCard, { headers: this._commonServices.getHeaders() });
	}

	SaveCustomerMemberdhipCard(body, headers) {
		return this._http.post(this._links.PostCustomerMemberdhipCard, body, headers);
	}

	EditCustomerMemberdhipCard(body, header) {
		return this._http.put(this._links.PutCustomerMemberdhipCard, body, header);
	}

	DeletCustomerMemberdhipCard(id, headers) {
		return this._http.delete(this._links.DeleteCustomerMemberdhipCard + id, headers);
	}
}
