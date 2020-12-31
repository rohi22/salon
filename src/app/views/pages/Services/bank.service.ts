import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class BankService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllBank() {
		return this._http.get(this._links.AllBank, { headers: this._commonServices.getHeaders() });
	}

	getBankByID(id) {
		return this._http.get(this._links.BankByID + id, { headers: this._commonServices.getHeaders() });
	}

	SaveBank(body, headers) {
		return this._http.post(this._links.PostBank, body, headers);
	}

	EditBank(id, body, header) {
		return this._http.put(this._links.PutBank + id, body, header);
	}

	DeleteBank(id, headers) {
		return this._http.delete(this._links.DeleteBank + id, headers);
	}
}
