import {Component, OnInit} from '@angular/core';
import {NoticeService} from "../../service/notice.service";
import {Notice} from "../../enity/notice";
import {AuthenticationService} from "../../service/authentication.service";
import {DateUtils} from "../../utils/DateUtils";
import {NoticeFileService} from "../../service/notice-file.service";

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
    fileForm = new FormData();

    constructor(private noticeService: NoticeService,
                private noticeFileService: NoticeFileService,
                private authService: AuthenticationService) {
    }

    ngOnInit() {
    }

    // 提交数据
    onSubmit() {
        console.log(new Notice(this.authService.getUserNo(), this.noticeHead, this.editorContent));
        this.noticeService.addNotice(new Notice(this.authService.getUserNo(), this.noticeHead, this.editorContent)).subscribe();
    }

    fileChange(e: any) {
        let formData = new FormData();
        formData.append('fileName', e.file.name);
        formData.append('tid', this.authService.getUserNo());
        formData.append('fileDate', DateUtils.dateFormat());
        formData.append('nFile', e.file);

        this.fileForm = formData;
        console.log(this.fileForm.get("nFile"));
        console.log(this.fileForm.get("fileName"));
        // 测试通知文件上传
        this.noticeFileService.add(formData).subscribe();
    }
}
