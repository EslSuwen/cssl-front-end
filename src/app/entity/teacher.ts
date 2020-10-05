import {DateUtils} from '../utils/DateUtils';

/**
 * 教师个人信息类
 *
 * @author suwen
 */
export class Teacher {
    /** 教职工号 */
    tid: string;

    /** 教师姓名 */
    tname: string;

    /** 教师电话 */
    tphone: string;

    /** 教师QQ */
    tqq: string;

    /** 教师邮箱 */
    temail: string;

    /** 密码 */
    tpassword: string;

    /** 权限等级(0:教师用户;1:管理员用户;2:管理员用户) */
    authority: number;
}


export class Teach {
    /** 教职工号 */
    tid: string;

    /** 课程号 */
    courseId: number;

    /** 教职工号 */
    tname: string;

    /** 课程名 */
    courseName: string;

    constructor(tid?: string, courseId?: number) {
        this.tid = tid ? tid : '';
        this.courseId = courseId ? courseId : 0;
    }
}


/**
 * 用户消息实体
 */
export class TeacherMsg {

    /** 消息编号 */
    mid: number;

    /** 教师编号 */
    tid: string;

    /** 通知标题 */
    mtitle: string;

    /** 通知结果 */
    mresult: number;

    /** 消息创建时间 */
    mdate: string;

    /** 消息内容 */
    mtext: string;

    /** 消息状态 */
    mstatus: number;

    constructor(tid?: string, mtitile?: string, mtext?: string, mresult?: number, mdate?: string, mstatus?: number) {
        this.tid = tid ? tid : '';
        this.mtitle = mtitile ? mtitile : '';
        this.mdate = mdate ? mdate : DateUtils.dateFormat();
        this.mtext = mtext ? mtext : '';
        this.mstatus = mstatus ? mstatus : 0;
        this.mresult = mresult ? mresult : 0;
    }

}
