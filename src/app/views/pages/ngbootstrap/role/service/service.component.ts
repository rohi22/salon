import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Services } from '../../../models/services';
import { CommonService } from '../../../Services/common.service';
import { ServiceService } from '../../../Services/service.service';

@Component({
  selector: 'kt-service',
  templateUrl: './service.component.html'
})
export class ServiceComponent implements OnInit {
	Serviceform: FormGroup;
	hideupdate: boolean;
	hide: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<ServiceComponent>, private _ServicesService: ServiceService,
		@Inject(MAT_DIALOG_DATA) public data: Services) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Serviceform = this.fb.group({
			'name': ['', Validators.required],
			'id': ['', Validators.required],
			'charges': ['', Validators.required],
			'description': ['', Validators.required],
		});
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Serviceform.controls['name'].setValue(this.data.name);
			this.Serviceform.controls['charges'].setValue(this.data.charges);
			this.Serviceform.controls['description'].setValue(this.data.description);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	UPdate() {
		this.Serviceform.controls['id'].setValue(this.data.id)
		this._ServicesService.EditRecord(this.Serviceform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Update")
			this.close()
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error)
			this.close()
		});
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Serviceform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	onSubmit() {
	    this._ServicesService.SaveService(this.Serviceform.value, this._common.getHeaerOptions()).subscribe(res => {
	        console.log(res);
	    });
	    this.close();
	}

	close() {
		this.dialogref.close();
	}
}
