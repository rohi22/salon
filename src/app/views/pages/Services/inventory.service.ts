import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	GetAllINventory() {
		return this._http.get(this._links.AllINventory, { headers: this._commonServices.getHeaders() });
	}

	getInventorybyBranchAndProductId(id) {
		return this._http.get(this._links.inventorybyBranchAndProductId + id, { headers: this._commonServices.getHeaders() });
	}

	getInventoyrBYID(id) {
		return this._http.get(this._links.InventoyrBYID + id, { headers: this._commonServices.getHeaders() });
	}
}
