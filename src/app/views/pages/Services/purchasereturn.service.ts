import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class PurchasereturnService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }

	GetALLPOReturn() {
		return this._http.get(this._links.GetALLPOReturn, { headers: this._commonServices.getHeaders() });
	}

	GetPOReturnBYID(id) {
		return this._http.get(this._links.POReturnByID + id, { headers: this._commonServices.getHeaders() });
	}

	POstPOReturn(body, headers) {
		return this._http.post(this._links.POstPOReturn, body, headers);
	}

}
