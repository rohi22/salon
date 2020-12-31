import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PermissionsModel } from '../../../models/permission';
import { CommonService } from '../../../Services/common.service';
import { PermissionService } from '../../../Services/permission.service';

@Component({
  selector: 'kt-permission',
  templateUrl: './permission.component.html'
})
export class PermissionComponent implements OnInit {
	Permissionform: FormGroup;
	hideupdate: boolean;
	hide: boolean;

	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<PermissionComponent>, private _PermissionService: PermissionService,
        @Inject(MAT_DIALOG_DATA) public data: PermissionsModel) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Permissionform = this.fb.group({
			'permission': ['', Validators.required],
			'description': ['', Validators.required],
			'type': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {
		if (this.data&& this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Permissionform.controls['permission'].setValue(this.data.permission);
			this.Permissionform.controls['description'].setValue(this.data.description);
			this.Permissionform.controls['type'].setValue(this.data.type);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Permissionform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	UPdate() {
		this.Permissionform.controls['id'].setValue(this.data.id)
		this._PermissionService.EditRecord(this.Permissionform.value, this._common.getHeaerOptions()).subscribe(res => {
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
	    this._PermissionService.Savepermission(this.Permissionform.value, this._common.getHeaerOptions()).subscribe(res => {
	        console.log(res);
	    });
	    this.close();
	}

	close() {
		this.dialogref.close();
	}
}
