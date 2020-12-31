import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from '../../../Services/APILinks';
import { CommonService } from '../../../Services/common.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonService: CommonService) { }

	SaveCountry(body, header) {
		return this._http.post(this._links.postcountry, body, header);
	}
}
