import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class LateattendancedeductionService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getGetAlllateAttendance() {
		return this._http.get(this._links.GetAlllateAttendance, { headers: this._commonServices.getHeaders() });
	}

	getLateattendancebyattendanceid(id) {
		return this._http.get(this._links.Getlateattendancebyattendanceid + id, { headers: this._commonServices.getHeaders() });
	}

	SaveLateAttendanceDeduction(body, headers) {
		return this._http.post(this._links.PostLateAttendanceDeducation, body, headers);
	}

	EditLateAttendanceDeduction(body, header) {
		return this._http.put(this._links.PutLateDed, body, header);
	}

	DeletLateAttendanceDeduction(id, headers) {
		return this._http.delete(this._links.DeleteLateDEd + id, headers);
	}
}
