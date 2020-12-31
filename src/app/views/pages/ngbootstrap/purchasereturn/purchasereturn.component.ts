import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseReturn } from '../../models/purchasereturn';
import { CommonService } from '../../Services/common.service';
import { ProductService } from '../../Services/product.service';
import { PurchasereturnService } from '../../Services/purchasereturn.service';
import { VendorbillService } from '../../Services/vendorbill.service';

@Component({
	selector: 'kt-purchasereturn',
	templateUrl: './purchasereturn.component.html',
	styleUrls: ['./purchasereturn.component.scss']
})
export class PurchasereturnComponent implements OnInit {
	POReturnform: FormGroup;
	BillList = [];
	ProductList = []
	hide: boolean;
	hideupdate: boolean;
	ReturnArray = [];
	@ViewChild('wizard', { static: true }) el: ElementRef;
	@ViewChild('productId', { static: true }) productId: ElementRef;
	@ViewChild('returnQuantity', { static: true }) returnQuantity: ElementRef;
	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<PurchasereturnComponent>, private _VendorbillService: VendorbillService,
		private _ProductService: ProductService,
		private PurchasereturnService: PurchasereturnService,
		@Inject(MAT_DIALOG_DATA) public data: PurchaseReturn) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.getAllProduct();
		await this.getAllProduct();
		await this.getAllVendorBill();
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
		this.POReturnform = this.fb.group({
			'id': ['', Validators.required],
			'title': ['', Validators.required],
			'tax': ['', Validators.required],
			'discount': ['', Validators.required],
			'poNumber': ['', Validators.required],
			'vendorId': ['', Validators.required],
			'vendorName': ['', Validators.required],
			'branchName': ['', Validators.required],
			'branchId': ['', Validators.required],

			'poDetail': ['', Validators.required],

		});
	}

	async getAllProduct() {
		this._ProductService.getAllProduct().subscribe(res => {
			this.ProductList = res as [];
		})
	}

	async getAllVendorBill() {
		this._VendorbillService.getAllVendorBill().subscribe(res => {
			this.BillList = res as [];
		})
	}

	onSubmit() {
		this.POReturnform.controls['poDetail'].setValue(this.ReturnArray);
		debugger
		console.log(this.POReturnform.value)
		this.PurchasereturnService.POstPOReturn(this.POReturnform.value, this._common.getHeaerOptions()).subscribe(res => {
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

	async AddPReturnarray() {
		const product = this.ProductList.filter(o => o.id == Number(this.productId.nativeElement.value))[0].productName;
		this.ReturnArray.push({
			productName: product,
			productId: Number(this.productId.nativeElement.value),
			returnQuantity: this.returnQuantity.nativeElement.value,
		});
	}

	async SpliceReturnArray(item) {
		this.ReturnArray.splice(item, 1);
	}
}
