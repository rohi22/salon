import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(private _http: HttpClient, private _apilinks: ApiLinks, private _common: CommonService) { }

	Login(email: string, password: string) {
		return this._http.post<any>(this._apilinks.LoginUrl, { email, password });
	}

	async uploadImage(data) {
		try {
			const res = this._http.post(this._apilinks.imageUploader, data,this._common.getHeaerOptions()).subscribe(res => {
				if (res) {
					console.log(res);
					alert("Image Upload Successfully.")
				} else {
					return;
				}
			});
		}
		catch (e) {
			console.log(`error: `, e);
		}
	}
}
