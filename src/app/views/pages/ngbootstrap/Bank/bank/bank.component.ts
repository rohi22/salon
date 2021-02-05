import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Bank } from '../../../models/bank';
import { BankService } from '../../../Services/bank.service';
import { CommonService } from '../../../Services/common.service';

@Component({
	selector: 'kt-bank',
	templateUrl: './bank.component.html'
})
export class BankComponent implements OnInit {
	Bankform: FormGroup;
	hide: boolean;
	hideupdate: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService, private _BankService: BankService,
		public dialogref: MatDialogRef<BankComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Bank) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Bankform = this.fb.group({
			'title': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {

		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Bankform.controls['title'].setValue(this.data.title);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Bankform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	UPdate() {
		this.Bankform.controls['id'].setValue(this.data.id)
		this._BankService.EditBank(this.Bankform.controls['id'].value,this.Bankform.value , this.getheader()).subscribe(res => {
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

		this._BankService.SaveBank(this.Bankform.value, this.getheader()).subscribe(res => {
			console.log(res);
			alert("Save")
			this.close();
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error)
			this.close()
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
