import { Category } from './../../../models/Category';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Services } from '../../../models/services';
import { CommonService } from '../../../Services/common.service';
import { CategoryService } from '../../../Services/product.service';
import { ServiceService } from '../../../Services/service.service';

@Component({
	selector: 'kt-service',
	templateUrl: './service.component.html'
})
export class ServiceComponent implements OnInit {
	Serviceform: FormGroup;
	hideupdate: boolean;
	hide: boolean;
	CategoryList: any[] = [];
	uploadfile = []
	files: any;

	constructor(private fb: FormBuilder, private _common: CommonService, private _CategoryService: CategoryService,
		public dialogref: MatDialogRef<ServiceComponent>, private _ServicesService: ServiceService,
		@Inject(MAT_DIALOG_DATA) public data: Services) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
		this.getAllCategory();
	}
	async getAllCategory() {
		this._CategoryService.getCategoryByType(2)
			.subscribe(res => {
				this.CategoryList = res as [];
			});
	}
	InitilizeForm() {
		this.Serviceform = this.fb.group({
			'name': ['', Validators.required],
			'id': ['', Validators.required],
			'charges': ['', Validators.required],
			'categoryId': ['', Validators.required],
			'description': ['', Validators.required],
		});
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Serviceform.controls['name'].setValue(this.data.name);
			this.Serviceform.controls['charges'].setValue(this.data.charges);
			this.Serviceform.controls['description'].setValue(this.data.description);
			this.Serviceform.controls['categoryId'].setValue(this.data.categoryId);
			this.getAllCategory()
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	UPdate() {
		this.Serviceform.controls['id'].setValue(this.data.id)
		let formData = new FormData()
		formData.append("serviceString", JSON.stringify(this.Serviceform.value))
		formData.append("file", this.files)
		this._ServicesService.EditRecord(formData, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Updated Successfully...")
			this.close()
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error)
		});
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Serviceform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	onSubmit() {
		let formData = new FormData()
		formData.append("serviceString", JSON.stringify(this.Serviceform.value))
		formData.append("file", this.files)
		this._ServicesService.SaveService(formData, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Saved Successfully...")
			this.close();
		}, (err: HttpErrorResponse) => {
			alert(err.error)
		});

	}

	close() {
		this.dialogref.close();
	}

	onSelect($event) {
		this.uploadfile = [];
		this.uploadfile.push($event.target.files[0]);
		if (this.uploadfile.length > 1) {
			alert('Only Single Image Is Allowed..')
			return;
		}
		else {
			this.files = this.uploadfile[0];
		}
	}
}
