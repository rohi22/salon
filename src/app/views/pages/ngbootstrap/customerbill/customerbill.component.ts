import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerBill } from '../../models/customerbill';
import { CommonService } from '../../Services/common.service';
import { CustomerService } from '../../Services/customer.service';
import { CustomerbillService } from '../../Services/customerbill.service';
import { CustomerorderService } from '../../Services/customerorder.service';
import { EmployeeService } from '../../Services/employee.service';
import { ProductService } from '../../Services/product.service';
import { ServiceService } from '../../Services/service.service';
import { BranchService } from '../../user-management/branch/branch.service';

@Component({
	selector: 'kt-customerbill',
	templateUrl: './customerbill.component.html',
	styleUrls: ['./customerbill.component.scss']
})
export class CustomerbillComponent implements OnInit {
	CustomerBillform: FormGroup;
	ServiceList = [];
	ProductList = [];
	EmployeeList = [];
	BranchList = [];
	CustomerLIst = [];
	OrdeList = []
	hide: boolean;
	hideupdate: boolean;
	ServiceArray = [];
	OrderArray = [];
	@ViewChild('wizard', { static: true }) el: ElementRef;
	@ViewChild('productId', { static: true }) productId: ElementRef;
	@ViewChild('quantity', { static: true }) quantity: ElementRef;
	@ViewChild('price', { static: true }) price: ElementRef;
	@ViewChild('totalPricePerProduct', { static: true }) totalPricePerProduct: ElementRef;
	@ViewChild('serviceId', { static: true }) serviceId: ElementRef;
	@ViewChild('sprice', { static: true }) sprice: ElementRef;
	@ViewChild('employeeId', { static: true }) employeeId: ElementRef;

	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<CustomerbillComponent>, private _BranchService: BranchService,
		private _ProductService: ProductService, private _service: ServiceService, private _Employee: EmployeeService,
		private CustomerbillService: CustomerbillService, private _Customer: CustomerService, private _CustomeroRder: CustomerorderService,
		@Inject(MAT_DIALOG_DATA) public data: CustomerBill) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.EditMOdal();
		await this.getAllOrder();
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
		this.CustomerBillform = this.fb.group({
			'id': ['', Validators.required],
			'orderProducts': ['', Validators.required],
			'orderServices': ['', Validators.required],
			// 'paymentMethodId': ['', Validators.required],
			// 'paymentMethodName': ['', Validators.required],
			'customerId': ['', Validators.required],
			'customerName': ['', Validators.required],
			'customerType': ['', Validators.required],
			'coupon': ['', Validators.required],
			'loyaltyCard': ['', Validators.required],

			'membershipCard': ['', Validators.required],
			'discount': ['', Validators.required],
			'totalDiscount': ['', Validators.required],
			'couponDiscount': ['', Validators.required],
			'loyalityCardDiscount': ['', Validators.required],
			'membershipCardDiscount': ['', Validators.required],
			'tax': ['', Validators.required],
			'loaylityCardNo': ['', Validators.required],
			'couponNo': ['', Validators.required],

			'membershipCardNo': ['', Validators.required],
			'grossAmount': ['', Validators.required],
			'netAmount': ['', Validators.required],
			'branchIdd': ['', Validators.required],
			'branchName': ['', Validators.required],

		});
	}

	async EditMOdal() {

		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.ServiceArray = this.data.orderServiceBillDetails;
			this.OrderArray = this.data.orderProductBillDetails
			this.CustomerBillform.controls['paymentMethodId'].setValue(this.data.paymentMethodId);
			this.CustomerBillform.controls['paymentMethodName'].setValue(this.data.paymentMethodName);
			this.CustomerBillform.controls['customerId'].setValue(this.data.customerId);
			this.CustomerBillform.controls['customerName'].setValue(this.data.customerName);
			// this.CustomerBillform.controls['customerType'].setValue(this.data.cus);
			this.CustomerBillform.controls['coupon'].setValue(this.data.coupon);
			this.CustomerBillform.controls['loyaltyCard'].setValue(this.data.loyaltyCard);
			this.CustomerBillform.controls['membershipCard'].setValue(this.data.membershipCard);
			this.CustomerBillform.controls['discount'].setValue(this.data.discount);
			this.CustomerBillform.controls['totalDiscount'].setValue(this.data.totalDiscount);
			this.CustomerBillform.controls['couponDiscount'].setValue(this.data.couponDiscount);
			this.CustomerBillform.controls['loyalityCardDiscount'].setValue(this.data.loyaltyDiscount);
			this.CustomerBillform.controls['membershipCardDiscount'].setValue(this.data.membershipDiscount);
			this.CustomerBillform.controls['tax'].setValue(this.data.tax);
			this.CustomerBillform.controls['loaylityCardNo'].setValue(this.data.loyaltyCard);
			this.CustomerBillform.controls['couponNo'].setValue(this.data.coupon);
			this.CustomerBillform.controls['membershipCardNo'].setValue(this.data.membershipCard);
			this.CustomerBillform.controls['grossAmount'].setValue(this.data.grossAmount);
			this.CustomerBillform.controls['branchIdd'].setValue(this.data.branchId);
			this.CustomerBillform.controls['branchName'].setValue(this.data.branchName);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	async getAllOrder() {
		this._CustomeroRder.GetCustomerOrder().subscribe(res => {
			this.OrdeList = res as [];
		})
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
		if (this.CustomerBillform.controls['coupon'].value == "") {
			this.CustomerBillform.controls['coupon'].setValue(false);
		}
		else {
			this.CustomerBillform.controls['coupon'].setValue(true);
		}
		if (this.CustomerBillform.controls['loyaltyCard'].value == "") {
			this.CustomerBillform.controls['loyaltyCard'].setValue(false);
		}
		else {
			this.CustomerBillform.controls['loyaltyCard'].setValue(true);
		}
		if (this.CustomerBillform.controls['membershipCard'].value == "") {
			this.CustomerBillform.controls['membershipCard'].setValue(false);
		}
		else {
			this.CustomerBillform.controls['membershipCard'].setValue(true);
		}
		this.CustomerBillform.controls['orderProducts'].setValue(this.OrderArray);
		this.CustomerBillform.controls['orderServices'].setValue(this.ServiceArray);
		console.log(this.CustomerBillform.value)
		this.CustomerbillService.SaveCustomerBill(this.CustomerBillform.value, this._common.getHeaerOptions()).subscribe(res => {
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
		this.OrderArray.push({
			productName: product,
			productId: Number(this.productId.nativeElement.value),
			price: Number(this.price.nativeElement.value),
			quantity: Number(this.quantity.nativeElement.value),
			totalPricePerProduct: Number(this.totalPricePerProduct.nativeElement.value),
		});
	}

	async AddServiceArray() {
		const service = this.ServiceList.filter(o => o.id == Number(this.serviceId.nativeElement.value))[0].name;
		const employee = this.EmployeeList.filter(o => o.id == Number(this.employeeId.nativeElement.value))[0].userName;
		this.ServiceArray.push({
			serviceName: service,
			serviceId: Number(this.serviceId.nativeElement.value),
			price: Number(this.productId.nativeElement.value),
			employeeId: Number(this.employeeId.nativeElement.value),
			employeeName: employee,
		});
	}

	async SpliceOrderArray(item) {
		this.OrderArray.splice(item, 1);
	}

	async SpliceServiceArray(item) {
		this.ServiceArray.splice(item, 1);
	}
}
