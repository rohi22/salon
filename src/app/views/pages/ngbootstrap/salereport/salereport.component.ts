import { PurchaseorderService } from './../../Services/purchaseorder.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Printd } from 'printd'

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

	constructor(private poService: PurchaseorderService) { }

	async ngOnInit() {
		await this.getAllSalesReport();
	}

	async getAllSalesReport() {
		this.poService.getAllSalesReport()
			.subscribe(res => {
				this.dataSource.data = res as [];
				debugger
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			});
	}

	public doFilter = (value: string) => {
		this.dataSource.filter = value.trim().toLocaleLowerCase();
	}

	Print(element) {
		const cssText = `
  h1 {
    color: black;
    font-family: sans-serif;
  }
`
		const d = new Printd()
		d.print(document.getElementById('myelement'), [cssText])
	}
}
