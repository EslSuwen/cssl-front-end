/**
 * 班级实体
 *
 * @author suwen
 * @since 2020-09-25
 */
export class Class {

    /** 班级编号 */
    classId: number;

    /** 年级 */
    grade: number;

    /** 班级名称 */
    className: string;

    /** 专业Id */
    majorId: number;

    /** 班级人数 */
    studentNum: number;

    constructor(classId?: number, grade?: number, className?: string, majorId?: number, studentNum?: number) {
        this.classId = classId ? classId : 0;
        this.grade = grade ? grade : 0;
        this.className = className ? className : '';
        this.majorId = majorId ? majorId : 0;
        this.studentNum = studentNum ? studentNum : 0;
    }
}
