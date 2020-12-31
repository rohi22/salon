import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class BatchService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllBatch() {
		return this._http.get(this._links.AllBAtch, { headers: this._commonServices.getHeaders() });
	}

	getBatchByID(id) {
		return this._http.get(this._links.BatchByID + id, { headers: this._commonServices.getHeaders() });
	}

	SaveBatch(body, headers) {
		return this._http.post(this._links.postBatch, body, headers);
	}

	EditRecord(body, header) {
		return this._http.put(this._links.putBatch, body, header);
	}

	DeletRecord(id, headers) {
		return this._http.delete(this._links.DeleteBatch + id, headers);
	}
}
