import { ApiLinks } from './../../Services/APILinks';
import { HttpErrorResponse } from '@angular/common/http';
import { PurchaseorderService } from './../../Services/purchaseorder.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Printd } from 'printd'
import { WebsettingService } from '../../Services/websetting.service';

@Component({
	selector: 'kt-salereport',
	templateUrl: './salereport.component.html',
	styleUrls: ['./salereport.component.scss']
})
export class SalereportComponent implements OnInit {
	public dataSource = new MatTableDataSource<any>();
	displayedColumns: string[] = ['S.no', 'invoiceNumber', 'customerName', 'branchName', 'createdBy', 'discountAmount', 'receiveAmount', 'taxAmount', 'subTotal', 'totalBill', 'actions'];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	@ViewChild("printBtn", { static: true }) print: ElementRef;
	@ViewChild("printBtnthermal", { static: true }) printBtnthermal: ElementRef;
	CurrentData = []
	companyName: any;
	companyDescription: any;
	address: any;
	companyEmail: any;
	companyContact: any;
	faxNumber: any;
	web: any;
	logo: string;
	invoiceNumber: any;

	constructor(private poService: PurchaseorderService, private _WebsettingService: WebsettingService, private apiLinks: ApiLinks) { }

	async ngOnInit() {
		await this.getAllSalesReport();
		this.GetWebsetting()
	}

	GetWebsetting() {
		this._WebsettingService.getallWebsetting()
			.subscribe((res: any) => {
				this.companyName = res[0].companyName
				this.companyDescription = res[0].companyDescription
				this.address = res[0].address
				this.companyEmail = res[0].companyEmail
				this.companyContact = res[0].companyContact
				this.faxNumber = res[0].faxNumber
				this.web = res[0].web
				this.logo = this.apiLinks.imagePath + res[0].logo
			}, (err: HttpErrorResponse) => {
				alert(err.error)
			});
	}


	async getAllSalesReport() {
		this.poService.getAllSalesReport()
			.subscribe(res => {
				this.dataSource.data = res as [];

				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			}, (err: HttpErrorResponse) => {
				alert(err.message)
			});
	}

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	Print(element) {
		console.log(element)
		this.CurrentData = []
		this.invoiceNumber = element.invoiceNumber
		this.CurrentData.push(element);
		setTimeout(() => {
			this.print.nativeElement.click()
		}, 3000);

	}

	PrintThermal(element) {
		console.log(element)
		this.CurrentData = []
		this.invoiceNumber = element.invoiceNumber
		this.CurrentData.push(element);
		setTimeout(() => {
			this.printBtnthermal.nativeElement.click()
		}, 3000);
	}
}
