import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WebSetting } from '../../models/websetting';
import { CommonService } from '../../Services/common.service';
import { WebsettingService } from '../../Services/websetting.service';

@Component({
	selector: 'kt-websetting',
	templateUrl: './websetting.component.html',
	styleUrls: ['./websetting.component.scss']
})
export class WebsettingComponent implements OnInit {
	Websettingform: FormGroup;
	hideupdate: boolean;
	hide: boolean;
	file: string;
	constructor(private fb: FormBuilder, private _common: CommonService, public dialogref: MatDialogRef<WebsettingComponent>,
		@Inject(MAT_DIALOG_DATA) public data: WebSetting, private WebsettingService: WebsettingService) { }

	async ngOnInit() {
		this.InitilizeForm();
		this.EditMOdal();
	}

	InitilizeForm() {
		this.Websettingform = this.fb.group({
			'id': ['', Validators.required],
			'companyName': ['', Validators.required],
			'companyDescription': ['', Validators.required],
			'address': ['', Validators.required],
			'companyEmail': ['', Validators.required],
			'companyContact': ['', Validators.required],
			'faxNumber': ['', Validators.required],
			'web': ['', Validators.required],
		})
	}

	EditMOdal() {

		debugger
		if (this.data && this.data.id && this.data !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Websettingform.controls['companyName'].setValue(this.data.companyName);
			this.Websettingform.controls['companyDescription'].setValue(this.data.companyDescription);
			this.Websettingform.controls['address'].setValue(this.data.address);
			this.Websettingform.controls['companyEmail'].setValue(this.data.companyEmail);
			this.Websettingform.controls['companyContact'].setValue(this.data.companyContact);
			this.Websettingform.controls['faxNumber'].setValue(this.data.faxNumber);
			this.Websettingform.controls['web'].setValue(this.data.web);
		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	}

	onSubmit() {
		const formData = new FormData();
		formData.append("settingString", JSON.stringify(this.Websettingform.value));
		formData.append("file", this.file);
		console.log(formData)
		debugger
		this.WebsettingService.PostWebsetting(formData, this._common.getHeaerOptions()).subscribe(res => {
			console.log("RESPONSE :", res);
			alert("Save");
		}, (err: HttpErrorResponse) => {
			alert(err.message);
		});
	}

	UPdate() {
		this.Websettingform.controls['id'].setValue(this.data.id)
		this.WebsettingService.PutWebsetting(this.Websettingform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Update")
			this.close()
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error.message)
			this.close()
		});
	}

	close() {
		this.dialogref.close();
	}

	onFileChanged(event) {
		this.file = event.target.files[0];
	}
}
