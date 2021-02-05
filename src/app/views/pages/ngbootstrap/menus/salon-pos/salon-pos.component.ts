import { ProductService, CategoryService } from './../../../Services/product.service';
import { ApiLinks } from './../../../Services/APILinks';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'kt-salon-pos',
	templateUrl: './salon-pos.component.html',
	styleUrls: ['./salon-pos.component.scss']
})
export class SalonPosComponent implements OnInit, AfterViewInit {
	imageUrl: string;
	productList: any[] = [];
	productCategoryList: any[] = [];
	serviceCategoryList: any[] = [];
	catTypeCheck = true;
	sales = {
		branchId: null,
		branchName: null,
		customerId: null,
		customerName: null,
		discountAmount: 0,
		tax: null,
		taxAmount: 0,
		receiveAmount: 0,
		totalBill: 0,
		subTotal: 0,
		userId: null,
		status: null,
		productDetailsList: [],
		serviceDetailsList: []

	}
	serviceList: any[] = [];
	customerList: any[] = [];
	data: any[] = [];
	@ViewChild("new12", { static: true }) new121: ElementRef;
	constructor(private router: ActivatedRoute, private modalService: NgbModal, private _apiLink: ApiLinks, private _prodService: ProductService, private _catService: CategoryService) {
		this.imageUrl = this._apiLink.productImage;

	}
	ngOnInit() {
		this.getAllCustomers()
		this.data = this.router.snapshot.data.supplier;
		this.productCategoryList = this.data[0];
		this.serviceCategoryList = this.data[1];
	}
	getAllCustomers() {
		this._prodService.getAllCustomer().subscribe(res => {
			this.customerList = res as [];
		});
	}
	getProductByCategoryId(id: number) {
		// this.productList = [];
		this._prodService.getProductByCategoryId(id).subscribe(res => {
			this.productList = res as [];
			this.catTypeCheck = true;
			this.new121.nativeElement.click();
		});
	}
	getServiceByCategoryId(id: number) {
		// this.serviceList= [];
		this._prodService.getServiceByCategoryId(id).subscribe(res => {
			this.serviceList = res as [];
			this.catTypeCheck = false;
			this.new121.nativeElement.click();
		});
	}
	getAllCategoryByType() {
		forkJoin([
			this._catService.getCategoryByType(1),
			this._catService.getCategoryByType(2),

		])
			.subscribe((x: any) => {
				if (x) {
					this.productCategoryList = x[0];
					this.serviceCategoryList = x[1];
				}

			});
	}
	ngAfterViewInit() {
		// this.getAllCategoryByType()
	}
	openModal(event) {
		this.modalService.open(event, { ariaLabelledBy: 'modal-basic-title' })
	}
	ServiceQnty(i, type) {
		if (type == 1) {
			this.sales.serviceDetailsList[i].quantity += 1;
		} else {
			this.sales.serviceDetailsList[i].quantity -= 1;
		}
		this.getTotalAmount();
	}
	removeService(i) {

		this.sales.serviceDetailsList.splice(i, 1);
		this.getTotalAmount();
	}
	removeProduct(i) {
		this.sales.productDetailsList.splice(i, 1);
		this.getTotalAmount();
	}
	ProductQnty(i, type) {
		if (type == 1) {
			this.sales.productDetailsList[i].quantity += 1;
		} else {
			this.sales.productDetailsList[i].quantity -= 1;
		}
		this.getTotalAmount();
	}
	pushProduct(item) {
		let filter = [];
		if (this.sales.productDetailsList.length > 0) {
			filter = this.sales.productDetailsList.filter(x => x.productId == item.id);
			if (filter.length > 0) {
				this.sales.productDetailsList.filter(x => x.productId == item.id).map(x => {
					x.quantity += 1;
				});
			} else {
				this.sales.productDetailsList.push({
					productId: item.id,
					productName: item.productName,
					quantity: 1,
					price: item.price,
					grossAmount: item.price * 1,
					discountAmount: 0,
					totalPrice: item.price * 1,
				})
			}
		} else {
			this.sales.productDetailsList.push({
				productId: item.id,
				productName: item.productName,
				quantity: 1,
				price: item.price,
				grossAmount: item.price * 1,
				discountAmount: 0,
				totalPrice: item.price * 1,
			})
		}
		this.getTotalAmount();
	}
	pushService(item) {
		debugger
		let filter = [];
		if (this.sales.serviceDetailsList.length > 0) {
			filter = this.sales.serviceDetailsList.filter(x => x.servicesId == item.id);
			if (filter.length > 0) {
				this.sales.serviceDetailsList.filter(x => x.servicesId == item.id).map(x => {
					x.quantity += 1;
				});
			} else {
				this.sales.serviceDetailsList.push({
					servicesId: item.id,
					servicesName: item.name,
					quantity: 1,
					price: item.charges,
					grossAmount: item.charges * 1,
					discountAmount: 0,
					totalPrice: item.charges * 1,
				});
			}
		} else {
			this.sales.serviceDetailsList.push({
				servicesId: item.id,
				servicesName: item.name,
				quantity: 1,
				price: item.charges,
				grossAmount: item.charges * 1,
				discountAmount: 0,
				totalPrice: item.charges * 1,
			});
		}
		this.getTotalAmount();
	}
	getTotalAmount() {
		this.sales.totalBill = 0;
		if (this.sales.serviceDetailsList.length > 0) {
			let value = 0
			this.sales.serviceDetailsList.forEach(element => {
				value += (element.quantity * element.price)
			});
			this.sales.totalBill += value;
		}
		if (this.sales.productDetailsList.length > 0) {
			let value = 0
			this.sales.productDetailsList.forEach(element => {
				value += (element.quantity * element.price)
			});
			this.sales.totalBill += value;
		}
	}
	Save(isPrint) {

		if (this.sales.totalBill > this.sales.receiveAmount) {
			alert("Receive amount Can not be less then bill amount!")
			return null;
		}
		if (this.sales.customerId == null) {
			alert("Please select customer")
			return null;
		} else {
			this.customerList.filter(x => x.id == this.sales.customerId).map(x => {
				this.sales.customerName = x.name
			});
		}
		this._prodService.SaveSales(this.sales).subscribe(res => {
			if (res) {
				this.modalService.dismissAll();
				alert("Sale successful!")
			}
		})
		this.reset();

	}
	reset() {
		this.sales = {
			branchId: null,
			branchName: null,
			customerId: null,
			customerName: null,
			discountAmount: 0,
			tax: null,
			taxAmount: 0,
			receiveAmount: 0,
			totalBill: 0,
			subTotal: 0,
			userId: null,
			status: null,
			productDetailsList: [],
			serviceDetailsList: []

		}
		this.getTotalAmount();
	}
}
