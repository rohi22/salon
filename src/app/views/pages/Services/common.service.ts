import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';

@Injectable({
	providedIn: 'root'
})
export class CommonService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonService: CommonService) { }

	getHeaders() {
		let token = localStorage.getItem("Authorization");
		let header = new HttpHeaders().set("Authorization", token);
		return header;
	}

	getHeaerOptions() {
		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: localStorage.getItem("Authorization"),
			}),
		};

		return httpOptions;
	}

	getCountry() {
		let header = new HttpHeaders().set("Authorization", localStorage.getItem("Authorization"));
		return this._http.get(this._links.allcountry, { headers: header });
	}

	getCountryByID(id) {
		let header = new HttpHeaders().set("Authorization", localStorage.getItem("Authorization"));
		return this._http.get(this._links.allcountry + id, { headers: header });
	}

	getCountryByName(name: string) {
		let header = new HttpHeaders().set("Authorization", localStorage.getItem("Authorization"));
		return this._http.get(this._links.allcountry + name, { headers: header });
	}

	getAllCity() {
		let header = new HttpHeaders().set("Authorization", localStorage.getItem("Authorization"));
		return this._http.get(this._links.allcity, { headers: header });
	}

	getAllArea() {
		let header = new HttpHeaders().set("Authorization", localStorage.getItem("Authorization"));
		return this._http.get(this._links.allarea, { headers: header });
	}

	getcitybyStateID(stateid) {
		let header = new HttpHeaders().set("Authorization", localStorage.getItem("Authorization"));
		return this._http.get(this._links.citybyStateID + stateid, { headers: header });
	}

	getcityByID(id) {
		let header = new HttpHeaders().set("Authorization", localStorage.getItem("Authorization"));
		return this._http.get(this._links.cityByID + id, { headers: header });
	}

	getstatebyCountryId(countryid) {
		const CountryID = Number(countryid);
		let header = new HttpHeaders().set("Authorization", localStorage.getItem("Authorization"));
		return this._http.get(this._links.statebyCountryId + CountryID, { headers: header });
	}

	getstateById(id) {
		let header = new HttpHeaders().set("Authorization", localStorage.getItem("Authorization"));
		return this._http.get(this._links.stateById + id, { headers: header });
	}

	getareaByCityID(cityid) {
		const AreaID = Number(cityid);
		let header = new HttpHeaders().set("Authorization", localStorage.getItem("Authorization"));
		return this._http.get(this._links.areaByCityID + AreaID, { headers: header });
	}

	getareaById(id) {
		let header = new HttpHeaders().set("Authorization", localStorage.getItem("Authorization"));
		return this._http.get(this._links.areaById + id, { headers: header });
	}

	getAllState() {
		let header = new HttpHeaders().set("Authorization", localStorage.getItem("Authorization"));
		return this._http.get(this._links.allstate, { headers: header });
	}

	EditCountry(body, header) {
		return this._http.put(this._links.PutCountry, body, header);
	}

	DeletCountry(id, headers) {
		return this._http.delete(this._links.DeleteCountry + id, headers);
	}

	EditCity(id, body, header) {
		return this._http.put(this._links.PutCity + id, body, header);
	}

	DeletCity(id, headers) {
		return this._http.delete(this._links.DeleteCity + id, headers);
	}

	EditArea(body, header) {
		return this._http.put(this._links.PutArea, body, header);
	}

	DeleteArea(id, headers) {
		return this._http.delete(this._links.DeleteArea + id, headers);
	}

	EditState(body, header) {
		return this._http.put(this._links.PutState, body, header);
	}

	DeletState(id, headers) {
		return this._http.delete(this._links.DeleteState + id, headers);
	}
}
