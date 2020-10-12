import {DateUtils} from '../utils/DateUtils';

/**
 * 通知实体
 *
 * @author suwen
 * @since 2020-08-24
 */
export class Notice {

    /** 通知编号 */
    nid: number;

    /** 通知发布人编号 */
    tid: string;

    /** 通知发布时间 */
    noticeDate: string;

    /** 通知标题 */
    noticeHead: string;

    /** 通知正文 */
    noticeContent: string;

    /** 通知发布人姓名 */
    tname: string;

    /** 通知类型 */
    noticeType: string;

    constructor(tid?: string, noticeType?: string, noticeHead?: string, noticeContent?: string, noticeDate?: string) {
        this.tid = tid ? tid : '';
        this.noticeType = noticeType ? noticeType : '通知';
        this.noticeHead = noticeHead ? noticeHead : '';
        this.noticeDate = noticeDate ? noticeDate : DateUtils.now();
        this.noticeContent = noticeContent ? noticeContent : '';
    }
}
