import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'kt-jbrand',
  templateUrl: './jbrand.component.html',
  styleUrls: ['./jbrand.component.scss']
})
export class JbrandComponent implements OnInit {

	form: FormGroup
	Brand = []
	readonly geturl = "http://172.16.0.69:5000/brand/get";
	readonly add = "http://172.16.0.69:5000/brand/add";
	readonly delete = "http://172.16.0.69:5000/brand/edit";
	readonly update = "http://172.16.0.69:5000/brand/delete";
	constructor(private http: HttpClient, private fb: FormBuilder) { }

	initform() {
		this.form = this.fb.group({
			brand_name: [],
			description: [],
			meta_description: [],
			meta_title: [],
			brand_id:[22],
			__v:[0]

		})

	}

	ngOnInit() {
		this.initform();
		this.getAttribute();
	}

	getAttribute() {

		this.http.get(this.geturl).subscribe((res: any[]) => {

			this.Brand = res['data'];
		})
	}

	post() {

		this.http.post(this.add, this.form.value).subscribe(res => {
			alert("Save")
			this.getAttribute();
			console.log(res)
		}, (err: HttpErrorResponse) => {
			alert(err.message);
		})
	}

}
