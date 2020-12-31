import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Sales } from '../../models/sales';
import { CommonService } from '../../Services/common.service';
import { ProfitService } from '../../Services/profit.service';

@Component({
  selector: 'kt-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.scss']
})
export class ProfitComponent implements OnInit {
	Profitform: FormGroup;
	hide: boolean;
	hideupdate: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService, private _ProfitService: ProfitService,
		public dialogref: MatDialogRef<ProfitComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Sales) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Profitform = this.fb.group({
			'id': ['', Validators.required],
			'startDate': ['', Validators.required],
			'endDate': ['', Validators.required],
		});
	}

	EditMOdal() {

		debugger
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
		debugger
		this._ProfitService.PostProfit(this.Profitform.value, this.getheader()).subscribe(res => {
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
