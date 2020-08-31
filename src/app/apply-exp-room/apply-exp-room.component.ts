import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-apply-exp-room',
    templateUrl: './apply-exp-room.component.html',
    styleUrls: ['./apply-exp-room.component.scss']
})
export class ApplyExpRoomComponent implements OnInit {


    itemList = [];
    selectedItems = [];
    settings = {};

    constructor() {
    }

    ngOnInit() {


        this.itemList = [
            {id: 1, itemName: 'India'},

        ];

        this.selectedItems = [
            {id: 1, itemName: 'India'},
        ];
        this.settings = {
            text: 'Select Countries',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            classes: 'myclass custom-class-example'
        };
    }

    onItemSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }

    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }

    onSelectAll(items: any) {
        console.log(items);
    }

    onDeSelectAll(items: any) {
        console.log(items);
    }
}
