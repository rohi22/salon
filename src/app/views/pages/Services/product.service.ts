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

	SaveProduct(files, body, headers) {
		let form = new FormData
		let file = files
		delete body.files;
		form.append("productString", JSON.stringify(body));
		form.append("files", file);
		return this._http.post(this._links.PostProduct, form, headers);
	}

	EditProduct(files, body, header) {
		let form = new FormData
		let file = null
		if (files != null) {
			file = files
		}
		delete body.files;
		form.append("productString", JSON.stringify(body));
		form.append("files", file);
		return this._http.post(this._links.PutProduct,form, header);
	}

	DeleteProduct(id, headers) {
		return this._http.delete(this._links.DeleteProduct + id, headers);
	}
}
