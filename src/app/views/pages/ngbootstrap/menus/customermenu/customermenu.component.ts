import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../Services/customer.service';

@Component({
	selector: 'kt-customermenu',
	templateUrl: './customermenu.component.html',
	styleUrls: ['./customermenu.component.scss']
})
export class CustomermenuComponent implements OnInit {
	CustomerForm: FormGroup
	constructor(private fb: FormBuilder, private CustomerService: CustomerService) { }

	ngOnInit() {
		this.initForm()
	}

	initForm() {
		this.CustomerForm = this.fb.group({
			name: ['', Validators.required],
			contact: ['', Validators.required],
			address: ['', Validators.required],
		})
	}

	SaveCustomer() {
		this.CustomerService.PostCustomer(this.CustomerForm.value).subscribe(res => {
			alert("customer Added Successfully..")
			this.CustomerForm.reset()
		}, (err: HttpErrorResponse) => {
			if (err.status == 200) {
				alert("customer Added Successfully..");
				this.CustomerForm.reset()
			}
			else{
				alert(err.error)
			}
		})
	}

}
