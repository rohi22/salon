import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class PurchaseorderService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getPOByID(id) {
		return this._http.get(this._links.POByID + id, { headers: this._commonServices.getHeaders() });
	}

	getPObyBranchId(branchid) {
		return this._http.get(this._links.PObyBranchId + branchid, { headers: this._commonServices.getHeaders() });
	}

	getAllPO() {
		return this._http.get(this._links.AllPO, { headers: this._commonServices.getHeaders() });
	}

	SavePO(body, headers) {
		return this._http.post(this._links.PostPO, body, headers)
	}

	EditPO(body,detail, headers) {
		return this._http.post(this._links.PuttPO, body, headers)
	}
}
