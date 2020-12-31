import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerRewardPoint } from '../../models/customerrewardpoint';
import { CommonService } from '../../Services/common.service';
import { CustomerrewardpointsService } from '../../Services/customerrewardpoints.service';

@Component({
	selector: 'kt-customerrewardpoint',
	templateUrl: './customerrewardpoint.component.html'
})
export class CustomerrewardpointComponent implements OnInit {
	CustomerRewardPOintform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<CustomerrewardpointComponent>, private _CustomerrewardpointsService: CustomerrewardpointsService,
		@Inject(MAT_DIALOG_DATA) public data: CustomerRewardPoint) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.CustomerRewardPOintform = this.fb.group({
			'rewardName': ['', Validators.required],
			'spendMoneyToGetPoint': ['', Validators.required],
			'eligiblePoint': ['', Validators.required],
			'priceOfEligibilePoint': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		debugger
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.CustomerRewardPOintform.controls['rewardName'].setValue(this.data.rewardName);
			this.CustomerRewardPOintform.controls['spendMoneyToGetPoint'].setValue(this.data.spendMoneyToGetPoint);
			this.CustomerRewardPOintform.controls['eligiblePoint'].setValue(this.data.eligiblePoint);
			this.CustomerRewardPOintform.controls['priceOfEligibilePoint'].setValue(this.data.priceOfEligibilePoint);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.CustomerRewardPOintform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	UPdate() {
		this.CustomerRewardPOintform.controls['id'].setValue(this.data.id)
		this._CustomerrewardpointsService.EditCustomerRewardPoint(this.CustomerRewardPOintform.value, this._common.getHeaerOptions()).subscribe(res => {
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
		debugger
		this._CustomerrewardpointsService.SaveCustomerRewardPoint(this.CustomerRewardPOintform.value, this._common.getHeaerOptions()).subscribe(res => {
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


