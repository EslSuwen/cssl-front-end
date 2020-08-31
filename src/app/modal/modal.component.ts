import {Component, OnInit} from '@angular/core';
import {MDBModalRef} from 'angular-bootstrap-md';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    show() {
        throw new Error("Method not implemented.");
    }

    hide() {
        throw new Error("Method not implemented.");
    }

    constructor(public modalRef: MDBModalRef) {

    }

    ngOnInit() {
    }

}
