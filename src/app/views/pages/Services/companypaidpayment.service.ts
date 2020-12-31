import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CompanypaidpaymentService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	Getpayment() {
		return this._http.get(this._links.Getpayment, { headers: this._commonServices.getHeaders() });
	}

	GetCheque() {
		return this._http.get(this._links.GetCheque, { headers: this._commonServices.getHeaders() });
	}

	GetpaymentByID(id) {
		return this._http.get(this._links.GetpaymentByID + id, { headers: this._commonServices.getHeaders() });
	}

	GetAccountPayableGen(){
		return this._http.get(this._links.GetAccountPayableGen, { headers: this._commonServices.getHeaders() });
	}

	PostPayment(body, headers) {
		return this._http.post(this._links.PostPayment, body, headers);
	}
}
