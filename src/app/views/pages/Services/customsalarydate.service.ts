import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class CustomsalarydateService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }


	getAllcommonsalarydate() {
		return this._http.get(this._links.allcommonsalarydate, { headers: this._commonServices.getHeaders() });
	}
}
