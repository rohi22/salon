import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class VendorbillService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllVendorBill() {
		return this._http.get(this._links.AllVendorBill, { headers: this._commonServices.getHeaders() });
	}

	getVendorBillBYID(id) {
		return this._http.get(this._links.VendorBillBYID + id, { headers: this._commonServices.getHeaders() });
	}

	getVendorBillByPurchaseorderId(poid) {
		return this._http.get(this._links.VendorBillByPurchaseorderId + poid, { headers: this._commonServices.getHeaders() });
	}

	getVendorBillByBranch(branchid) {
		return this._http.get(this._links.VendorBillByVBranch + branchid, { headers: this._commonServices.getHeaders() });
	}
}
