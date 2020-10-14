import { Component, OnInit } from '@angular/core';
import {NoticeFile} from '../../entity/notice-file';
import {environment} from '../../../environments/environment';
import {NoticeService} from '../../service/notice.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit  {

  filePageIndex = 1;
  filePageSize = 5;
  fileTotal = 1;
  fileDataSet = [];
  fileLoading = true;

  files: NoticeFile[];

  constructor(private noticeService: NoticeService) {
  }

  ngOnInit(): void {
    this.noticeService.getAllNotice('规章').subscribe(result => {
      if (result.success) {
        this.files = result.data;
        this.files.forEach(each => each.fileDate = each.fileDate.substr(0, 10));
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

  filePreview(fileId: number, fileName: string) {
    const fileUrl = this.noticeFileService.getFileUri(fileId);
    const previewUrl = `${fileUrl}?fullfilename=${fileName}`;
    window.open(`${environment.filePreviewUrl}/onlinePreview?url=` + encodeURIComponent(previewUrl));
  }

  fileDownLoad(fileId: number) {
    window.location.href = this.noticeFileService.getFileUri(fileId);
  }

  deleteNoticeFile(fileId: string | number) {
    this.noticeFileService.remove(fileId).subscribe(result => {
      if (result.success) {
        this.files = this.files.filter(each => each.fileId != fileId);
        this.updateFileData(true);
      }
    });
  }

}
