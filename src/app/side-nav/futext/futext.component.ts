import {Component, OnInit} from '@angular/core';
import {NoticeService} from "../../service/notice.service";
import {Notice} from "../../enity/notice";
import {AuthenticationService} from "../../service/authentication.service";
import {DateUtils} from "../../utils/DateUtils";
import {NoticeFileService} from "../../service/notice-file.service";
import {NzMessageService} from "ng-zorro-antd";
import {filter, map} from "rxjs/operators";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-futext',
    templateUrl: './futext.component.html',
    styleUrls: ['../card/card.component.scss'],
})
export class FutextComponent implements OnInit {
    switch = true;
    public editor;
    public editorContent = '';
    public placeholder = '这里进行编辑';
    noticeHead = '';
    fileForm = new FormData();
    uploadLoading = false;
    nzProgressVisible = false;
    nzProgress: number;

    constructor(private noticeService: NoticeService,
                private noticeFileService: NoticeFileService,
                private authService: AuthenticationService,
                private messageService: NzMessageService,
                private http: HttpClient) {
    }

    ngOnInit() {
    }

    // 提交数据
    onSubmit() {
        if (this.noticeHead.length == 0 || this.editorContent.length == 0) {
            this.messageService.error("通知标题和正文不能为空");
            return;
        }
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

    }

    // 含进度回显文件上传
    fileUpload() {
        this.uploadLoading = true;
        this.nzProgressVisible = true;
        this.http.post(`${environment.apiUrl}/noticeFile/add`, this.fileForm, {reportProgress: true, observe: 'events'})
            .pipe(
                filter((event => {
                    switch (event.type) {
                        case HttpEventType.UploadProgress: {
                            this.nzProgress = Number(((event.loaded / event.total) * 100).toFixed(2));
                            break;
                        }
                        case HttpEventType.Response: {
                            return true;
                        }
                    }
                    return false;
                })),
                map((res: HttpResponse<any>) => res.body)
            ).subscribe(result => {
            if (result.success) {
                this.messageService.success("通知文件上传成功");
            } else {
                this.messageService.error("通知文件上传失败");
            }
            this.uploadLoading = false;
            this.nzProgressVisible = false;
        });
    }
}
