// class Project 项目
export class Exp {
    // 项目ID
    proId: number;
    // 实验室（中心）名称
    labCenName: string;
    // 实验课程名
    expCname: string;
    // 实验设备名
    expEqname: string;
    // 设备数量
    eqnum: number;
    // 面向专业
    expMajor: string;
    // 学生类别
    ssort: string;
    // 实验总学时
    expTime: number;
    // 实验教材
    book: string;
    // 实验所用软件
    software: string;
    // 教职工号
    expTid: string;
    // 课程名
    courseName: string;
    // 课程编号
    courseId: number;
    // 消耗材料名称
    conName: string;
    // 消耗材料数量
    conNum: number;
    // 申请状态
    status: string;
    // 申请实验室状态
    labStatus: string;
    /** 学期 */
    term: string;

    constructor() {
        this.proId = 0;
        this.labCenName = '';
        this.expCname = '';
        this.expEqname = '';
        this.eqnum = 0;
        this.expMajor = '';
        this.ssort = '';
        this.expTime = 0;
        this.book = '';
        this.software = '';
        this.expTid = '';
        this.courseName = '';
        this.conName = '';
        this.conNum = 0;
        this.status = '';
        this.labStatus = '';
    }
}

// class ProjectItem 实验项目
export class ProjectItem {

    // 编号
    ino: number;
    // 实验项目编号
    iid: string;
    // 项目ID
    proId: number;
    // 实验项目名称
    iname: string;
    // 实验类型
    itype: string;
    // 实验项目学时
    itime: number;
    // 分组人数
    num: number;
    // 实验目的
    intend: string;

    constructor() {
        this.ino = 0;
        this.iid = '';
        this.proId = 0;
        this.iname = '';
        this.itype = '';
        this.itime = 0;
        this.num = 0;
        this.intend = '';

    }
}

