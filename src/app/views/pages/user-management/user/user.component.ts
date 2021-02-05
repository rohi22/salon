import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models/user';
import { ApiLinks } from '../../Services/APILinks';
import { CommonService } from '../../Services/common.service';
import { LoginService } from '../../Services/login.service';
import { UsertypeService } from '../../Services/usertype.service';
import { BranchService } from '../branch/branch.service';
import { DepartmentService } from '../department/department.service';
import { DesignationService } from '../designation/designation.service';
import { UserService } from './user.service';

@Component({
	moduleId: module.id,
	selector: 'user',
	templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {
	Userform: FormGroup;
	token: any;
	UserList: any;
	CountryList = [];
	CityList = [];
	StateList = [];
	AreaList = [];
	BranchList = [];
	UserTypeList = [];
	DepartmentList = [];
	DesignationList = [];
	hideupdate: boolean;
	hide: boolean;
	file: any = null;
	imageViewLink: any;
	image: any = null;
	constructor(private fb: FormBuilder, private _common: CommonService, private _branchService: BranchService,
		public dialogref: MatDialogRef<UserComponent>, private _userType: UsertypeService,
		private _depart: DepartmentService, private _designation: DesignationService, private _userservice: UserService,
		@Inject(MAT_DIALOG_DATA) public data: User, private _login: LoginService,private apiLinks: ApiLinks) {
			this.imageViewLink = this.apiLinks.imageView;
		 }

	async ngOnInit() {
		this.InitilizeForm();
		await this.EditMOdal();
		await this.getAllCountry();
		await this.getUserType();
		await this.getDepartment();
		await this.getBranch();
		if (this.data.id) {
			await this.getStateByCountry(this.Userform.controls['countryId'].value);
			await this.getCityByState(this.Userform.controls['stateId'].value);
			await this.getAreaByCity(this.Userform.controls['cityId'].value);
			await this.getDeisgnation(this.Userform.controls['departmentId'].value);
		}

	}

	InitilizeForm() {
		this.Userform = this.fb.group({
			'email': ['', Validators.required],
			'password': ['', Validators.required],
			'name': ['', Validators.required],
			'fullName': ['', Validators.required],
			'branchId': ['', Validators.required],
			'address': ['', Validators.required],
			'contact': ['', Validators.required],
			'cnic': ['', Validators.required],
			'altContact': ['', Validators.required],
			'description': ['', Validators.required],
			'altEmail': ['', Validators.required],
			'departmentId': ['', Validators.required],
			'designationId': ['', Validators.required],
			'userTypeId': ['', Validators.required],
			'countryId': ['', Validators.required],
			'cityId': ['', Validators.required],
			'areaId': ['', Validators.required],
			'stateId': ['', Validators.required],
			'id': ['', Validators.required],
		})
	}

	async EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			// this.Userform.controls['id'].setValue(this.data.id);
			this.Userform.controls['email'].setValue(this.data.email);
			this.Userform.controls['password'].setValue(this.data.password);
			this.Userform.controls['name'].setValue(this.data.name);
			this.Userform.controls['fullName'].setValue(this.data.fullName);
			this.Userform.controls['branchId'].setValue(this.data.branchId.toString());
			this.Userform.controls['address'].setValue(this.data.address);
			this.Userform.controls['contact'].setValue(this.data.contact);
			this.Userform.controls['cnic'].setValue(this.data.cnic);
			this.Userform.controls['altContact'].setValue(this.data.altContact);
			this.Userform.controls['description'].setValue(this.data.aboutDesc);
			this.Userform.controls['altEmail'].setValue(this.data.altEmail);
			this.Userform.controls['departmentId'].setValue(this.data.departmentId);
			this.Userform.controls['designationId'].setValue(this.data.designationId);
			this.Userform.controls['countryId'].setValue(this.data.countryId);
			this.Userform.controls['userTypeId'].setValue(this.data.userTypeId);
			this.image = this.data.image;
			// this.Userform.controls['isActive'].setValue(this.data.active);
			this.Userform.controls['cityId'].setValue(this.data.cityId);
			this.Userform.controls['areaId'].setValue(this.data.areaId);
			this.Userform.controls['stateId'].setValue(this.data.stateId);
			if (this.data.id) {
			await	 this.getStateByCountry(this.Userform.controls['countryId'].value);
			await	 this.getCityByState(this.Userform.controls['stateId'].value);
			await	 this.getAreaByCity(this.Userform.controls['cityId'].value);
			await	 this.getDeisgnation(this.Userform.controls['departmentId'].value);
			await    this.getUserType();

			}
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	async getAllCountry() {
		this._common.getCountry().subscribe(data => {
			this.CountryList = data as [];
		})
	}

	async getStateByCountry(countryid) {
		this._common.getstatebyCountryId(countryid).subscribe(data => {
			this.StateList = data as [];
		})
	}

	async getCityByState(stateid) {
		this._common.getcitybyStateID(stateid).subscribe(data => {
			this.CityList = data as [];
		})
	}

	async getAreaByCity(cityid) {
		this._common.getareaByCityID(cityid).subscribe(data => {
			this.AreaList = data as [];
		})
	}

	async getUserType() {
		this._userType.getUSerType().subscribe(data => {
			this.UserTypeList = data as [];
		})
	}

	async getDepartment() {
		this._depart.getDepartment().subscribe(data => {
			this.DepartmentList = data as [];

		})
	}

	async getDeisgnation(departid) {
		this._designation.getDesignationbyDepartment(departid).subscribe(data => {
			this.DesignationList = data as [];
		})
	}

	async getBranch() {
		this._branchService.getAllBranch().subscribe(data => {
			this.BranchList = data as [];
		})
	}

	onSubmit() {
		const formData = new FormData();
		formData.append("user", JSON.stringify(this.Userform.value));
		formData.append("file", this.file);

		this._userservice.AddRecord(formData, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Save");
			this.close();
		}, (err: HttpErrorResponse) => {
			alert(err.message);
		});
	}

	UPdate() {
		this.Userform.controls['id'].setValue(this.data.id)
		const formData = new FormData();
		let data1 = this.Userform.value
		data1.userTypeId = this.Userform.controls['userTypeId'].value
		formData.append("user", JSON.stringify(data1));
		formData.append("file", this.file);
		this._userservice.EditUser(formData, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Update")
			this.close()
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error.message)
			this.close()
		});
	}

	close() {
		this.dialogref.close();
	}

	onFileChanged(event) {
		this.file = event.target.files[0];
	}

	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.Userform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
