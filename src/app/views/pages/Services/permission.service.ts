import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class PermissionService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getPermissionByBranch(branchid) {
		return this._http.get(this._links.PermissionByBranch + branchid, { headers: this._commonServices.getHeaders() });
	}

	getPermissionByGeneric(generic) {
		return this._http.get(this._links.PermissionByGeneric + generic, { headers: this._commonServices.getHeaders() });
	}

	getPermissionByID(id) {
		return this._http.get(this._links.PermissionByID + id, { headers: this._commonServices.getHeaders() });
	}

	getPermissionbyDesignation(designationid) {
		return this._http.get(this._links.PermissionbyDesignation + designationid, { headers: this._commonServices.getHeaders() });
	}

	getAllPermission() {
		return this._http.get(this._links.AllPermission, { headers: this._commonServices.getHeaders() });
	}

	Savepermission(body, headers) {
		return this._http.post(this._links.postpermisoin, body, headers)
	}

	EditRecord(body, header) {
		return this._http.put(this._links.Putpermisoin, body, header);
	}

	DeletRecord(id, headers) {
		return this._http.delete(this._links.Deletepermisoin + id, headers);
	}

}

