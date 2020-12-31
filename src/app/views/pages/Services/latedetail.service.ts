import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class LatedetailService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAlllatedetail() {
		return this._http.get(this._links.Alllatedetail, { headers: this._commonServices.getHeaders() });
	}

	getlatedetailbyid(id) {
		return this._http.get(this._links.latedetailbyid + id, { headers: this._commonServices.getHeaders() });
	}

	getLatedetailwhichareunpaidbyemployeeid(employeeid) {
		return this._http.get(this._links.latedetailwhichareunpaidbyemployeeid + employeeid, { headers: this._commonServices.getHeaders() });
	}

	getAtedetailbyemployeeid(employeeid) {
		return this._http.get(this._links.atedetailbyemployeeid + employeeid, { headers: this._commonServices.getHeaders() });
	}

}
