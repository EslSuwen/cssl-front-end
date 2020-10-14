import { Component, OnInit } from '@angular/core';
import {NoticeFile} from '../../entity/notice-file';
import {NoticeFileService} from '../../service/notice-file.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-teach',
  templateUrl: './teach.component.html',
  styleUrls: ['./teach.component.scss']
})
export class TeachComponent implements OnInit  {

  filePageIndex = 1;
  filePageSize = 5;
  fileTotal = 1;
  fileDataSet = [];
  fileLoading = true;

  files: NoticeFile[];

  constructor(private noticeFileService: NoticeFileService) {
  }

  ngOnInit(): void {
    this.noticeFileService.getAll().subscribe(result => {
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
