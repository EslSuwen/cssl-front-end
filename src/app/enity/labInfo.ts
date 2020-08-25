/**
 * 实验室信息实体
 *
 * @author suwen
 * @date 2020/8/21 下午1:36
 */
export class LabInfo {
    /** 实验室编号 */
    labId: string;

    /** 实验室负责人ID */
    tid: string;

    /** 实验室类型ID */
    typeId: number;

    /** 实验室名称 */
    labName: string;

    /** 校区 */
    labCampus: string;

    /** 人数容量 */
    labCap: number;

    /** 实验室面积 */
    labArea: number;

    /** 实验室负责人名 */
    tname: string;

    /** 实验室类型 */
    typeName: string;

    constructor() {
        this.labId = '';
        this.tid = '';
        this.typeId = 0;
        this.labName = '';
        this.labCampus = '';
        this.labCap = 0;
        this.labArea = 0;
        this.tname = '';
        this.typeName = '';
    }
}
