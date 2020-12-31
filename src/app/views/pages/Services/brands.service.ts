import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class BrandsService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllBrands() {
		return this._http.get(this._links.AllBrand, { headers: this._commonServices.getHeaders() });
	}

	getBrandByActive(active: boolean) {
		return this._http.get(this._links.BrandByActive + active, { headers: this._commonServices.getHeaders() });
	}

	getBrandByID(id) {
		return this._http.get(this._links.BrandBYID + id, { headers: this._commonServices.getHeaders() });
	}

	SaveBrand(body, headers) {
		return this._http.post(this._links.PostBRand, body, headers);
	}

	EditBrand(body, header) {
		return this._http.put(this._links.PutBRand, body, header);
	}

	DeleteBrand(id, headers) {
		return this._http.delete(this._links.DeleteBRand + id, headers);
	}
}
