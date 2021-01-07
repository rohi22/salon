import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerUpdate } from '../../models/customerupdate';
import { CommonService } from '../../Services/common.service';
import { CustomerService } from '../../Services/customer.service';

@Component({
	selector: 'kt-customerupdate',
	templateUrl: './customerupdate.component.html',
	styleUrls: ['./customerupdate.component.scss']
})
export class CustomerupdateComponent implements OnInit {
	Customerform: FormGroup;
	CustomerList = [];
	hide: boolean;
	hideupdate: boolean;
	file: any = null;

	constructor(private fb: FormBuilder, private _common: CommonService, private _CustomerService: CustomerService,
		public dialogref: MatDialogRef<CustomerupdateComponent>,
		@Inject(MAT_DIALOG_DATA) public data: CustomerUpdate) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.GetCustomer();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Customerform = this.fb.group({
			'name': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {

		debugger
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = false
			this.hideupdate = false;
			this.Customerform.controls['name'].setValue(this.data.name);
			this.file = this.data.image
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}
	async GetCustomer() {
		this._CustomerService.getAllCustomer().subscribe(res => {
			this.CustomerList = res as [];
		})
	}

	onSubmit() {
		debugger
		let formData = new FormData();
		formData.append('customer', JSON.stringify(this.Customerform.value));
		formData.append('file', this.file);
		this._CustomerService.PostCustomerUpdate(formData, this.getheader()).subscribe(res => {
			console.log("RESPONSE :", res);
			alert("Save")
			this.close();
		}, (er: HttpErrorResponse) => {
			alert(er.message);
		});

	}

	getheader() {
		let headers = localStorage.getItem("Authorization")
		const httpOptions = {
			headers: new HttpHeaders({
				Authorization: localStorage.getItem("Authorization"),
			}),
		};
		return httpOptions;
	}

	onFileChanged(event) {
		this.file = event.target.files[0];
	}

	close() {
		this.dialogref.close();
	}
}
