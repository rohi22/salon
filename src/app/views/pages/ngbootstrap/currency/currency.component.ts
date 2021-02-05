import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Currency } from '../../models/currency';
import { CommonService } from '../../Services/common.service';
import { CurrencyService } from '../../Services/currency.service';

@Component({
  selector: 'kt-currency',
  templateUrl: './currency.component.html'
})
export class CurrencyComponent implements OnInit {
	Currencyform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	CustomerList = []
	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<CurrencyComponent>, private _CurrencyService: CurrencyService,
		@Inject(MAT_DIALOG_DATA) public data: Currency) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Currencyform = this.fb.group({
			'currencyName': ['', Validators.required],
			'currencySymbol': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {

		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Currencyform.controls['currencySymbol'].setValue(this.data.currencySymbol);
			this.Currencyform.controls['currencyName'].setValue(this.data.currencyName);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	UPdate() {
		this.Currencyform.controls['id'].setValue(this.data.id)
		this._CurrencyService.EditCurrency(this.Currencyform.value, this._common.getHeaerOptions()).subscribe(res => {
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

		this._CurrencyService.SaveCurrency(this.Currencyform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			this.close();
			alert("Save")
		}, (err: HttpErrorResponse) => {
			alert(err.message)
		});
	}

	close() {
		this.dialogref.close();
	}
}
