import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiLinks } from '../../Services/APILinks';
import { CommonService } from '../../Services/common.service';

@Injectable({
	providedIn: 'root'
})
export class BranchService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonService: CommonService) { }

	getAllBranch() {
		return this._http.get(this._links.branch, { headers: this._commonService.getHeaders() });
	}

	getBranchById(Id) {
		return this._http.get(this._links.branchbyId + Id, { headers: this._commonService.getHeaders() });
	}

	getBranchByCountry(countryid) {
		return this._http.get(this._links.branchbycountry + countryid, { headers: this._commonService.getHeaders() });
	}

	AddRecord(body, header) {
		return this._http.post(this._links.PostBranch, body, header);
	}

	EditRecord(body, header) {
		return this._http.put(this._links.PutBranch, body, header);
	}

	DeletRecord(id, headers) {
		return this._http.delete(this._links.DeleteBranch + id, headers);
	}

}
