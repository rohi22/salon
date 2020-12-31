import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllProduct() {
		return this._http.get(this._links.AllProduct, { headers: this._commonServices.getHeaders() });
	}

	getProductByBranch(branchid) {
		return this._http.get(this._links.ProductByBranch + branchid, { headers: this._commonServices.getHeaders() });
	}

	getProductByID(id) {
		return this._http.get(this._links.ProductByID + id, { headers: this._commonServices.getHeaders() });
	}

	getProductBYImageFile(file) {
		return this._http.get(this._links.ProductBYImageFile + file, { headers: this._commonServices.getHeaders() });
	}

	SaveProduct(body, headers) {
		return this._http.post(this._links.PostProduct, body, headers);
	}

	EditProduct(body, header) {
		return this._http.put(this._links.PutProduct, body, header);
	}

	DeleteProduct(id, headers) {
		return this._http.delete(this._links.DeleteProduct + id, headers);
	}
}
