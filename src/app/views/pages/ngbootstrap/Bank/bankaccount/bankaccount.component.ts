import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BankAccount } from '../../../models/bankaccout';
import { BankaccountService } from '../../../Services/bankaccount.service';
import { BankbranchesService } from '../../../Services/bankbranches.service';
import { CommonService } from '../../../Services/common.service';
import { UsertypeService } from '../../../Services/usertype.service';

@Component({
	selector: 'kt-bankaccount',
	templateUrl: './bankaccount.component.html'
})
export class BankaccountComponent implements OnInit {
	BankAccountform: FormGroup;
	BankBranchList = [];
	UserTypeList = [];
	hideupdate: boolean;
	hide: boolean;
	constructor(private fb: FormBuilder, private _common: CommonService, private _BankaccountService: BankaccountService,
		public dialogref: MatDialogRef<BankaccountComponent>, private _BankbranchesService: BankbranchesService,
		private _userTYpe: UsertypeService,
		@Inject(MAT_DIALOG_DATA) public data: BankAccount) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
		await this.GetAllBankBranch();
		await this.GetUserType();
	}

	InitilizeForm() {
		this.BankAccountform = this.fb.group({
			'accountTitle': ['', Validators.required],
			'bankBranchId': ['', Validators.required],
			'bankTitle': ['', Validators.required],
			'userType': ['', Validators.required],
			'branchCode': ['', Validators.required],
			'accountNumber': ['', Validators.required],
			'ibanNumber': ['', Validators.required],
			'swiftcode': ['', Validators.required],
			'amount': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}


	EditMOdal() {

		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.BankAccountform.controls['accountTitle'].setValue(this.data.accountTitle);
			this.BankAccountform.controls['bankBranchId'].setValue(this.data.bankBranchId);
			this.BankAccountform.controls['bankTitle'].setValue(this.data.bankTitle);
			// this.BankAccountform.controls['userType'].setValue(this.data.us);
			this.BankAccountform.controls['branchCode'].setValue(this.data.branchCode);
			this.BankAccountform.controls['accountNumber'].setValue(this.data.accountNumber);
			this.BankAccountform.controls['ibanNumber'].setValue(this.data.ibanNumber);
			this.BankAccountform.controls['swiftcode'].setValue(this.data.swiftcode);
			this.BankAccountform.controls['amount'].setValue(this.data.amount);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	async GetAllBankBranch() {
		this._BankbranchesService.getAllbankbranch().subscribe(data => {
			this.BankBranchList = data as [];
		})
	}

	async GetUserType() {
		this._userTYpe.getUSerType().subscribe(data => {
			this.UserTypeList = data as [];
		})
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.BankAccountform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	UPdate() {

		this.BankAccountform.controls['id'].setValue(this.data.id)
		this._BankbranchesService.EditBankBranch(this.BankAccountform.controls['id'].value, this.BankAccountform.value, this.getheader()).subscribe(res => {
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

		this._BankaccountService.SaveBankAccount(this.BankAccountform.value, this.getheader()).subscribe(res => {
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
