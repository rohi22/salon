import { ProductService } from './../../Services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GRN } from '../../models/grn';
import { CommonService } from '../../Services/common.service';
import { GrnserviceService } from '../../Services/grnservice.service';
import { PurchaseorderService } from '../../Services/purchaseorder.service';
import { Product } from '../../models/product';
import { DatePipe } from '@angular/common';
const basicTabs = {
	beforeCodeTitle: 'Generate GRN',
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
	selector: 'kt-grn',
	templateUrl: './grn.component.html',
	styles: [`
	.demo-tab-group {
		border: 1px solid #e8e8e8;
	  }
	  .demo-tab-content {
		padding: 16px;
	  }
	`]
})
export class GrnComponent implements OnInit {
	GRNform: FormGroup;
	POList = [];
	hideupdate: boolean;
	hide: boolean;
	exampleBasicTabs;
	PoId: any;
	poDetails: any;
	products: Product[];
	rcv = 0;
	PurchaseOrder: any = {
		grnTitle: "",
		receiveDate: null,
		purchaseOrderId: null,
		userId: null,
		vendorId: null,
		branchId: null,
		grnType: "Po_GRN",
		list: []
	};
	constructor(private fb: FormBuilder, private _common: CommonService, private datePipe: DatePipe,
		public dialogref: MatDialogRef<GrnComponent>, private _ProductService: ProductService, private _GrnserviceService: GrnserviceService,
		@Inject(MAT_DIALOG_DATA) public data: GRN, private POService: PurchaseorderService) { }

	async ngOnInit() {
		this.exampleBasicTabs = basicTabs;
		this.InitilizeForm();
		await this.getAllPO();
		await this.getAllProducts();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.GRNform = this.fb.group({
			'purchaseOrderId': ['', Validators.required],
			'prodId': ['', Validators.required],
			'receivedQuantity': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}
	async getAllProducts() {
		this._ProductService.getAllProduct()
			.subscribe(res => {
				this.products = res as Product[];
			});
	}
	EditMOdal() {
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.PoId = this.data.poId;
			this.PurchaseOrder.id = this.data.id;
			this.PurchaseOrder.grnTitle = this.data.grnTitle;
			this.PurchaseOrder.receiveDate = this.datePipe.transform(this.data.receiveDate, 'yyyy-MM-dd');
			this.PurchaseOrder.purchaseOrderId = this.data.poId;
			this.PurchaseOrder.userId = this.data.createdById;
			this.PurchaseOrder.vendorId = this.data.vendorId;
			this.PurchaseOrder.branchId = this.data.branchId;
			this.PurchaseOrder.grnType = this.data.grnType;
			this.PurchaseOrder.list = this.data.list;
			this.poDetails = this.data.list;

		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}
	getBalance(i, value) {

		console.log(value);
		this.poDetails[i].received = value;
		(+this.poDetails[i].qtyRequired - +this.poDetails[i].received) >= 0 ? this.poDetails[i].difference = (+this.poDetails[i].qtyRequired - +this.poDetails[i].received) :
			this.poDetails[i].difference = 0;

		(+this.poDetails[i].qtyRequired - +this.poDetails[i].received) < 0 ? this.poDetails[i].exceed = (+this.poDetails[i].received - +this.poDetails[i].qtyRequired) : this.poDetails[i].exceed = 0;


	}
	addRow() {
		this.poDetails.push({
			productId: null,
			productUnit: null,
			productBrandId: null,
			qtyRequired: 0,
			received: 0,
			Balance: 0,
			exceed: 0
		})
	}
	removeRow(i) {
		this.poDetails.splice(i, 1);
	}
	getPurchaseOrder() {
		this.POService.getPOByID(this.PoId).subscribe((data: any) => {
			this.poDetails = [];

			this.PurchaseOrder.purchaseOrderId = data.id,
				this.PurchaseOrder.vendorId = data.vendorId,
				this.PurchaseOrder.branchId = data.branchId,
				this.PurchaseOrder.grnType = "Po_GRN",

				this.poDetails = data.poList;
			if (this.poDetails != null && this.poDetails != []) {
				this.poDetails.forEach((element: any) => {
					element.received = 0;
					element.difference = 0;
					element.exceed = 0;
				});
			}

			console.log('poDetail', data.poList);
		})
	}
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.GRNform.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	async getAllPO() {
		this.POService.getAllPO().subscribe(data => {
			this.POList = data as [];
		})
	}

	UPdate(title, date) {
		this.PurchaseOrder.grnTitle = title;
		this.PurchaseOrder.receiveDate = date;
		if (this.poDetails.length > 0) {
			this.PurchaseOrder.list = [];
			this.poDetails.forEach((element: any) => {
				this.PurchaseOrder.list.push({
					brandId: element.productBrandId,
					difference: element.difference,
					exceed: element.exceed,
					productId: element.productId,
					productName: element.productName,
					productUnit: element.productUnit,
					qtyRequired: element.qtyRequired,
					received: element.received,
				});
			});
		}
		this._GrnserviceService.EditGrn(this.PurchaseOrder, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Update")
			this.close()
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error)
			this.close()
		});
	}
	onProdSelect(i, id) {

		let item: any = this.products.filter(x => x.id == id)
		this.poDetails[i].productId = item[0].id
		this.poDetails[i].productName = item[0].productName
		this.poDetails[i].productUnit = item[0].unitName
		this.poDetails[i].productBrandId = item[0].brandId
	}
	onSubmit(title, date) {

		this.PurchaseOrder.grnTitle = title;
		this.PurchaseOrder.receiveDate = date;
		this.poDetails.forEach((element: any) => {
			this.PurchaseOrder.list.push({
				brandId: element.productBrandId,
				difference: element.difference,
				exceed: element.exceed,
				productId: element.productId,
				productName: element.productName,
				productUnit: element.productUnit,
				qtyRequired: element.qtyRequired,
				received: element.received,
			});
		});
		this._GrnserviceService.postGrnByPO(this.PurchaseOrder).subscribe(res => {
			console.log(res);
			alert('save')
		}, error => {
			alert(error.error)
		});
		this.close();
	}

	// onSubmit() {
	// 	this._GrnserviceService.SaveGrn(this.GRNform.value, this._common.getHeaerOptions()).subscribe(res => {
	// 		console.log(res);
	// 	});
	// 	this.close();
	// }

	close() {
		this.dialogref.close();
	}
}
