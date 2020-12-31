import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'kt-jproduct',
  templateUrl: './jproduct.component.html',
  styleUrls: ['./jproduct.component.scss']
})
export class JproductComponent implements OnInit {

	form: FormGroup
	Brand = []
	readonly geturl = "http://172.16.0.69:5000/product/get";
	readonly add = "http://172.16.0.69:5000/product/add";
	readonly delete = "http://172.16.0.69:5000/brand/edit";
	readonly update = "http://172.16.0.69:5000/brand/delete";
	constructor(private http: HttpClient, private fb: FormBuilder) { }

	initform() {
		this.form = this.fb.group({
			category_id: ['5f631bc16165e0219c886e56'],
			title: [],
			description: [],
			meta_description: [],
			meta_title:[],
			long_description:[],

			care: [],
			weight: [],
			created_at:[],
			__v:[0]

		})

	}

	ngOnInit() {
		this.initform();
		this.getAttribute();
	}

	getAttribute() {
		debugger
		this.http.get(this.geturl).subscribe((res: any[]) => {
			debugger
			this.Brand = res['data'];
		})
	}

	post() {
		debugger
		this.http.post(this.add, this.form.value).subscribe(res => {
			alert("Save")
			this.getAttribute();
			console.log(res)
		}, (err: HttpErrorResponse) => {
			alert(err.message);
		})
	}

}
