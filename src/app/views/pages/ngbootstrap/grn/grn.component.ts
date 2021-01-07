import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GRN } from '../../models/grn';
import { CommonService } from '../../Services/common.service';
import { GrnserviceService } from '../../Services/grnservice.service';
import { PurchaseorderService } from '../../Services/purchaseorder.service';

@Component({
  selector: 'kt-grn',
  templateUrl: './grn.component.html'
})
export class GrnComponent implements OnInit {
	GRNform: FormGroup;
	POList = [];
	hideupdate: boolean;
	hide: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<GrnComponent>, private _GrnserviceService: GrnserviceService,
		@Inject(MAT_DIALOG_DATA) public data: GRN,private POService : PurchaseorderService) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.getAllPO();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.GRNform = this.fb.group({
			'purchaseOrderId': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			//this.GRNform.controls['area'].setValue(this.data.area);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.GRNform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	async getAllPO() {
		this.POService.getAllPO().subscribe(data => {
			this.POList = data as [];
		})
	}

	UPdate() {
		//this.GRNform.controls['id'].setValue(this.data.id)
		this._GrnserviceService.EditGrn(this.GRNform.value, this._common.getHeaerOptions()).subscribe(res => {
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
		this._GrnserviceService.getGrnByPO(this.GRNform.value).subscribe(res => {
			console.log(res);
		});
		this.close();
	}

	// onSubmit() {
	// 	this._GrnserviceService.SaveGrn(this.GRNform.value, this._common.getHeaerOptions()).subscribe(res => {
	// 		console.log(res);
	// 	});
	// 	this.close();
	// }

	close() {
		this.dialogref.close();
	}
}
