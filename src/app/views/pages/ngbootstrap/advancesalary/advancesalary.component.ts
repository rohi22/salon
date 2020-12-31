import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdvanceSalary } from '../../models/advancesalary';
import { AdvancesalaryService } from '../../Services/advancesalary.service';
import { CommonService } from '../../Services/common.service';

@Component({
  selector: 'kt-advancesalary',
  templateUrl: './advancesalary.component.html'
})
export class AdvancesalaryComponent implements OnInit {
	AdvancedSalaryform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	CustomerList = []
	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<AdvancesalaryComponent>, private _AdvancesalaryService: AdvancesalaryService,
		@Inject(MAT_DIALOG_DATA) public data: AdvanceSalary) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.AdvancedSalaryform = this.fb.group({
			'maxPercentage': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		debugger
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.AdvancedSalaryform.controls['maxPercentage'].setValue(this.data.maxPercentage);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	UPdate() {
		this.AdvancedSalaryform.controls['id'].setValue(this.data.id)
		this._AdvancesalaryService.EditAdvancedSalary(this.AdvancedSalaryform.value, this._common.getHeaerOptions()).subscribe(res => {
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
		this._AdvancesalaryService.SaveAdvancedSalary(this.AdvancedSalaryform.value, this._common.getHeaerOptions()).subscribe(res => {
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

