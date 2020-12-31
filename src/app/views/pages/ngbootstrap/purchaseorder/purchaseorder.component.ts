import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PurchaseOrder } from '../../models/purchaseorder';
import { BrandsService } from '../../Services/brands.service';
import { CommonService } from '../../Services/common.service';
import { ProductService } from '../../Services/product.service';
import { PurchaseorderService } from '../../Services/purchaseorder.service';
import { VendorService } from '../../Services/vendor.service';
import { BranchService } from '../../user-management/branch/branch.service';

@Component({
	selector: 'kt-purchaseorder',
	templateUrl: './purchaseorder.component.html',
	styleUrls: ['./purchaseorder.component.scss']
})
export class PurchaseorderComponent implements OnInit {
	POform: FormGroup;
	ProductList = [];
	BrandList = [];
	VendorList = [];
	BranchList = [];
	hide: boolean;
	hideupdate: boolean;
	POArray = [];
	@ViewChild('wizard', { static: true }) el: ElementRef;
	@ViewChild('productId', { static: true }) productId: ElementRef;
	@ViewChild('productBrandId', { static: true }) productBrandId: ElementRef;
	@ViewChild('quantity', { static: true }) quantity: ElementRef;
	@ViewChild('productPrice', { static: true }) productPrice: ElementRef;
	constructor(private fb: FormBuilder, private _common: CommonService,
		public dialogref: MatDialogRef<PurchaseorderComponent>, private _BranchService: BranchService,
		private _VendorService: VendorService, private _ProductService: ProductService, private _BrandsService: BrandsService,
		private _PurchaseorderService: PurchaseorderService,
		@Inject(MAT_DIALOG_DATA) public data: PurchaseOrder) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.EditMOdal();
		await this.getAllProduct();
		await this.getAllBrand();
		await this.getAllBranch();
		await this.GetALLvendor();
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
		this.POform = this.fb.group({
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

	async EditMOdal() {
		debugger
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.POform.controls['title'].setValue(this.data.title);
			this.POform.controls['tax'].setValue(this.data.tax);
			this.POform.controls['discount'].setValue(this.data.discount);
			this.POform.controls['poNumber'].setValue(this.data.poNumber);
			this.POform.controls['vendorId'].setValue(this.data.vendorID);
			this.POform.controls['vendorName'].setValue(this.data.vendorName);
			this.POform.controls['branchName'].setValue(this.data.branchName);
			this.POform.controls['branchId'].setValue(this.data.branchId);
			this.POArray = this.data.polist;
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

	async getAllBranch() {
		this._BranchService.getAllBranch().subscribe(res => {
			this.BranchList = res as [];
		})
	}

	async getAllProduct(){
		this._ProductService.getAllProduct().subscribe(res => {
			this.ProductList = res as [];
		})
	}

	async getAllBrand(){
		this._BrandsService.getAllBrands().subscribe(res => {
			this.BrandList = res as [];
		})
	}

	UPdate() {
		// this.POform.controls['id'].setValue(this.data.id)
		// this.POform.controls['poDetail'].setValue(this.AllowncesArray);
		console.log(this.POform.value)
		this._PurchaseorderService.EditPO(this.POform.value, this._common.getHeaerOptions()).subscribe(res => {
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
		this.POform.controls['poDetail'].setValue(this.POArray);
		debugger
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
		const product = this.ProductList.filter(o => o.id == Number(this.productId.nativeElement.value))[0].productName;
		const brand = this.BrandList.filter(o => o.id == Number(this.productBrandId.nativeElement.value))[0].brand;
		this.POArray.push({
			productName: product,
			brandName: brand,
			productId: Number(this.productId.nativeElement.value),
			productBrandId: Number(this.productBrandId.nativeElement.value),
			quantity: this.quantity.nativeElement.value,
			productPrice: this.productPrice.nativeElement.value
		});
	}

	async SplicePOArray(item) {
		this.POArray.splice(item, 1);
	}
}
