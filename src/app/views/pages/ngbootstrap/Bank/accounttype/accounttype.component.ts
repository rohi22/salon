import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountType } from '../../../models/accounttype';
import { AccounttypeService } from '../../../Services/accounttype.service';
import { CommonService } from '../../../Services/common.service';

@Component({
	selector: 'kt-accounttype',
	templateUrl: './accounttype.component.html'
})
export class AccounttypeComponent implements OnInit {
	AccountTypeform: FormGroup;
	hideupdate: boolean;
	hide: boolean;
	constructor(private fb: FormBuilder, private _common: CommonService, public dialogref: MatDialogRef<AccounttypeComponent>,
		private _AccounttypeService: AccounttypeService, @Inject(MAT_DIALOG_DATA) public data: AccountType) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.AccountTypeform = this.fb.group({
			'id': ['', Validators.required],
			'accountType': ['', Validators.required],
		});
	}


	EditMOdal() {

		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.AccountTypeform.controls['accountType'].setValue(this.data.accountType);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.AccountTypeform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	UPdate() {

		this.AccountTypeform.controls['id'].setValue(this.data.id)
		this._AccounttypeService.EditAccounttype(this.AccountTypeform.value, this.getheader()).subscribe(res => {
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

		this._AccounttypeService.SaveAccounttype(this.AccountTypeform.value, this.getheader()).subscribe(res => {
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
