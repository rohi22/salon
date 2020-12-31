import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerCoupon } from '../../models/customercoupon';
import { CommonService } from '../../Services/common.service';
import { CustomercouponService } from '../../Services/customercoupon.service';

@Component({
	selector: 'kt-customercoupon',
	templateUrl: './customercoupon.component.html'
})
export class CustomercouponComponent implements OnInit {
	CustomerCouponform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	CustomerList = []
	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<CustomercouponComponent>, @Inject(MAT_DIALOG_DATA) public data: CustomerCoupon,
		private _CustomerCoupon: CustomercouponService) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
		await this.GetAllCustomer();
	}

	InitilizeForm() {
		this.CustomerCouponform = this.fb.group({
			'percentage': ['', Validators.required],
			'status': ['', Validators.required],
			'expiryDate': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		debugger
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.CustomerCouponform.controls['percentage'].setValue(this.data.percentage);
			this.CustomerCouponform.controls['status'].setValue(this.data.status);
			this.CustomerCouponform.controls['expiryDate'].setValue(this.data.expiryDate);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	GetAllCustomer() {
		this._CustomerCoupon.GetCustomerCoupon().subscribe(res => {
			this.CustomerList = res as [];
		})
	}

	UPdate() {
		this.CustomerCouponform.controls['id'].setValue(this.data.id)
		this._CustomerCoupon.EditCustomerCoupon(this.CustomerCouponform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Update")
			this.close()
		}, (error: HttpErrorResponse) => {
			console.log(error.message);
			alert(error.message)
			this.close()
		});
	}

	onSubmit() {
		debugger
		this._CustomerCoupon.SaveCustomerCoupon(this.CustomerCouponform.value, this._common.getHeaerOptions()).subscribe(res => {
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


