import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from '../../Services/APILinks';
import { CommonService } from '../../Services/common.service';

@Injectable({
	providedIn: 'root'
})
export class DesignationService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonService: CommonService) { }

	getDesignation() {
		return this._http.get(this._links.desingation, { headers: this._commonService.getHeaders() });
	}

	getDesignationById(id) {
		return this._http.get(this._links.desingationbyId + id, { headers: this._commonService.getHeaders() });
	}

	getDesignationbyName(name: string) {
		return this._http.get(this._links.desingationbyname + name, { headers: this._commonService.getHeaders() });
	}

	getDesignationbyDepartment(departmentid) {
		return this._http.get(this._links.desingationbydepartmentId + departmentid, { headers: this._commonService.getHeaders() });
	}

	AddRecord(body, header) {
		return this._http.post(this._links.AddDesignation, body, header);
	}

	EditRecord(body, header) {
		return this._http.put(this._links.PutDesignatoin, body, header);
	}

	DeletRecord(id, headers) {
		return this._http.delete(this._links.DeleteDesignation + id, headers);
	}


}


