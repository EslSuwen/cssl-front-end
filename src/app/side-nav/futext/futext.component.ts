import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-futext',
    templateUrl: './futext.component.html',
    styleUrls: ['./futext.component.scss']
})
export class FutextComponent implements OnInit {
    public editor;
    public editorContent = ``;
    public placeholder = '这里进行编辑';

    constructor() {
    }

    ngOnInit() {
    }

    // 这里是提交数据
    onsubmit() {
        console.log(this.editorContent);
    }
}
