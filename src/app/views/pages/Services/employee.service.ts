import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class EmployeeService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getEmployeeByBatch(batchid) {
		return this._http.get(this._links.EmployeeByBatch + batchid, { headers: this._commonServices.getHeaders() });
	}

	getEmployeeByBranch(branchid) {
		return this._http.get(this._links.EmployeeByBranch + branchid, { headers: this._commonServices.getHeaders() });
	}

	getEmployeeByID(id) {
		return this._http.get(this._links.EmployeeByID + id, { headers: this._commonServices.getHeaders() });
	}

	getEmployeeBySerivce(service) {
		return this._http.get(this._links.EmployeeBySerivce + service, { headers: this._commonServices.getHeaders() });
	}

	getAllEmployee() {
		return this._http.get(this._links.AllEmployee, { headers: this._commonServices.getHeaders() });
	}

	SaveEmployee(body, headers) {
		return this._http.post(this._links.postEmployee, body, headers)
	}

	EditRecord(body, header) {
		return this._http.put(this._links.PutEmployee, body, header);
	}

	DeletRecord(id, headers) {
		return this._http.delete(this._links.DeletEmployee + id, headers);
	}
}
