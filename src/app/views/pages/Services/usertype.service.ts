import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class UsertypeService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getUserTYpeBYID(id) {
		return this._http.get(this._links.UserTYpeBYID + id, { headers: this._commonServices.getHeaders() });
	}

	getUSerType() {
		return this._http.get(this._links.AllUSerType, { headers: this._commonServices.getHeaders() });
	}
}
