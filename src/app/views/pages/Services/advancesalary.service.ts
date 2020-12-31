import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class AdvancesalaryService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	GetAdvancedSalary() {
		return this._http.get(this._links.GetAdvancedSalary, { headers: this._commonServices.getHeaders() });
	}

	SaveAdvancedSalary(body, headers) {
		return this._http.post(this._links.PostAdvancedSalary, body, headers);
	}

	EditAdvancedSalary(body, header) {
		return this._http.put(this._links.PutAdvancedSalary, body, header);
	}

	DeleteAdvancedSalary(id, headers) {
		return this._http.delete(this._links.DeleteAdvancedSalary + id, headers);
	}
}
