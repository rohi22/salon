import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { error } from 'protractor';
import { LateDeduction } from '../../../models/latededuction';
import { CommonService } from '../../../Services/common.service';
import { LateattendancedeductionService } from '../../../Services/lateattendancededuction.service';
import { AbsentComponent } from '../absent/absent.component';

@Component({
	selector: 'kt-lateattendance',
	templateUrl: './lateattendance.component.html'
})
export class LateattendanceComponent implements OnInit {
	LateAttendanceDeductionform: FormGroup;
	hide: boolean;
	hideupdate: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService,
		private _AbsentdeductionService: LateattendancedeductionService,
		public dialogref: MatDialogRef<AbsentComponent>,
		@Inject(MAT_DIALOG_DATA) public data: LateDeduction) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.LateAttendanceDeductionform = this.fb.group({
			'deductionAmount': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {

		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.LateAttendanceDeductionform.controls['deductionAmount'].setValue(this.data.deductionAmount);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.LateAttendanceDeductionform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	UPdate() {

		this.LateAttendanceDeductionform.controls['id'].setValue(this.data.id)
		this._AbsentdeductionService.EditLateAttendanceDeduction(this.LateAttendanceDeductionform.value, this._common.getHeaerOptions()).subscribe(res => {
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

		this._AbsentdeductionService.SaveLateAttendanceDeduction(this.LateAttendanceDeductionform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			this.close();
		}, (error: HttpErrorResponse) => {
			alert(error.error)
		});

	}

	close() {
		this.dialogref.close();
	}
}
