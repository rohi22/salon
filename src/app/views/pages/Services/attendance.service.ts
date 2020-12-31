import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class AttendanceService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getallattendance() {
		return this._http.get(this._links.allattendance, { headers: this._commonServices.getHeaders() });
	}

	getTickabsentattendancebyattendanceid(id) {
		return this._http.get(this._links.Tickabsentattendancebyattendanceid + id, { headers: this._commonServices.getHeaders() });
	}

	getTickPresentbyattendanceid() {
		return this._http.get(this._links.TickPresentbyattendanceid, { headers: this._commonServices.getHeaders() });
	}

	getattendancebyattendanceid(id) {
		return this._http.get(this._links.attendancebyattendanceid + id, { headers: this._commonServices.getHeaders() });
	}

}
