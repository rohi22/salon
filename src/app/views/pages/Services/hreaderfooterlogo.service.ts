import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinks } from './APILinks';
import { CommonService } from './common.service';

@Injectable({
	providedIn: 'root'
})
export class HreaderfooterlogoService {

	constructor(private _http: HttpClient, private _links: ApiLinks, private _commonServices: CommonService) { }

}
