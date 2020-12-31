import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class AllowancesService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllAllownces() {
		return this._http.get(this._links.Allallowance, { headers: this._commonServices.getHeaders() });
	}

	getAllowancebyid(id) {
		return this._http.get(this._links.allowancebyid + id, { headers: this._commonServices.getHeaders() });
	}

	SaveAllownces(body, headers) {
		return this._http.post(this._links.PostAllowance, body, headers);
	}

	EditAllownces(body, header) {
		return this._http.put(this._links.PutAllownces, body, header);
	}

	DeletAllownces(id, headers) {
		return this._http.delete(this._links.DeleteAlownces + id, headers);
	}

}
