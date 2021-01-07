import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AbsentdeductionService {
	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllabsent() {
		return this._http.get(this._links.Allabsent, { headers: this._commonServices.getHeaders() });
	}

	getAbsentbyid(id) {
		return this._http.get(this._links.absentbyid + id, { headers: this._commonServices.getHeaders() });
	}

	SaveRecord(body, header) {
		debugger
		return this._http.post(this._links.POstAbsent, body, header);
	}

	EditRecord(body, header) {
		return this._http.put(this._links.PutAbsentDed, body, header);
	}

	DeletRecord(id, headers) {
		return this._http.delete(this._links.DeleteAbsentDed + id, headers);
	}

}
