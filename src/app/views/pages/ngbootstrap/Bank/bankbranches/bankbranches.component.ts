import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BankBranch } from '../../../models/bankbranch';
import { BankService } from '../../../Services/bank.service';
import { BankbranchesService } from '../../../Services/bankbranches.service';
import { CommonService } from '../../../Services/common.service';

@Component({
	selector: 'kt-bankbranches',
	templateUrl: './bankbranches.component.html'
})
export class BankbranchesComponent implements OnInit {

	BankBranchform: FormGroup;
	BankList = [];
	CountryList = [];
	CityList = [];
	StateList = [];
	AreaList = [];
	hideupdate: boolean;
	hide: boolean;
	constructor(private fb: FormBuilder, private _common: CommonService, private _BankbranchesService: BankbranchesService,
		public dialogref: MatDialogRef<BankbranchesComponent>, private _bankSerivce: BankService,
		@Inject(MAT_DIALOG_DATA) public data: BankBranch) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
		await this.GetAllBank();
		await this.getAllCountry();
		if (this.data && this.data !== undefined) {
			await this.getStateByCountry(this.data.countryId);
			await this.getCityByState(this.data.stateId);
			await this.getAreaByCity(this.data.cityId);
		}
	}

	InitilizeForm() {
		this.BankBranchform = this.fb.group({
			'branchCode': ['', Validators.required],
			'id': ['', Validators.required],
			'bankId': ['', Validators.required],
			'countryId': ['', Validators.required],
			'stateId': ['', Validators.required],
			'cityId': ['', Validators.required],
			'areaId': ['', Validators.required],
		});
	}


	EditMOdal() {
		debugger
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.BankBranchform.controls['branchCode'].setValue(this.data.branchCode);
			this.BankBranchform.controls['bankId'].setValue(this.data.bankId);
			this.BankBranchform.controls['countryId'].setValue(this.data.countryId);
			this.BankBranchform.controls['stateId'].setValue(this.data.stateId);
			this.BankBranchform.controls['cityId'].setValue(this.data.cityId);
			this.BankBranchform.controls['areaId'].setValue(this.data.areaId);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	async GetAllBank() {
		this._bankSerivce.getAllBank().subscribe(data => {
			this.BankList = data as [];
		})
	}

	async getAllCountry() {
		this._common.getCountry().subscribe(data => {
			this.CountryList = data as [];
		})
	}

	async getStateByCountry(countryid) {
		this._common.getstatebyCountryId(countryid).subscribe(data => {
			this.StateList = data as [];
		})
	}

	async getCityByState(stateid) {
		this._common.getcitybyStateID(stateid).subscribe(data => {
			this.CityList = data as [];
		})
	}

	async getAreaByCity(cityid) {
		this._common.getareaByCityID(cityid).subscribe(data => {
			this.AreaList = data as [];
		})
	}


	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.BankBranchform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	UPdate() {
		debugger
		this.BankBranchform.controls['id'].setValue(this.data.id)
		this._BankbranchesService.EditBankBranch(this.BankBranchform.controls['id'].value, this.BankBranchform.value, this.getheader()).subscribe(res => {
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
		this._BankbranchesService.SaveBankBranch(this.BankBranchform.value, this.getheader()).subscribe(res => {
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
