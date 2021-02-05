import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { CommonService } from '../../Services/common.service';
import { BranchService } from './branch.service';
import { Branch } from './branchclass';

@Component({
	moduleId: module.id,
	selector: 'branch',
	templateUrl: 'branch.component.html'
})
export class BranchComponent implements OnInit {
	Branchform: FormGroup;
	CountryList = [];
	CityList = [];
	StateList = [];
	AreaList = [];
	hide: boolean;
	hideupdate: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService, private _branchService: BranchService,
		public dialogref: MatDialogRef<BranchComponent>, private router: Router,
		@Inject(MAT_DIALOG_DATA) public data: Branch) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.getAllCountry();
		this.EditMOdal();
		if (this.data && this.data !== undefined) {
			await this.getStateByCountry(this.data.countryId);
			await this.getCityByState(this.data.stateId);
			await this.getAreaByCity(this.data.cityId);
		}
	}

	InitilizeForm() {
		this.Branchform = this.fb.group({
			'name': ['', Validators.required],
			'id': ['', Validators.required],
			'countryId': ['', Validators.required],
			'address': ['', Validators.required],
			'isActive': ['', Validators.required],
			'cityId': ['', Validators.required],
			'areaId': ['', Validators.required],
			'stateId': ['', Validators.required]
		});
	}

	EditMOdal() {

		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Branchform.controls['name'].setValue(this.data.name);
			this.Branchform.controls['countryId'].setValue(this.data.countryId);
			this.Branchform.controls['address'].setValue(this.data.address);
			this.Branchform.controls['isActive'].setValue(this.data.active);
			this.Branchform.controls['cityId'].setValue(this.data.cityId);
			this.Branchform.controls['areaId'].setValue(this.data.areaId);
			this.Branchform.controls['stateId'].setValue(this.data.stateId);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Branchform.controls[controlName];
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

	UPdate() {
		this.Branchform.controls['id'].setValue(this.data.id)
		this._branchService.EditRecord(this.Branchform.value, this.getheader()).subscribe(res => {
			console.log(res);
			alert("Update")
			this.close()
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error.message)
			this.close()
		});
	}
	onSubmit() {
		this._branchService.AddRecord(this.Branchform.value, this.getheader()).subscribe(res => {
			console.log(res);
			this.close();
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
