import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class AccounttypeService {
	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllAccountTYpe() {
		return this._http.get(this._links.AllAccountTYpe, { headers: this._commonServices.getHeaders() });
	}

	getAccounttypeBYID(id) {
		return this._http.get(this._links.AccounttypeBYID + id, { headers: this._commonServices.getHeaders() });
	}

	SaveAccounttype(body, headers) {
		return this._http.post(this._links.PostAccounttype, body, headers);
	}

	EditAccounttype(body, header) {
		return this._http.put(this._links.PutAccounttype, body, header);
	}

	DeleteAccounttype(id, headers) {
		debugger
		return this._http.delete(this._links.DeleteAccounttype + id, headers);
	}
}
