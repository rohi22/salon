import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Brand } from '../../models/brand';
import { BrandsService } from '../../Services/brands.service';
import { CommonService } from '../../Services/common.service';

@Component({
	selector: 'kt-brand',
	templateUrl: './brand.component.html'
})
export class BrandComponent implements OnInit {
	Brandform: FormGroup;
	hide: boolean;
	hideupdate: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService, private _BrandsService: BrandsService,
		public dialogref: MatDialogRef<BrandComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Brand) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Brandform = this.fb.group({
			'brand': ['', Validators.required],
			'id': ['', Validators.required],
			'active': ['', Validators.required],
		});
	}

	EditMOdal() {

		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Brandform.controls['brand'].setValue(this.data.brand);
			this.Brandform.controls['active'].setValue(this.data.active);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Brandform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}



	UPdate() {
		this.Brandform.controls['id'].setValue(this.data.id)
		this._BrandsService.EditBrand(this.Brandform.value, this.getheader()).subscribe(res => {
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

		this._BrandsService.SaveBrand(this.Brandform.value, this.getheader()).subscribe(res => {
			console.log(res);
			this.close();
		}, (err: HttpErrorResponse) => {
			alert(err.message)
		});

	}

	getheader() {
		let headers = localStorage.getItem("Authorization")
		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: localStorage.getItem("Authorization"),
			}),
		};
		return httpOptions;
	}

	close() {
		this.dialogref.close();
	}
}
