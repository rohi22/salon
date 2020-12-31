import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from '../../../Services/APILinks';

@Injectable({
  providedIn: 'root'
})
export class StateService {

	constructor(private _http: HttpClient, private _links: ApiLinks) { }

	SaveState(body, header) {
		return this._http.post(this._links.poststate, body, header);
	}
}
