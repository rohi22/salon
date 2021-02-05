import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandsComponent implements OnInit {

	Brand = []
	readonly geturl = "http://172.16.0.69:5000/brand/get";
	constructor(private http: HttpClient) { }

	ngOnInit() {
		this.getAttribute();
	}

	getAttribute() {

		this.http.get(this.geturl).subscribe((res: any[]) => {

			this.Brand = res['data'];
		})
	}

}
