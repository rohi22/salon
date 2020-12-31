import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class ProfitService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	GetProfitBYDate(date) {
		return this._http.get(this._links.GetProfitBYDate, { headers: this._commonServices.getHeaders() });
	}

	PostProfit(body, headers) {
		return this._http.post(this._links.PostProfit, body, headers);
	}
}
