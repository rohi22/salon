import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VendorUpdate } from '../../models/vendorupdate';
import { CommonService } from '../../Services/common.service';
import { VendorService } from '../../Services/vendor.service';

@Component({
	selector: 'kt-vendorupdate',
	templateUrl: './vendorupdate.component.html',
	styleUrls: ['./vendorupdate.component.scss']
})
export class VendorupdateComponent implements OnInit {
	Vendorform: FormGroup;
	hide: boolean;
	hideupdate: boolean;
	file: any;
	VendorList = [];

	constructor(private fb: FormBuilder, private _common: CommonService, private VendorService: VendorService,
		public dialogref: MatDialogRef<VendorupdateComponent>,
		@Inject(MAT_DIALOG_DATA) public data: VendorUpdate) { }

	async ngOnInit() {
		this.InitilizeForm();
		await this.GetAllVendor();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Vendorform = this.fb.group({
			'vendorName': ['', Validators.required],
			'id': ['', Validators.required],
		});
	}

	EditMOdal() {

		debugger
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Vendorform.controls['vendorName'].setValue(this.data.vendorName);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	async GetAllVendor() {
		this.VendorService.GetALLvendor().subscribe(res => {
			this.VendorList = res as [];
		})
	}

	onSubmit() {
		let formData = new FormData();
		formData.append('vendor1', JSON.stringify(this.Vendorform.value));
		formData.append('file', this.file);
		console.log(formData);
		this.VendorService.PostVendorUpdate(formData, this.getheader()).subscribe(res => {
			console.log("File upload response : " + res);
			this.close();
			alert("Save")
		});

	}

	toFormData<T>(formValue: T) {
		const formData = new FormData();
		for (const key of Object.keys(formValue)) {
			const value = formValue[key];
			formData.append(key, value);
		}
		return formData;
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
		console.log(this.file);
	}

	close() {
		this.dialogref.close();
	}
}
