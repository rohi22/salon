import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Batch } from '../../../models/batch';
import { BatchService } from '../../../Services/batch.service';
import { CommonService } from '../../../Services/common.service';

@Component({
	selector: 'kt-batch',
	templateUrl: './batch.component.html'
})
export class BatchComponent implements OnInit {
	Batchform: FormGroup;
	hide: boolean;
	hideupdate: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<BatchComponent>, private _BatchService: BatchService,
		@Inject(MAT_DIALOG_DATA) public data: Batch) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Batchform = this.fb.group({
			'description': ['', Validators.required],
			'startingTime': ['', Validators.required],
			'endingTime': ['', Validators.required],
			'bufferTime': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Batchform.controls['description'].setValue(this.data.description);
			this.Batchform.controls['startingTime'].setValue(this.data.startingTime);
			this.Batchform.controls['endingTime'].setValue(this.data.endingTime);
			this.Batchform.controls['bufferTime'].setValue(this.data.bufferTime);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Batchform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	UPdate() {
		this.Batchform.controls['id'].setValue(this.data.id)
		this._BatchService.EditRecord(this.Batchform.value, this._common.getHeaerOptions()).subscribe(res => {
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
		this._BatchService.SaveBatch(this.Batchform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
		});
		this.close();
	}

	close() {
		this.dialogref.close();
	}
}
