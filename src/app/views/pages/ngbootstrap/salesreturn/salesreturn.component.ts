import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SalesReturn } from '../../models/salesreturn';
import { CommonService } from '../../Services/common.service';
import { CustomerbillService } from '../../Services/customerbill.service';
import { ProductService } from '../../Services/product.service';
import { SalesreturnService } from '../../Services/salesreturn.service';
import { VendorbillService } from '../../Services/vendorbill.service';

@Component({
	selector: 'kt-salesreturn',
	templateUrl: './salesreturn.component.html',
	styleUrls: ['./salesreturn.component.scss']
})
export class SalesreturnComponent implements OnInit {
	SalesReturnform: FormGroup;
	BillList = [];
	ProductList = []
	hide: boolean;
	hideupdate: boolean;
	ReturnArray = [];
	@ViewChild('productId', { static: true }) productId: ElementRef;
	@ViewChild('returnQuantity', { static: true }) returnQuantity: ElementRef;
	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<SalesreturnComponent>, private _CustomerbillService: CustomerbillService,
		private _ProductService: ProductService,
		private _SalesreturnService: SalesreturnService,
		@Inject(MAT_DIALOG_DATA) public data: SalesReturn) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.getAllProduct();
		await this.GetCustomerBill();
	}

	InitilizeForm() {
		this.SalesReturnform = this.fb.group({
			'id': ['', Validators.required],
			'customerBillId': ['', Validators.required],
			'list': ['', Validators.required],
		});
	}

	async getAllProduct() {
		this._ProductService.getAllProduct().subscribe(res => {
			this.ProductList = res as [];
		})
	}

	async GetCustomerBill() {
		this._CustomerbillService.GetCustomerBill().subscribe(res => {
			this.BillList = res as [];
		})
	}

	onSubmit() {
		this.SalesReturnform.controls['list'].setValue(this.ReturnArray);
		debugger
		console.log(this.SalesReturnform.value)
		this._SalesreturnService.postPostpurchasereturn(this.SalesReturnform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Save")
			this.close();
		}, (err: HttpErrorResponse) => {
			alert(err.error);
			console.log(err);
		});

	}

	close() {
		this.dialogref.close();
	}

	async AddPReturnarray() {
		const product = this.ProductList.filter(o => o.id == Number(this.productId.nativeElement.value))[0].productName;
		this.ReturnArray.push({
			productName: product,
			productId: Number(this.productId.nativeElement.value),
			returnQuantity: Number(this.returnQuantity.nativeElement.value),
		});
	}

	async SpliceReturnArray(item) {
		this.ReturnArray.splice(item, 1);
	}
}
