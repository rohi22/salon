import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'kt-salon-pos',
	templateUrl: './salon-pos.component.html',
	styleUrls: ['./salon-pos.component.scss']
})
export class SalonPosComponent implements OnInit {

	constructor(private modalService: NgbModal) { }

	ngOnInit() {
	}

	openModal(event) {
		this.modalService.open(event, { ariaLabelledBy: 'modal-basic-title' })
	}
}
