import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'kt-attribute',
	templateUrl: './attribute.component.html',
	styleUrls: ['./attribute.component.scss']
})
export class AttributeComponent implements OnInit {
	Attribute = []
	form: FormGroup
	readonly geturl = "http://172.16.0.69:5000/attribute/get";
	readonly add = "http://172.16.0.69:5000/attribute/add";
	readonly delete = "http://172.16.0.69:5000/attribute/edit";
	readonly update = "http://172.16.0.69:5000/attribute/delete";
	constructor(private http: HttpClient, private fb: FormBuilder) { }

	initform() {
		this.form = this.fb.group({
			attribute_name: [],
			status: [],
		})

	}
	ngOnInit() {
		this.initform();
		this.getAttribute();
	}

	getAttribute() {

		this.http.get(this.geturl).subscribe((res: any[]) => {

			this.Attribute = res['data'];
		}, (err: HttpErrorResponse) => {
			alert(err.message);
		})
	}

	post() {
		this.http.post(this.add, this.form.value).subscribe(res => {
			alert("Save")
			console.log(res)
		}, (err: HttpErrorResponse) => {
			alert(err.message);
		})
	}


}
