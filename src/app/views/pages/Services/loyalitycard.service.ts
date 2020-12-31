import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class LoyalitycardService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	GetCustomerLoyalityCard() {
		return this._http.get(this._links.GetCustomerLoyalityCard, { headers: this._commonServices.getHeaders() });
	}

	PostCustomerLoyalityCard(body, headers) {
		return this._http.post(this._links.PostCustomerLoyalityCard, body, headers);
	}

	PutCustomerLoyalityCard(body, header) {
		return this._http.put(this._links.PutCustomerLoyalityCard, body, header);
	}

	DeleteCustomerLoyalityCard(id, headers) {
		return this._http.delete(this._links.DeleteCustomerLoyalityCard + id, headers);
	}

	PostLoyalityCardTransaction(body, headers){
		return this._http.post(this._links.PostCustomerLoyalityCardTranstion, body, headers);
	}
}
