import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Department } from './department';
import { DepartmentService } from './department.service';

@Component({
	moduleId: module.id,
	selector: 'department',
	templateUrl: 'department.component.html'
})
export class DepartmentComponent implements OnInit {
	DepartmentList: any;
	token: any;
	departmentform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	constructor(private fb: FormBuilder, private _departmentservice: DepartmentService,
		public dialogref: MatDialogRef<DepartmentComponent>, @Inject(MAT_DIALOG_DATA) public data: Department) { }

	ngOnInit() {
		this.token = localStorage.getItem('token');
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.departmentform = this.fb.group({
			'departmentName': ['', Validators.required],
			'active': ['', Validators.required],
			'id': ['', Validators.required]
		})
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.departmentform.controls['departmentName'].setValue(this.data.departmentName);
			this.departmentform.controls['active'].setValue(this.data.active);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	UPdate() {
		debugger
		this.departmentform.controls['id'].setValue(this.data.id)
		this._departmentservice.EditRecord(this.departmentform.value, this.getheader()).subscribe(res => {
			console.log(res);
			alert("Update")
			this.close()
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error)
			this.close()
		});
	}

	onSubmit() {
debugger
		this._departmentservice.AddRecord(this.departmentform.value, this.getheader()).subscribe(res => {
			console.log(res);
			alert("Save")
			this.close();
		});

	}

	getheader() {
		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: JSON.parse(localStorage.getItem("token")),
			}),
		};

		return httpOptions;
	}

	close() {
		this.dialogref.close();
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.departmentform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

}
