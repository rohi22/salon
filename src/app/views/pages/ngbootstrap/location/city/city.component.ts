import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { City } from '../../../models/city';
import { CommonService } from '../../../Services/common.service';
import { CityService } from './city.service';

@Component({
	selector: 'kt-city',
	templateUrl: './city.component.html'
})
export class CityComponent implements OnInit {
	Cityform: FormGroup;
	StateList = [];
	CountryList = [];
	hide: boolean;
	hideupdate: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<CityComponent>, private _city: CityService,
		@Inject(MAT_DIALOG_DATA) public data: City) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
		await this.getAllCountry();
		await this.getStateByCountry(this.Cityform.controls['countryid'].value)
	}

	InitilizeForm() {
		this.Cityform = this.fb.group({
			'active': ['', Validators.required],
			'name': ['', Validators.required],
			'stateId': ['', Validators.required],
			'countryid': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Cityform.controls['active'].setValue(this.data.active);
			this.Cityform.controls['name'].setValue(this.data.name);
			this.Cityform.controls['stateId'].setValue(this.data.stateId);
			this.Cityform.controls['countryid'].setValue(this.data.countryId);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Cityform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	async getAllCountry() {
		this._common.getCountry().subscribe(data => {
			this.CountryList = data as [];
		})
	}

	async getStateByCountry(countryid) {
		const countryID = Number(countryid);
		this._common.getstatebyCountryId(countryID).subscribe(data => {
			this.StateList = data as [];
		})
	}

	UPdate() {
		this.Cityform.controls['id'].setValue(this.data.id)
		this._common.EditCity(this.Cityform.controls['id'].value, this.Cityform.value, this._common.getHeaerOptions()).subscribe(res => {
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
		this._city.SaveCity(this.Cityform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
		});
		this.close();
	}

	close() {
		this.dialogref.close();
	}
}



