import {Component, OnInit} from '@angular/core';
import {NoticeService} from '../../service/notice.service';
import {Notice} from '../../entity/notice';
import {AuthenticationService} from '../../service/authentication.service';
import {DateUtils} from '../../utils/DateUtils';
import {NoticeFileService} from '../../service/notice-file.service';
import {filter, map} from 'rxjs/operators';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {NzUploadFile} from 'ng-zorro-antd/upload';

@Component({
    selector: 'app-notice',
    templateUrl: './notice.component.html',
    styleUrls: ['../card/card.component.scss'],
})
export class NoticeComponent implements OnInit {
    switch = true;
    public editor;
    public editorContent = '';
    public placeholder = '这里进行编辑';
    noticeHead = '';
    noticeType = '通知';
    uploadLoading = false;
    nzProgressVisible = false;
    nzProgress: number;

    // 文件上传
    uploading = false;
    fileList: NzUploadFile[] = [];

    constructor(private noticeService: NoticeService,
                private noticeFileService: NoticeFileService,
                private authService: AuthenticationService,
                private notification: NzNotificationService,
                private http: HttpClient) {
    }

    ngOnInit() {
    }

    // 提交数据
    onSubmit() {
        if (this.noticeHead.length == 0 || this.editorContent.length == 0) {
            this.notification.error('通知标题和正文不能为空', '请输入标题和正文');
            return;
        }
        console.log(new Notice(this.authService.getUserNo(), this.noticeHead, this.editorContent));
        this.noticeService.addNotice(new Notice(this.authService.getUserNo(), this.noticeType, this.noticeHead, this.editorContent))
            .subscribe(result => {
            if (result.success) {
                this.notification.success('新增成功', `通知" ${this.noticeHead} "新增成功`);
                this.noticeHead = '';
                this.noticeType = '通知';
                this.editorContent = '';
            } else {
                this.notification.success('新增失败', `通知文件" ${this.noticeHead} "新增失败`);
            }
        });
    }

    // 含进度回显文件上传
    fileUpload(formData: FormData) {
        this.uploadLoading = true;
        this.nzProgressVisible = true;
        this.http.post(`${environment.apiUrl}/noticeFile/add`, formData, {reportProgress: true, observe: 'events'})
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
                this.notification.success('上传成功', `通知文件" ${formData.get('fileName')} "上传成功`);
            } else {
                this.notification.success('上传失败', `通知文件" ${formData.get('fileName')} "上传失败`);
            }
            this.handleUpload();
        });
    }

    beforeUpload = (file: NzUploadFile): boolean => {
        this.fileList = this.fileList.concat(file);
        return false;
    }

    handleUpload(): void {
        const uploadFile: any = this.fileList.pop();
        if (uploadFile !== undefined) {
            const formData = new FormData();
            formData.append('fileName', uploadFile.name);
            formData.append('tid', this.authService.getUserNo());
            formData.append('fileDate', DateUtils.now());
            formData.append('nFile', uploadFile);
            this.fileUpload(formData);
        } else {
            this.uploading = false;
            this.uploadLoading = false;
            this.nzProgressVisible = false;
        }
    }
}
