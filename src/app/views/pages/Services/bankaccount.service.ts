import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class BankaccountService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllbankaccount() {
		return this._http.get(this._links.Allbankaccount, { headers: this._commonServices.getHeaders() });
	}

	getBankaccountById(id) {
		return this._http.get(this._links.bankaccountById + id, { headers: this._commonServices.getHeaders() });
	}

	getBankaccountBYBranchID(branchid) {
		return this._http.get(this._links.bankaccountBYBranchID + branchid, { headers: this._commonServices.getHeaders() });
	}

	SaveBankAccount(body, headers) {
		return this._http.post(this._links.PostBankAcount, body, headers);
	}

	// EditBankAccount(id, body, header) {
	// 	return this._http.put(this._links.PutBank + id, body, header);
	// }

	// DeleteBankAccount(id, headers) {
	// 	return this._http.delete(this._links.DeleteBank + id, headers);
	// }
}
