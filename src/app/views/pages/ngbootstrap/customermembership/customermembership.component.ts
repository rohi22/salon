import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerMemberShip } from '../../models/customermmebership';
import { CommonService } from '../../Services/common.service';
import { CustomermembershipService } from '../../Services/customermembership.service';
import { CustomerupdateService } from '../../Services/customerupdate.service';

@Component({
	selector: 'kt-customermembership',
	templateUrl: './customermembership.component.html'
})
export class CustomermembershipComponent implements OnInit {
	CustomerMemberShipform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	CustomerList = []
	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<CustomermembershipComponent>, private _CustomerrewardpointsService: CustomermembershipService,
		@Inject(MAT_DIALOG_DATA) public data: CustomerMemberShip, private _CustomerupdateService: CustomerupdateService) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
		await this.GetAllCustomer();
	}

	InitilizeForm() {
		this.CustomerMemberShipform = this.fb.group({
			'customerId': ['', Validators.required],
			'startingDate': ['', Validators.required],
			'endingDate': ['', Validators.required],
			'percentageOff': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		debugger
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.CustomerMemberShipform.controls['customerId'].setValue(this.data.customerId);
			this.CustomerMemberShipform.controls['startingDate'].setValue(this.data.startingDate);
			this.CustomerMemberShipform.controls['percentageOff'].setValue(this.data.percentageOff);
			this.CustomerMemberShipform.controls['endingDate'].setValue(this.data.endingDate);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	GetAllCustomer() {
		this._CustomerupdateService.GetAllCustomer().subscribe(res => {
			this.CustomerList = res as [];
		})
	}

	UPdate() {
		this.CustomerMemberShipform.controls['id'].setValue(this.data.id)
		this._CustomerrewardpointsService.EditCustomerMemberdhipCard(this.CustomerMemberShipform.value, this._common.getHeaerOptions()).subscribe(res => {
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
		this._CustomerrewardpointsService.SaveCustomerMemberdhipCard(this.CustomerMemberShipform.value, this._common.getHeaerOptions()).subscribe(res => {
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


