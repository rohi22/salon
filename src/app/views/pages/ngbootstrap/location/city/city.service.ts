import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from '../../../Services/APILinks';
import { CommonService } from '../../../Services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonService: CommonService) { }

	SaveCity(body, header) {
		return this._http.post(this._links.postcity, body, header);
	}
}
