/**
 * 班级实体
 *
 * @author suwen
 * @since 2020-09-25
 */
export class Class {

    /** 班级编号 */
    classId: number;

    /** 班级名称 */
    className: string;

    /** 专业Id */
    majorId: number;

    /** 班级人数 */
    studentNum: number;

    constructor() {
        this.classId = 0;
        this.className = '';
        this.majorId = 0;
        this.studentNum = 0;
    }
}
