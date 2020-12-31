import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerOrder } from '../../models/customerorder';
import { CommonService } from '../../Services/common.service';
import { CustomerService } from '../../Services/customer.service';
import { CustomerorderService } from '../../Services/customerorder.service';
import { EmployeeService } from '../../Services/employee.service';
import { ProductService } from '../../Services/product.service';
import { ServiceService } from '../../Services/service.service';
import { BranchService } from '../../user-management/branch/branch.service';

@Component({
	selector: 'kt-customerorder',
	templateUrl: './customerorder.component.html',
	styleUrls: ['./customerorder.component.scss']
})
export class CustomerorderComponent implements OnInit {
	Customerorderform: FormGroup;
	ServiceList = [];
	ProductList = [];
	EmployeeList = [];
	BranchList = [];
	CustomerLIst = [];
	hide: boolean;
	hideupdate: boolean;
	ServiceArray = [];
	ProductArray = [];
	@ViewChild('wizard', { static: true }) el: ElementRef;
	@ViewChild('productId', { static: true }) productId: ElementRef;
	@ViewChild('quantity', { static: true }) quantity: ElementRef;
	@ViewChild('price', { static: true }) price: ElementRef;
	@ViewChild('serviceId', { static: true }) serviceId: ElementRef;
	@ViewChild('oprice', { static: true }) oprice: ElementRef;
	@ViewChild('employeeId', { static: true }) employeeId: ElementRef;
	hidecoupon: boolean = true;
	hideloyalty: boolean = true;
	hidemembership: boolean = true;
	hidereward: boolean = true;

	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<CustomerorderComponent>, private _BranchService: BranchService,
		private _ProductService: ProductService, private _service: ServiceService, private _Employee: EmployeeService,
		private _CustomerorderService: CustomerorderService, private _Customer: CustomerService,
		@Inject(MAT_DIALOG_DATA) public data: CustomerOrder) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.EditMOdal();
		await this.getAllProduct();
		await this.getAllBranch();
		await this.getAllCustomer();
		await this.getAllServices();
		await this.getAllEmployee();
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
		this.Customerorderform = this.fb.group({
			'id': ['', Validators.required],
			'branchIdd': ['', Validators.required],
			'customerId': ['', Validators.required],
			'customerType': ['', Validators.required],
			'coupon': ['', Validators.required],
			'loyaltyCard': ['', Validators.required],
			'membershipCard': ['', Validators.required],
			'rewardTransaction': ['', Validators.required],
			'discount': ['', Validators.required],
			'tax': ['', Validators.required],
			'couponDiscount': ['', Validators.required],
			'loyalityCardDiscount': ['', Validators.required],
			'membershipCardDiscount': ['', Validators.required],

			'orderProducts': ['', Validators.required],
			'orderServices': ['', Validators.required],
		});
	}

	async EditMOdal() {
		debugger
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.ServiceArray = this.data.orderServices;
			this.ProductArray = this.data.orderProducts
			this.Customerorderform.controls['branchIdd'].setValue(this.data.branchIdd);
			this.Customerorderform.controls['customerId'].setValue(this.data.customerId);
			this.Customerorderform.controls['customerType'].setValue(this.data.customerType);
			this.Customerorderform.controls['coupon'].setValue(this.data.coupon);
			this.Customerorderform.controls['loyaltyCard'].setValue(this.data.loyaltyCard);
			// this.Customerorderform.controls['rewardTransaction'].setValue(this.data.res);
			this.Customerorderform.controls['membershipCard'].setValue(this.data.membershipCard);
			this.Customerorderform.controls['discount'].setValue(this.data.discount);
			this.Customerorderform.controls['tax'].setValue(this.data.tax);

			this.Customerorderform.controls['couponDiscount'].setValue(this.data.couponNo);
			this.Customerorderform.controls['loyalityCardDiscount'].setValue(this.data.loaylityCardNo);
			this.Customerorderform.controls['membershipCardDiscount'].setValue(this.data.membershipCardNo);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	async getAllProduct() {
		this._ProductService.getAllProduct().subscribe(res => {
			this.ProductList = res as [];
		})
	}

	async getAllServices() {
		this._service.getAllServices().subscribe(res => {
			this.ServiceList = res as [];
		})
	}

	async getAllBranch() {
		this._BranchService.getAllBranch().subscribe(res => {
			this.BranchList = res as [];
		})
	}

	async getAllCustomer() {
		this._Customer.getAllCustomer().subscribe(res => {
			this.CustomerLIst = res as [];
		})
	}

	async getAllEmployee() {
		this._Employee.getAllEmployee().subscribe(res => {
			this.EmployeeList = res as [];
		})
	}

	onSubmit() {
		if (this.Customerorderform.controls['customerType'].value == 0) {
			this.Customerorderform.controls['customerType'].setValue("Registered")
		}
		else {
			this.Customerorderform.controls['customerType'].setValue("Walkin")
		}
		if (this.Customerorderform.controls['coupon'].value == "") {
			this.Customerorderform.controls['coupon'].setValue(false);
		}
		else {
			this.Customerorderform.controls['coupon'].setValue(true);
		}
		if (this.Customerorderform.controls['loyaltyCard'].value == "") {
			this.Customerorderform.controls['loyaltyCard'].setValue(false);
		}
		else {
			this.Customerorderform.controls['loyaltyCard'].setValue(true);
		}
		if (this.Customerorderform.controls['membershipCard'].value == "") {
			this.Customerorderform.controls['membershipCard'].setValue(false);
		}
		else {
			this.Customerorderform.controls['membershipCard'].setValue(true);
		}
		if (this.Customerorderform.controls['rewardTransaction'].value == "") {
			this.Customerorderform.controls['rewardTransaction'].setValue(false);
		}
		else {
			this.Customerorderform.controls['rewardTransaction'].setValue(true);
		}

		this.Customerorderform.controls['branchIdd'].setValue(Number(this.Customerorderform.controls['branchIdd'].value))
		this.Customerorderform.controls['customerId'].setValue(Number(this.Customerorderform.controls['customerId'].value))
		this.Customerorderform.controls['discount'].setValue(Number(this.Customerorderform.controls['discount'].value))
		this.Customerorderform.controls['tax'].setValue(Number(this.Customerorderform.controls['tax'].value))

		this.Customerorderform.controls['orderProducts'].setValue(this.ProductArray);
		this.Customerorderform.controls['orderServices'].setValue(this.ServiceArray);
		console.log(this.Customerorderform.value)
		debugger
		this._CustomerorderService.SaveCustomerOrder(this.Customerorderform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			this.close();
			alert("Save")
		}, (err: HttpErrorResponse) => {
			alert(err.error);
			console.log(err);
		});

	}

	close() {
		this.dialogref.close();
	}

	async AddOrderArray() {
		const product = this.ProductList.filter(o => o.id == Number(this.productId.nativeElement.value))[0].productName;
		this.ProductArray.push({
			productName: product,
			productId: Number(this.productId.nativeElement.value),
			price: Number(this.price.nativeElement.value),
			quantity: Number(this.quantity.nativeElement.value),
		});
	}

	async AddServiceArray() {
		const service = this.ServiceList.filter(o => o.id == Number(this.serviceId.nativeElement.value))[0].name;
		const employee = this.EmployeeList.filter(o => o.id == Number(this.employeeId.nativeElement.value))[0].userName;
		this.ServiceArray.push({
			serviceName: service,
			serviceId: Number(this.serviceId.nativeElement.value),
			price: Number(this.oprice.nativeElement.value),
			employeeId: Number(this.employeeId.nativeElement.value),
			employeeName: employee,
		});
	}

	async SpliceProductArray(item) {
		this.ProductArray.splice(item, 1);
	}

	async SpliceServiceArray(item) {
		this.ServiceArray.splice(item, 1);
	}

	async ChangeCoupon() {
		if (this.Customerorderform.controls['coupon'].value == true) {
			this.hidecoupon = false
		}
		else {
			this.hidecoupon = true
		}
	}

	async ChangeLoyalty() {
		if (this.Customerorderform.controls['loyaltyCard'].value == true) {
			this.hideloyalty = false
		}
		else {
			this.hideloyalty = true
		}
	}

	async ChangeMembership() {
		if (this.Customerorderform.controls['membershipCard'].value == true) {
			this.hidemembership = false;
		}
		else {
			this.hidemembership = true;
		}
	}

	async ChangerewardTransaction() {
		if (this.Customerorderform.controls['rewardTransaction'].value == true) {
			this.hidereward = false
		}
		else {
			this.hidereward = true;
		}
	}

}
