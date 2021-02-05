import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Sales } from '../../models/sales';
import { CommonService } from '../../Services/common.service';
import { SalesService } from '../../Services/sales.service';
import { BranchComponent } from '../../user-management/branch/branch.component';

@Component({
	selector: 'kt-sales',
	templateUrl: './sales.component.html',
	styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
	Salesform: FormGroup;
	hide: boolean;
	hideupdate: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService, private _SalesService: SalesService,
		public dialogref: MatDialogRef<BranchComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Sales) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Salesform = this.fb.group({
			'id': ['', Validators.required],
			'startDate': ['', Validators.required],
			'endDate': ['', Validators.required],
		});
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			// this.Branchform.controls['countryId'].setValue(this.data.countryId);
			// this.Branchform.controls['address'].setValue(this.data.address);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	onSubmit() {
		this._SalesService.postSales(this.Salesform.value, this.getheader()).subscribe(res => {
			console.log(res);
			alert("Save")
			this.close();
		}, (err: HttpErrorResponse) => {
			alert(err.message);
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
