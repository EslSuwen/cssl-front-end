/**
 * NoticeFile对象
 *
 * @author suwen
 * @date 2020/8/29 下午1:08
 */
import {DateUtils} from "../utils/DateUtils";

export class NoticeFile {

    /** 通知文件编号 */
    fileId: number;

    /** 通知文件名 */
    fileName: string;

    /** 通知发布人编号 */
    tid: string;

    /** 通知文件发布时间 */
    fileDate: string;

    /** 通知文件 */
    file: any;

    constructor(fileName?: string, tid?: string, fileDate?: string) {
        this.fileName = fileName ? fileName : '';
        this.tid = tid ? tid : '';
        this.fileDate = fileDate ? fileDate : DateUtils.dateFormat();
    }

}
