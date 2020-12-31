import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class GrnserviceService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllGRN() {
		return this._http.get(this._links.AllGRN, { headers: this._commonServices.getHeaders() });
	}

	getGrnByBranchID(branchid) {
		return this._http.get(this._links.GrnByBranchID + branchid, { headers: this._commonServices.getHeaders() });
	}

	getGrnByID(id) {
		return this._http.get(this._links.GrnByID + id, { headers: this._commonServices.getHeaders() });
	}

	getGrnByPO(po) {
		return this._http.get(this._links.GrnByPO + po, { headers: this._commonServices.getHeaders() });
	}

	SaveGrn(body, header) {
		return this._http.post(this._links.PostGrn, body, header);
	}

	EditGrn(body, header) {
		return this._http.put(this._links.PutGrn, body, header);
	}

}
