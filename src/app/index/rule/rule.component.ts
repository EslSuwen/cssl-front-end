import {Component, OnInit} from '@angular/core';
import {NoticeService} from '../../service/notice.service';
import {Notice} from '../../entity/notice';

@Component({
    selector: 'app-rule',
    templateUrl: './rule.component.html',
    styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {

    filePageIndex = 1;
    filePageSize = 5;
    fileTotal = 1;
    fileDataSet = [];
    fileLoading = true;

    noticeInfoVisible = false;
    noticeInfo: Notice;

    files: Notice[];

    constructor(private noticeService: NoticeService) {
    }

    ngOnInit(): void {
        this.noticeService.getAllNotice('规章').subscribe(result => {
            if (result.success) {
                this.files = result.data;
                this.files.forEach(each => each.noticeDate = each.noticeDate.substr(0, 10));
                this.updateFileData(true);
            }
        });
    }

    updateFileData(reset: boolean = false): void {
        if (reset) {
            this.filePageIndex = 1;
        }
        this.fileLoading = true;
        this.fileDataSet = this.files;
        this.fileTotal = this.fileDataSet.length;
        this.fileDataSet =
            this.fileDataSet.slice((this.filePageIndex - 1) * this.filePageSize,
                (this.filePageIndex - 1) * this.filePageSize + this.filePageSize);
        this.fileLoading = false;
    }

    showNoticeInfo(nid: number) {
        this.noticeService.getNoticeById(nid).subscribe(result => {
            if (result.success) {
                this.noticeInfo = result.data;
                this.noticeInfoVisible = true;
            }
        });
    }

    deleteNotice(nid: string | number) {
        this.noticeService.removeNotice(nid).subscribe(result => {
            if (result.success) {
                this.files = this.files.filter(each => each.nid != nid);
                this.updateFileData(true);
            }
        });
    }

}
