import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class TaxService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllTax() {
		return this._http.get(this._links.GetAllTax, { headers: this._commonServices.getHeaders() });
	}

	// getBankByID(id) {
	// 	return this._http.get(this._links.BankByID + id, { headers: this._commonServices.getHeaders() });
	// }

	SaveTax(body, headers) {
		return this._http.post(this._links.PostTax, body, headers);
	}

	EditTax(id, body, header) {
		return this._http.put(this._links.PutTax + id, body, header);
	}

	DeleteTax(id, headers) {
		return this._http.delete(this._links.DeleteTax + id, headers);
	}
}
