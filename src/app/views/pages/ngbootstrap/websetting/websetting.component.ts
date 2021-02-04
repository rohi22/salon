import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
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
	public webSettingObject = new Subject<any>()
	faviconfile: any;
	constructor(private fb: FormBuilder, private _WebsettingService: WebsettingService, private _common: CommonService,
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
			.subscribe((res: any) => {
				if (res[0] && res[0].id && res[0] !== undefined) {
					this.hide = false
					this.hideupdate = true;
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
					this.hide = true;
					this.hideupdate = false
				}
			}, (err: HttpErrorResponse) => {
				alert(err.error)
			});
	}

	onSubmit() {
		if (this.file) {
			const formData = new FormData();
			formData.append("settingString", JSON.stringify(this.Websettingform.value));
			formData.append("file", this.file);
			formData.append("favIcon", this.faviconfile);
			console.log(formData)
			this._WebsettingService.PostWebsetting(formData, this._common.getHeaerOptions()).subscribe(res => {
				console.log("RESPONSE :", res);
				this._WebsettingService.websettingObject.next(res)
				alert("Save");
			}, (err: HttpErrorResponse) => {
				alert(err.error);
			});
		}
		else {
			alert("file cannot be empty");
		}

	}

	UPdate() {
		const formData = new FormData();
		formData.append("settingString", JSON.stringify(this.Websettingform.value));
		formData.append("file", this.file);
		formData.append("favIcon", this.faviconfile);
		console.log(formData)
		this._WebsettingService.PutWebsetting(formData, this._common.getHeaerOptions()).subscribe(res => {
			console.log(res);
			this._WebsettingService.websettingObject.next(res)
			alert("Update")
			this.EditMOdal();
		}, (error: HttpErrorResponse) => {
			console.log(error);
			alert(error.error)
		});
	}

	close() {
		// this.dialogref.close();
	}

	onFileChanged(event) {
		this.file = event.target.files[0];
	}

	onFileChangedFav(event) {
		this.faviconfile = event.target.files[0];
	}
}
