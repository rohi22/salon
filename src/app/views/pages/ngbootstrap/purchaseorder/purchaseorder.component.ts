import { filter } from 'rxjs/operators';
import { TaxService } from './../../Services/tax.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrder } from '../../models/purchaseorder';
import { BrandsService } from '../../Services/brands.service';
import { CommonService } from '../../Services/common.service';
import { ProductService } from '../../Services/product.service';
import { PurchaseorderService } from '../../Services/purchaseorder.service';
import { VendorService } from '../../Services/vendor.service';
import { BranchService } from '../../user-management/branch/branch.service';
import moment from 'moment';
import { DatePipe } from '@angular/common';

const basicTabs = {
	beforeCodeTitle: 'Purchase Order',
	// 	htmlCode: `
	// <mat-tab-group>
	// <mat-tab label="Tab 1">Content 1</mat-tab>
	// <mat-tab label="Tab 2">Content 2</mat-tab>
	// </mat-tab-group>
	// `,
	// 	tsCode: `
	// import {Component} from '@angular/core';

	// /**
	// * @title Purchase Order
	// */
	// @Component({
	// selector: 'tabs-overview-example',
	// templateUrl: 'tabs-overview-example.html',
	// styleUrls: ['tabs-overview-example.css'],
	// })
	// export class TabsOverviewExample {}
	// `,
	cssCode: ``,
	viewCode: ``,
	isCodeVisible: false,
	isExampleExpanded: true
};
@Component({
	selector: 'kt-purchaseorder',
	templateUrl: './purchaseorder.component.html',
	styleUrls: ['./purchaseorder.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.demo-tab-group {
		border: 1px solid #e8e8e8;
	  }
	  .demo-tab-content {
		padding: 16px;
	  }
	`]
})
export class PurchaseorderComponent implements OnInit {
	POform: FormGroup;
	ProductList = [];
	BrandList = [];
	VendorList = [];
	BranchList = [];
	TaxList: any = [];
	hide: boolean;
	hideupdate: boolean;
	POArray = [];
	// @ViewChild('wizard', { static: true }) el: ElementRef;
	@ViewChild('productId', { static: true }) productId: ElementRef;
	// @ViewChild('productBrandId', { static: true }) productBrandId: ElementRef;
	@ViewChild('taxId', { static: true }) taxId: ElementRef;
	@ViewChild('quantity', { static: true }) quantity: ElementRef;
	@ViewChild('discount', { static: true }) discount: ElementRef;
	@ViewChild('productPrice', { static: true }) productPrice: ElementRef;
	constructor(private fb: FormBuilder, private _common: CommonService,	private datePipe: DatePipe,
		public dialogref: MatDialogRef<PurchaseorderComponent>, private _BranchService: BranchService,
		private _VendorService: VendorService, private _TaxService: TaxService, private _ProductService: ProductService, private _BrandsService: BrandsService,
		private _PurchaseorderService: PurchaseorderService,
		@Inject(MAT_DIALOG_DATA) public data: PurchaseOrder) { }

	exampleBasicTabs;
	todayDate = moment(new Date()).format("YYYY-MM-DD")

	async ngOnInit() {
		this.exampleBasicTabs = basicTabs;
		this.InitilizeForm();
		await this.EditMOdal();
		await this.getAllProduct();
		await this.getAllBrand();
		await this.getAllBranch();
		await this.GetALLvendor();
		await this.GetALLTax();

	}

	ngAfterViewInit(): void {
		// const wizard = new KTWizard(this.el.nativeElement, {
		// 	startStep: 1
		// });

		// wizard.on('beforeNext', (wizardObj) => {
		// });
		// wizard.on('change', () => {
		// 	setTimeout(() => {
		// 		KTUtil.scrollTop();
		// 	}, 500);
		// });
	}
	InitilizeForm() {
		this.POform = this.fb.group({
			'id': ['', Validators.required],
			'title': ['', Validators.required],
			// 'tax': ['', Validators.required],
			// 'discount': ['', Validators.required],
			// 'poNumber': ['', Validators.required],
			'vendorId': ['', Validators.required],
			'vendorName': ['', Validators.required],
			'branchName': ['', Validators.required],
			'branchId': ['', Validators.required],
			'poDetail': ['', Validators.required],
			// 'taxId': ['', Validators.required],
			'deliveryDate': ['', Validators.required],
			'subtotal': ['', Validators.required],
			'subdiscount': ['', Validators.required],
			'subtaxAmount': ['', Validators.required],
			'subgrossamount': ['', Validators.required],
			'poStatus': ['', Validators.required],
			'poNumber': ['', Validators.required],
			// 'poDate': ['', Validators.required],
		});
	}

	async EditMOdal() {
		debugger
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.POform.controls['title'].setValue(this.data.title);
			this.POform.controls['poNumber'].setValue(this.data.poNumber);
			this.POform.controls['vendorId'].setValue(this.data.vendorId);
			this.POform.controls['vendorName'].setValue(this.data.vendorName);
			await this.GetALLvendor();

			this.POform.controls['branchName'].setValue(this.data.branchName);
			this.POform.controls['branchId'].setValue(this.data.branchId);
			await this.getAllBranch();

			// 'poDetail': ['', Validators.required],
			// // 'taxId': ['', Validators.required],
			// let date = this.data.deliveryDate.split('T');
			this.POform.controls['deliveryDate'].setValue(this.datePipe.transform(this.data.deliveryDate, 'yyyy-MM-dd'));
			this.POform.controls['subtotal'].setValue(this.data.subTotal);
			this.POform.controls['subdiscount'].setValue(this.data.subDiscount );
			this.POform.controls['subtaxAmount'].setValue(this.data.subTaxAmount );
			this.POform.controls['subgrossamount'].setValue(this.data.subGrossAmount );
			this.POform.controls['poStatus'].setValue(this.data.poStatus );
			this.POArray = this.data.poList;

		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	async GetALLvendor() {
		this._VendorService.GetALLvendor().subscribe(res => {
			this.VendorList = res as [];
		})
	}
	async GetALLTax() {
		this._TaxService.getAllTax().subscribe(res => {
			this.TaxList = res as [];
		})
	}
	async getAllBranch() {
		this._BranchService.getAllBranch().subscribe(res => {
			this.BranchList = res as [];
		})
	}

	async getAllProduct() {
		this._ProductService.getAllProduct().subscribe(res => {
			this.ProductList = res as [];
		})
	}

	async getAllBrand() {
		this._BrandsService.getAllBrands().subscribe(res => {
			this.BrandList = res as [];
		})
	}

	UPdate(poStatus) {
		this.POform.controls['poDetail'].setValue(this.POArray);
		this.POform.controls['vendorName'].setValue(this.VendorList.filter(o => o.id == +this.POform.controls['vendorId'].value)[0].vendorName);
		this.POform.controls['branchName'].setValue(this.BranchList.filter(o => o.id == +this.POform.controls['branchId'].value)[0].name);
		debugger
		let subTotal = null;
		let subDiscount = null;
		let subTaxAmount = null;
		let subGrossAmount = null;
		this.POArray.forEach(element => {
			subTotal += +element.totalAmount;
			subDiscount += +element.discountAmount;
			subTaxAmount += +element.taxAmount
			subGrossAmount += +element.grossAmount
		});

		this.POform.controls['poStatus'].setValue(poStatus);
		this.POform.controls['subtotal'].setValue(subTotal);
		this.POform.controls['subdiscount'].setValue(subDiscount);
		this.POform.controls['subtaxAmount'].setValue(subTaxAmount);
		this.POform.controls['subgrossamount'].setValue(subGrossAmount);

		this.POform.controls['id'].setValue(this.data.id)
		// this.POform.controls['poDetail'].setValue(this.AllowncesArray);
		console.log(this.POform.value)
		this._PurchaseorderService.EditPO(this.POform.value, this.data.poList, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Update")
			this.close()
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error)
			this.close()
		});
	}

	onSubmit(poStatus) {
		this.POform.controls['poDetail'].setValue(this.POArray);
		this.POform.controls['vendorName'].setValue(this.VendorList.filter(o => o.id == +this.POform.controls['vendorId'].value)[0].vendorName);
		this.POform.controls['branchName'].setValue(this.BranchList.filter(o => o.id == +this.POform.controls['branchId'].value)[0].name);
		debugger
		let subTotal = null;
		let subDiscount = null;
		let subTaxAmount = null;
		let subGrossAmount = null;
		this.POArray.forEach(element => {
			subTotal += +element.totalAmount;
			subDiscount += +element.discountAmount;
			subTaxAmount += +element.taxAmount
			subGrossAmount += +element.grossAmount
		});

		this.POform.controls['poStatus'].setValue(poStatus);
		this.POform.controls['subtotal'].setValue(subTotal);
		this.POform.controls['subdiscount'].setValue(subDiscount);
		this.POform.controls['subtaxAmount'].setValue(subTaxAmount);
		this.POform.controls['subgrossamount'].setValue(subGrossAmount);

		console.log(this.POform.value)
		this._PurchaseorderService.SavePO(this.POform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			this.close();
			alert("Save")
		}, (err: HttpErrorResponse) => {
			alert(err.error);
			this.close();
			console.log(err);
		});

	}

	close() {
		this.dialogref.close();
	}

	async AddPOArray() {
		debugger;
		const product = this.ProductList.filter(o => o.id == Number(this.productId.nativeElement.value))[0].productName;
		const brand = this.ProductList.filter(o => o.id == Number(this.productId.nativeElement.value))[0].brandName;
		const brandId = this.ProductList.filter(o => o.id == Number(this.productId.nativeElement.value))[0].brandId;
		let percentage = this.TaxList.filter(x => x.id == +this.taxId.nativeElement.value)[0].percentage

		let grossAmount = this.quantity.nativeElement.value * this.productPrice.nativeElement.value
		let DiscountAmount = ((grossAmount) * (this.discount.nativeElement.value / 100))
		let TaxAmmount = ((grossAmount-DiscountAmount) * (percentage / 100))

		let totalAmount = ((grossAmount + TaxAmmount) - DiscountAmount);
		this.POArray.push({
			productName: product,
			brandName: brand,
			taxId: +this.taxId.nativeElement.value,
			taxName: this.TaxList.filter(x => x.id == +this.taxId.nativeElement.value)[0].title,
			productId: Number(this.productId.nativeElement.value),
			productBrandId: Number(brandId),
			qtyRequired: this.quantity.nativeElement.value,
			discountAmount: DiscountAmount,
			discountPercent: this.discount.nativeElement.value,
			perUnitCost: this.productPrice.nativeElement.value,
			totalAmount: totalAmount,
			grossAmount: grossAmount,
			productUnit: this.ProductList.filter(o => o.id == Number(this.productId.nativeElement.value))[0].unitName,
			taxAmount: TaxAmmount,
		});
		this.discount.nativeElement.value = null;
		this.productId.nativeElement.value = null;
		this.taxId.nativeElement.value = null;
		this.quantity.nativeElement.value = null;
		this.productPrice.nativeElement.value = null;
	}
	Edit(item?) {
		this.discount.nativeElement.value = item.discountPercent;
		this.productId.nativeElement.value = item.productId;
		this.taxId.nativeElement.value = item.taxId;
		this.quantity.nativeElement.value = item.qtyRequired;
		this.productPrice.nativeElement.value = item.perUnitCost;
		let index = this.POArray.indexOf(x => x.id == item.id);
		this.POArray.splice(index,1);




	}
	async SplicePOArray(item) {
		this.POArray.splice(item, 1);
	}
}
