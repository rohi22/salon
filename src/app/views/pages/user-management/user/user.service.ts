import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from '../../Services/APILinks';
import { CommonService } from '../../Services/common.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonService: CommonService) { }

	getAllUsers() {
		let header = new HttpHeaders().set("Authorization", localStorage.getItem("Authorization"));
		return this._http.get(this._links.users, { headers: this._commonService.getHeaders() });
	}

	getUserById(id) {
		return this._http.get(this._links.usersbyId + id, { headers: this._commonService.getHeaders() });
	}

	getUserByBranchId(branchid) {
		return this._http.get(this._links.usersbyBranchId + branchid, { headers: this._commonService.getHeaders() });
	}

	getUserByName(name: string) {
		return this._http.get(this._links.usersbyName + name, { headers: this._commonService.getHeaders() });
	}

	AddRecord(body, header) {
		return this._http.post(this._links.AddUser, body, header);
	}

	EditUser(body, header) {
		return this._http.put(this._links.PutUser, body, header);
	}

	DeletUser(id, headers) {
		return this._http.delete(this._links.DeleteUser + id, headers);
	}
}
