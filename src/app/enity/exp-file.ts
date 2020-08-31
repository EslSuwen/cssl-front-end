/**
 * 实验卡片文件关联实体
 *
 * @author suwen
 * @since 2020-07-8
 */
export class ExpFile {

    /** 卡片编号 */
    proId: number;

    /** 考勤名单 */
    attend: number;

    /** 实验任务书 */
    task: number;

    /** 实验成绩 */
    grade: number;

    /** 评分标准表 */
    scheme: number;

    /** 实验报告 */
    report: number;

    /** 文件 */
    files: Array<ExpFileStore>;

    constructor() {
        this.proId = 0;
        this.attend = 0;
        this.task = 0;
        this.grade = 0;
        this.scheme = 0;
        this.report = 0;
    }
}

/**
 * 实验卡片文件储存实体
 *
 * @author suwen
 * @since 2020-07-8
 */
export class ExpFileStore {

    /** 编号 */
    no: number;

    /** 项目ID */
    proId: number;

    /** 项目文件类型名 */
    typeName: string;

    /** 文件名 */
    name: string;

    /** 文件 */
    filePath: string;

}
