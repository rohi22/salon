import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../Services/common.service';
import { PermissionService } from '../../Services/permission.service';
import { BranchService } from '../branch/branch.service';
import { DepartmentService } from '../department/department.service';
import { DesignationService } from './designation.service';
import { Designation } from './designationclass';

@Component({
	moduleId: module.id,
	selector: 'designation',
	templateUrl: 'designation.component.html'
})
export class DesignationComponent implements OnInit {
	Designationform: FormGroup;
	token: any;
	DesignationList: any;
	DepartmentList = [];
	BranchList = [];
	PermissionList = [];
	hide: boolean;
	hideupdate: boolean;
	constructor(private fb: FormBuilder, public dialogref: MatDialogRef<DesignationComponent>,
		private _designation: DesignationService, private _department: DepartmentService,
		private _branh: BranchService, private _commonService: CommonService,
		private _permission: PermissionService, @Inject(MAT_DIALOG_DATA) public data: Designation) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.getDepartment();
		await this.getBranch();
		await this.getPermission();
		this.EditMOdal();
	}
	InitilizeForm() {
		this.Designationform = this.fb.group({
			'name': ['', Validators.required],
			'departmentId': ['', Validators.required],
			'permissionId': ['', Validators.required],
			'branchId': ['', Validators.required],
			'active': ['', Validators.required],
			'id': ['', Validators.required],
		})
	}

	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Designationform.controls['name'].setValue(this.data.designationName);
			this.Designationform.controls['departmentId'].setValue(this.data.departmentId);
			this.Designationform.controls['active'].setValue(this.data.active);

			this.Designationform.controls['branchId'].setValue(this.data.branchId);
			this.Designationform.controls['permissionId'].setValue(this.data.list[0].permissionId);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Designationform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	async getDepartment() {
		this._department.getDepartment().subscribe(data => {
			this.DepartmentList = data as [];
		})
	}

	async getBranch() {
		this._branh.getAllBranch().subscribe(data => {
			this.BranchList = data as [];
		})
	}

	async getPermission() {
		this._permission.getAllPermission().subscribe(data => {
			this.PermissionList = data as [];
		})
	}

	UPdate() {
		this.Designationform.controls['id'].setValue(this.data.id)
		this._designation.EditRecord(this.Designationform.value, this._commonService.getHeaerOptions()).subscribe(res => {
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
		this._designation.AddRecord(this.Designationform.value, this._commonService.getHeaerOptions()).subscribe(res => {
			console.log(res);
		});
		this.close();
	}


	close() {
		this.dialogref.close();
	}

}
