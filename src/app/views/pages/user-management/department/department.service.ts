import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from '../../Services/APILinks';
import { CommonService } from '../../Services/common.service';

@Injectable({
	providedIn: 'root'
})
export class DepartmentService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonService: CommonService) { }

	getDepartment() {
		// let header = new HttpHeaders().set("Authorization", JSON.parse(localStorage.getItem("token")));
		return this._http.get(this._links.department, { headers: this._commonService.getHeaders() });
	}

	getDepartmentById(id) {
		return this._http.get(this._links.departmentbyId + id, { headers: this._commonService.getHeaders() });
	}

	getDepartmentByBranch(branchid) {
		return this._http.get(this._links.departmentbybranchId + branchid, { headers: this._commonService.getHeaders() });
	}

	AddRecord(body, header) {
		return this._http.post(this._links.PostDepartment, body, header);
	}

	EditRecord(body, header) {
		return this._http.put(this._links.PutDepartment, body, header);
	}

	DeletRecord(id, headers) {
		return this._http.delete(this._links.DeleteDepartment + id, headers);
	}
}
