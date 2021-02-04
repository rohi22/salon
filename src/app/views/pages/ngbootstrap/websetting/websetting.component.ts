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
	constructor(private fb: FormBuilder,private _WebsettingService: WebsettingService, private _common: CommonService,
		  ) { }

	ngOnInit() {
		this.InitilizeForm();

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
		this.EditMOdal();
	}

	EditMOdal() {
			this._WebsettingService.getallWebsetting()
				.subscribe((res:any) => {
		if (res[0] && res[0].id && res[0] !== undefined) {
			this.hide = true
			this.hideupdate = false;
			this.Websettingform.controls['companyName'].setValue(res[0].companyName);
			this.Websettingform.controls['companyDescription'].setValue(res[0].companyDescription);
			this.Websettingform.controls['address'].setValue(res[0].address);
			this.Websettingform.controls['companyEmail'].setValue(res[0].companyEmail);
			this.Websettingform.controls['companyContact'].setValue(res[0].companyContact);
			this.Websettingform.controls['faxNumber'].setValue(res[0].faxNumber);
			this.Websettingform.controls['web'].setValue(res[0].web);
			this.Websettingform.controls['id'].setValue(res[0].id);

		}
		else {
			this.hide = false;
			this.hideupdate = true
		}
	});
	}

	onSubmit() {
		const formData = new FormData();
		formData.append("settingString", JSON.stringify(this.Websettingform.value));
		formData.append("file", this.file);
		console.log(formData)
		debugger
		this._WebsettingService.PostWebsetting(formData, this._common.getHeaerOptions()).subscribe(res => {
			console.log("RESPONSE :", res);
			alert("Save");
		}, (err: HttpErrorResponse) => {
			alert(err.message);
		});
	}

	UPdate() {
		// this.Websettingform.controls['id'].setValue(this.data.id)
		this._WebsettingService.PutWebsetting(this.Websettingform.value, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			alert("Update")
			this.EditMOdal();
			this.close()
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error.message)
			this.close()
		});
	}

	close() {
		// this.dialogref.close();
	}

	onFileChanged(event) {
		this.file = event.target.files[0];
	}
}
