/**
 * 课程实体
 *
 * @author suwen
 * @since 2020-10-01
 */
export class Course {

    /** 课程编号 */
    courseId: number;

    /** 课程名 */
    courseName: string;

    /** 所属学院 */
    courseCollege: string;

    /** 课程类型 */
    courseType: string;

    constructor(courseId?: number, courseName?: string, courseCollege?: string, courseType?: string) {
        this.courseId = courseId ? courseId : 0;
        this.courseName = courseName ? courseName : '';
        this.courseCollege = courseCollege ? courseCollege : '';
        this.courseType = courseType ? courseType : '';
    }
}
