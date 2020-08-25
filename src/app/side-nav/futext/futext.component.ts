import {Component, OnInit} from '@angular/core';
import {NoticeService} from "../../service/notice.service";
import {Notice} from "../../enity/notice";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
    selector: 'app-futext',
    templateUrl: './futext.component.html',
    styleUrls: ['./futext.component.scss']
})
export class FutextComponent implements OnInit {
    public editor;
    public editorContent = '';
    public placeholder = '这里进行编辑';
    noticeHead: string;

    constructor(private noticeService: NoticeService, private authService: AuthenticationService) {
    }

    ngOnInit() {
    }

    // 提交数据
    onSubmit() {
        console.log(new Notice(this.authService.getUserNo(), this.noticeHead, this.editorContent));
        this.noticeService.addNotice(new Notice(this.authService.getUserNo(), this.noticeHead, this.editorContent)).subscribe();
    }
}
