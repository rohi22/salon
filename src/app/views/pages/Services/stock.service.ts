import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class StockService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getStockByInventoryId(inventoryid) {
		return this._http.get(this._links.StockByInventoryId + inventoryid, { headers: this._commonServices.getHeaders() });
	}

	getStockbyspecficbranchProduct(branchid, productid) {
		return this._http.get(this._links.StockbyspecficbranchProduct + branchid + "/" + productid, { headers: this._commonServices.getHeaders() });
	}

	getAllStock() {
		return this._http.get(this._links.AllStock, { headers: this._commonServices.getHeaders() });
	}
}
