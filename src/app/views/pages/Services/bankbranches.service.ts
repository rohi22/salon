import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class BankbranchesService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllbankbranch() {
		return this._http.get(this._links.Allbankbranch, { headers: this._commonServices.getHeaders() });
	}

	getBankbranchByID(id) {
		return this._http.get(this._links.BankbranchByID + id, { headers: this._commonServices.getHeaders() });
	}

	getBankbranchByBankID(branchid) {
		return this._http.get(this._links.BankbranchByBankID + branchid, { headers: this._commonServices.getHeaders() });
	}

	SaveBankBranch(body, headers) {
		return this._http.post(this._links.Postbankbranch, body, headers);
	}

	EditBankBranch(id, body, header) {
		return this._http.put(this._links.Putbankbranch + id, body, header);
	}

	DeleteBankBranch(id, headers) {
		return this._http.delete(this._links.Deletebankbranch + id, headers);
	}
}
