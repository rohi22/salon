import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class EmployeesalarydateService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllcustomsalarydate() {
		return this._http.get(this._links.Allcustomsalarydate, { headers: this._commonServices.getHeaders() });
	}

	getCustomsalarydateforadddate(date) {
		return this._http.get(this._links.customsalarydateforadddate + date, { headers: this._commonServices.getHeaders() });
	}

	getCustomsalarydatebyemployeeid(employeeid) {
		return this._http.get(this._links.customsalarydatebyemployeeid + employeeid, { headers: this._commonServices.getHeaders() });
	}
}
