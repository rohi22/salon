import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Country } from '../../../models/country';
import { CommonService } from '../../../Services/common.service';
import { CountryService } from './country.service';
import { CountrylistComponent } from './countrylist/countrylist.component';

@Component({
	selector: 'kt-country',
	templateUrl: './country.component.html'
})
export class CountryComponent implements OnInit {

	Countryform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	private abc: CountrylistComponent;
	@ViewChild(CountrylistComponent, { static: true }) childcomp: CountrylistComponent;
	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<CountryComponent>, private _country: CountryService,
		@Inject(MAT_DIALOG_DATA) public data: Country) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Countryform = this.fb.group({
			'active': ['', Validators.required],
			'country': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Countryform.controls['active'].setValue(this.data.active);
			this.Countryform.controls['country'].setValue(this.data.country);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Countryform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	UPdate() {
		this.Countryform.controls['id'].setValue(this.data.id)
		this._common.EditCountry(this.Countryform.value, this._common.getHeaerOptions()).subscribe(res => {
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
		// this.childcomp.getAllCountry();
		this._country.SaveCountry(this.Countryform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Saved")
			debugger

		});
		this.close();
	}

	close() {
		this.dialogref.close();
	}
}
