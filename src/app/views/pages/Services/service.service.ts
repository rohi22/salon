import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class ServiceService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }

	getServicesById(id) {
		return this._http.get(this._links.ServicesById + id, { headers: this._commonServices.getHeaders() });
	}

	getAllServices() {
		return this._http.get(this._links.AllServoices, { headers: this._commonServices.getHeaders() });
	}

	SaveService(body, headers) {
		return this._http.post(this._links.postServices, body, headers);
	}

	EditRecord(body, header) {
		return this._http.put(this._links.PutServices, body, header);
	}

	DeletRecord(id, headers) {
		return this._http.delete(this._links.DeleteServices + id, headers);
	}
}
