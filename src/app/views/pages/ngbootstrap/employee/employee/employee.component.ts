import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatGridTileHeaderCssMatStyler, MAT_DIALOG_DATA } from '@angular/material';
import { Employee } from '../../../models/employee';
import { AllowancesService } from '../../../Services/allowances.service';
import { BatchService } from '../../../Services/batch.service';
import { CommonService } from '../../../Services/common.service';
import { EmployeeService } from '../../../Services/employee.service';
import { ServiceService } from '../../../Services/service.service';
import { UserService } from '../../../user-management/user/user.service';

@Component({
	selector: 'kt-employee',
	templateUrl: './employee.component.html',
	styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
	Employeeform: FormGroup;
	UserList = [];
	BatchList = [];
	ServiceList = [];
	AllowncesList = [];
	hide: boolean;
	hideupdate: boolean;
	ServiceArray = [];
	AllowncesArray = [];
	EmployeeList = [];
	@ViewChild('wizard', { static: true }) el: ElementRef;
	@ViewChild('service', { static: true }) service: ElementRef;
	@ViewChild('percenatage', { static: true }) percenatage: ElementRef;
	@ViewChild('allownces', { static: true }) allownces: ElementRef;
	@ViewChild('allowncesamount', { static: true }) allowncesamount: ElementRef;
	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<EmployeeComponent>, private _EmployeeService: EmployeeService,
		private _userService: UserService, private _BatchService: BatchService, private _Services: ServiceService,
		private _AllowancesService: AllowancesService,
		@Inject(MAT_DIALOG_DATA) public data: Employee) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.EditMOdal();
		await this.getUser();
		await this.getBatch();
		await this.getServices();
		await this.getAllownces();
		await this.getEmployee();
	}

	ngAfterViewInit(): void {
		const wizard = new KTWizard(this.el.nativeElement, {
			startStep: 1
		});

		wizard.on('beforeNext', (wizardObj) => {
		});
		wizard.on('change', () => {
			setTimeout(() => {
				KTUtil.scrollTop();
			}, 500);
		});
	}

	InitilizeForm() {
		this.Employeeform = this.fb.group({
			'id': ['', Validators.required],
			'serviceWiseCommission': ['', Validators.required],
			'employeeAllownce': ['', Validators.required],
			'salary': ['', Validators.required],
			'batchId': ['', Validators.required],
			'userId': ['', Validators.required],
			'listallowance': ['', Validators.required],
			'listEmployeeService': ['', Validators.required],

		});
	}

	async EditMOdal() {

		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Employeeform.controls['serviceWiseCommission'].setValue(this.data.serviceWiseCommission);
			this.Employeeform.controls['salary'].setValue(this.data.salary);
			this.Employeeform.controls['batchId'].setValue(this.data.batchId);
			this.Employeeform.controls['userId'].setValue(this.data.userId);
			this.ServiceArray = this.data.employeesService;
			this.AllowncesArray = this.data.allowanceList
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	async getUser() {
		this._userService.getAllUsers().subscribe(res => {
			this.UserList = res as [];
		})
	}

	async getBatch() {
		this._BatchService.getAllBatch().subscribe(res => {
			this.BatchList = res as [];
		})
	}

	async getServices() {
		this._Services.getAllServices().subscribe(res => {
			this.ServiceList = res as [];
		})
	}

	async getAllownces() {
		this._AllowancesService.getAllAllownces().subscribe(res => {
			this.AllowncesList = res as [];
		})
	}

	async getEmployee() {
		this._EmployeeService.getAllEmployee().subscribe(res => {
			this.EmployeeList = res as [];
		})
	}

	UPdate() {
		this.Employeeform.controls['id'].setValue(this.data.id)
		this.Employeeform.controls['listallowance'].setValue(this.AllowncesArray);
		this.Employeeform.controls['listEmployeeService'].setValue(this.ServiceArray);
		console.log(this.Employeeform.value)
		this._EmployeeService.EditRecord(this.Employeeform.value, this._common.getHeaerOptions()).subscribe(res => {
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
		this.Employeeform.controls['listallowance'].setValue(this.AllowncesArray);
		this.Employeeform.controls['listEmployeeService'].setValue(this.ServiceArray);

		console.log(this.Employeeform.value)
		this._EmployeeService.SaveEmployee(this.Employeeform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Save")
		}, (err: HttpErrorResponse) => {
			alert(err.error);
			console.log(err);
		});
		this.close();
	}

	close() {
		this.dialogref.close();
	}

	async AddService() {
		var abc = this.percenatage;
		const service = this.ServiceList.filter(o => o.id == Number(this.service.nativeElement.value))[0].name;
		this.ServiceArray.push({
			serviceName: service,
			percentage: this.percenatage.nativeElement.value,
			serviceId: Number(this.service.nativeElement.value)
		});
	}

	async AddAllownces() {
		const allownce = this.AllowncesList.filter(o => o.id == Number(this.allownces.nativeElement.value))[0].allowanceName;
		this.AllowncesArray.push({
			allowanceName: allownce,
			allowanceId: Number(this.allownces.nativeElement.value),
			allowanceAmount: this.allowncesamount.nativeElement.value
		});
	}

	async SpliceServiceArray(item) {
		this.ServiceArray.splice(item, 1);

	}
	async SpliceAllownceArray(index) {
		this.AllowncesArray.splice(index, 1);

	}
}
