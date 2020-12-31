import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class UnitsService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getUnitsbyId(id) {
		return this._http.get(this._links.UNITbyid + id, { headers: this._commonServices.getHeaders() });
	}

	getAllUnits() {
		return this._http.get(this._links.ALLunit, { headers: this._commonServices.getHeaders() });
	}

	SaveUNit(body, headers) {
		return this._http.post(this._links.PostUnit, body, headers)
	}

	EditUNit(body, header) {
		return this._http.put(this._links.PutUnit, body, header);
	}

	DeleteUNit(id, headers) {
		return this._http.delete(this._links.DeleteUnit + id, headers);
	}
}
