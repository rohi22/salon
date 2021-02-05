import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbsentDeduction } from '../../../models/abentdeduction';
import { AbsentdeductionService } from '../../../Services/absentdeduction.service';
import { CommonService } from '../../../Services/common.service';

@Component({
	selector: 'kt-absent',
	templateUrl: './absent.component.html'
})
export class AbsentComponent implements OnInit {
	AbsentDeductionform: FormGroup;
	hide: boolean;
	hideupdate: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService,
		private _AbsentdeductionService: AbsentdeductionService,
		public dialogref: MatDialogRef<AbsentComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AbsentDeduction) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.AbsentDeductionform = this.fb.group({
			'deductionPercentage': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {

		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.AbsentDeductionform.controls['deductionPercentage'].setValue(this.data.deductionPercentage);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.AbsentDeductionform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	UPdate() {
		this.AbsentDeductionform.controls['id'].setValue(this.data.id)
		this._AbsentdeductionService.EditRecord(this.AbsentDeductionform.value, this._common.getHeaerOptions()).subscribe(res => {
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

		this._AbsentdeductionService.SaveRecord(this.AbsentDeductionform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("save")
			this.close();
		}, (err: HttpErrorResponse) => {
			alert(err.message)
		});

	}

	close() {
		this.dialogref.close();
	}
}
