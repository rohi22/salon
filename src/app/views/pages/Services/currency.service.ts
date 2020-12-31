import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class CurrencyService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	GetAllCurrency() {
		return this._http.get(this._links.GetAllCurrency, { headers: this._commonServices.getHeaders() });
	}

	GetCurrencyByID() {
		return this._http.get(this._links.GetCurrencyByID, { headers: this._commonServices.getHeaders() });
	}

	SaveCurrency(body, headers) {
		return this._http.post(this._links.PostCurrency, body, headers);
	}

	EditCurrency(body, header) {
		return this._http.put(this._links.PutCurrency, body, header);
	}

	DeletCurrency(id, headers) {
		return this._http.delete(this._links.DeleteCurrency + id, headers);
	}
}
