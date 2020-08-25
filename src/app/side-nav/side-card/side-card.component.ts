import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-side-card',
    templateUrl: './side-card.component.html',
    styleUrls: ['./side-card.component.scss']
})
export class SideCardComponent implements OnInit {
    isClick: boolean;

    constructor() {
    }

    ngOnInit() {
        this.isClick = false;
    }

    is_click() {
        this.isClick = !this.isClick;
    }

}
