import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HandleError} from './handle-error';
import {NzMessageService} from 'ng-zorro-antd';
import {result} from '../entity/result';
import {Teach, Teacher, TeacherMsg} from '../entity/teacher';
import {Course} from '../entity/course';
import {Class} from '../entity/class';

@Injectable({
    providedIn: 'root'
})
export class TeacherService extends HandleError {

    constructor(private http: HttpClient, message: NzMessageService) {
        super(message);
    }

    private TEACHER_API = `${environment.apiUrl}/teacher`;
    private TEACH_API = `${environment.apiUrl}/teach`;


    /**
     * @description 根据教师编号获得教师信息
     *
     * @param tid 教师编号
     * @return 教师信息
     * @author suwen
     * @date 2020/5/27 下午2:02
     */
    getTeacherInfo(tid: string): Observable<result> {
        const url = `${this.TEACHER_API}/getTeacherInfo/${tid}`;
        return this.http.get<result>(url).pipe(
            tap(response => {
                    if (response.success) {
                        this.success(response.message);
                    } else {
                        this.error('根据教师编号获得教师信息失败');
                    }
                }
            ),
            catchError(this.handleError<result>(`根据教师编号获得教师信息，教师编号为：${tid}`))
        );
    }

    /**
     * @description 根据教师编号获得教师授课信息
     *
     * @param term 学期
     * @param tid 教师编号
     * @return 教师授课信息
     * @author suwen
     * @date 2020/5/27 下午2:04
     */
    getTeaches(tid: string, term): Observable<result> {
        const url = `${this.TEACH_API}/getTeachInfo`;
        return this.http.get<result>(url, {params: {tid, term}}).pipe(
            tap(response => {
                    if (response.success) {
                        this.success(response.message);
                    } else {
                        this.error('根据教师编号获得教师信息失败');
                    }
                }
            ),
            catchError(this.handleError<result>(`根据教师编号获得教师信息，教师编号为：${tid}`))
        );
    }

    /**
     * @description 根据教师编号获得教师授课信息
     *
     * @param tid 教师编号
     * @return 教师授课信息
     * @author suwen
     * @date 2020/10/5 下午2:28
     */
    getTeachByTid(tid: string | number): Observable<result> {
        const url = `${this.TEACH_API}/getTeach/${tid}`;
        return this.http.get<result>(url).pipe(
            tap(response => {
                    if (!response.success) {
                        this.error('根据教师编号获得教师信息失败');
                    }
                }
            ),
            catchError(this.handleError<result>(`根据教师编号获得教师信息，教师编号为：${tid}`))
        );
    }

    /**
     * @description 根据教师编号获得消息
     *
     * @param tid 教师编号
     * @return 消息
     * @author suwen
     * @date 2020/5/27 下午2:08
     */
    getMsgInfo(tid: string): Observable<result> {
        const url = `${this.TEACHER_API}/getMsgInfo/${tid}`;
        return this.http.get<result>(url).pipe(
            tap(response => {
                    if (response.success) {
                        this.success(response.message);
                    } else {
                        this.error('根据教师编号获得教师信息失败');
                    }
                }
            ),
            catchError(this.handleError<result>(`getMsgInfo id=${tid}`))
        );
    }

    /**
     * @description 创建教师消息
     *
     * @param msg 教师消息
     * @author suwen
     * @date 2020/8/21 下午2:26
     */
    addMsgInfo(msg: TeacherMsg): Observable<result> {
        const url = `${this.TEACHER_API}/addTeacherMsg`;
        return this.http.post<result>(url, msg).pipe(
            tap(response => {
                    if (response.success) {
                        this.success(response.message);
                    } else {
                        this.error('创建教师消息失败');
                    }
                }
            ),
            catchError(this.handleError<result>('创建教师消息失败'))
        );
    }

    /**
     * @description 根据消息编号已读消息
     *
     * @param mid 消息编号
     * @return 执行结果（true: 成功；false: 失败）
     * @author suwen
     * @date 2020/5/27 下午2:12
     */
    readMsg(mid: number): Observable<result> {
        const url = `${this.TEACHER_API}/readMsg/${mid}`;
        return this.http.get<result>(url).pipe(
            tap(response => {
                    if (response.success) {
                        this.success(response.message);
                    } else {
                        this.error('根据消息编号已读消息失败');
                    }
                }
            ),
            catchError(this.handleError<result>(`根据消息编号已读消息失败, mid=${mid}`))
        );
    }

    /**
     * @description 根据消息编号删除消息
     *
     * @param mid 消息编号
     * @return 执行结果（true: 成功；false: 失败）
     * @author suwen
     * @date 2020/5/27 下午2:15
     */
    deleteMsg(mid: number): Observable<result> {
        const url = `${this.TEACHER_API}/deleteMsg/${mid}`;
        return this.http.get<result>(url).pipe(
            tap(response => {
                    if (response.success) {
                        this.success(response.message);
                    } else {
                        this.error('根据消息编号删除消息失败');
                    }
                }
            ),
            catchError(this.handleError<result>(`根据消息编号删除消息, mid=${mid}`))
        );
    }

    /**
     * @description 用户更新密码
     *
     * @param tid 教师密码
     * @param oldPw 当前密码
     * @param newPw 新密码
     * @return 执行结果（true: 成功；false: 失败）
     * @author suwen
     * @date 2020/5/27 下午2:16
     */
    updatePassword(tid: string, oldPw: string, newPw: string): Observable<result> {
        const url = this.TEACHER_API + '/updatePassword';
        return this.http.put<result>(url, {}, {
            params: {
                tid, oldPw, newPw
            }
        }).pipe(
            tap(response => {
                    if (response.success) {
                        this.success(response.message);
                    } else {
                        this.error('用户更新密码消息失败');
                    }
                }
            ),
            catchError(this.handleError<result>(`用户更新密码, tid=${tid}`))
        );
    }

    /**
     * @description 获取教师某周的排课信息
     *
     * @param tid 教师编号
     * @param week 周次
     * @return 排课信息
     * @author suwen
     * @date 2020/5/27 下午2:18
     */
    getCurriculum(tid: string, week: string): Observable<result> {
        const url = this.TEACHER_API + '/getCurriculum';
        return this.http.get<any>(url, {
            params: {
                tid, week
            }
        }).pipe(
            tap(response => {
                    if (response.success) {
                        this.success(response.message);
                    } else {
                        this.error('获取教师某周的排课信息失败');
                    }
                }
            ),
            catchError(this.handleError<result>(`获取教师某周的排课信息, tid= ${tid},week= ${week}`))
        );
    }

    /**
     * 判断教师是否存在
     *
     * @param tid 教师编号
     * @author suwen
     * @date 2020/9/30 下午4:26
     */
    ifTeacher(tid: number | string): Observable<result> {
        const url = `${this.TEACHER_API}/ifTeacher/${tid}`;
        return this.http.get<result>(url).pipe(
            catchError(this.handleError<result>(`判断教师是否存在, tid= ${tid}`))
        );
    }

    /**
     * 判断班级是否存在
     *
     * @param classId 班级编号
     * @author suwen
     * @date 2020/9/30 下午19:26
     */
    ifClass(classId: number | string): Observable<result> {
        const url = `${this.TEACHER_API}/ifClass/${classId}`;
        return this.http.get<result>(url).pipe(
            catchError(this.handleError<result>(`判断班级是否存在, classId= ${classId}`))
        );
    }

    /**
     * 判断课程是否存在
     *
     * @param courseId 课程编号
     * @author suwen
     * @date 2020/9/30 下午19:26
     */
    ifCurriculum(courseId: number | string): Observable<result> {
        const url = `${this.TEACHER_API}/ifCurriculum/${courseId}`;
        return this.http.get<result>(url).pipe(
            catchError(this.handleError<result>(`判断课程是否存在, courseId= ${courseId}`))
        );
    }

    /**
     * 增加教师
     *
     * @param teacher 教师
     * @author suwen
     * @date 2020/10/2 上午9:34
     */
    addTeacher(teacher: Teacher): Observable<result> {
        const url = `${this.TEACHER_API}/addTeacher`;
        return this.http.post<result>(url, teacher).pipe(
            tap(response => {
                    if (response.success) {
                        this.success(response.message);
                    } else {
                        this.error('增加教师失败');
                    }
                }
            ),
            catchError(this.handleError<result>(`增加教师失败, tid=${teacher.tid}`))
        );
    }

    /**
     * 增加班级
     *
     * @param newClass 班级
     * @author suwen
     * @date 2020/10/2 上午9:34
     */
    addClass(newClass: Class): Observable<result> {
        const url = `${this.TEACHER_API}/addClass`;
        return this.http.post<result>(url, newClass).pipe(
            tap(response => {
                    if (response.success) {
                        this.success(response.message);
                    } else {
                        this.error('增加班级失败');
                    }
                }
            ),
            catchError(this.handleError<result>(`增加班级失败, classId=${newClass.classId}`))
        );
    }

    /**
     * 增加课程
     *
     * @param course 课程
     * @author suwen
     * @date 2020/10/2 上午9:34
     */
    addCurriculum(course: Course): Observable<result> {
        const url = `${this.TEACHER_API}/addCurriculum`;
        return this.http.post<result>(url, course).pipe(
            tap(response => {
                    if (response.success) {
                        this.success(response.message);
                    } else {
                        this.error('增加课程失败');
                    }
                }
            ),
            catchError(this.handleError<result>(`增加课程失败, courseId=${course.courseId}`))
        );
    }

    getTeacher(): Observable<result> {
        const url = `${this.TEACHER_API}/getTeacher`;
        return this.http.get<result>(url).pipe(
            tap(response => {
                    if (!response.success) {
                        this.error('获取教师信息');
                    }
                }
            ),
            catchError(this.handleError<result>('获取教师信息'))
        );
    }

    getClass(): Observable<result> {
        const url = `${this.TEACHER_API}/getClass`;
        return this.http.get<result>(url).pipe(
            tap(response => {
                    if (!response.success) {
                        this.error('获取班级信息');
                    }
                }
            ),
            catchError(this.handleError<result>('获取班级信息'))
        );
    }

    getCourse(): Observable<result> {
        const url = `${this.TEACHER_API}/getCourse`;
        return this.http.get<result>(url).pipe(
            tap(response => {
                    if (!response.success) {
                        this.error('获取课程信息');
                    }
                }
            ),
            catchError(this.handleError<result>('获取课程信息'))
        );
    }

    getAvailableCourse(tid: string | number): Observable<result> {
        const url = `${this.TEACH_API}/getAvailableCourse/${tid}`;
        return this.http.get<result>(url).pipe(
            tap(response => {
                    if (!response.success) {
                        this.error('获取可用课程信息');
                    }
                }
            ),
            catchError(this.handleError<result>('获取可用课程信息'))
        );
    }

    addTeach(teach: Teach[]): Observable<result> {
        const url = `${this.TEACH_API}/addTeaches`;
        return this.http.post<result>(url, teach).pipe(
            tap(response => {
                    if (response.success) {
                        this.message.success(response.message);
                    } else {
                        this.message.error('增加授课信息');
                    }
                }
            ),
            catchError(this.handleError<result>('增加授课信息'))
        );
    }

    updateTeacher(teacher: Teacher): Observable<result> {
        const url = `${this.TEACHER_API}/updateTeacher`;
        return this.http.put<result>(url, teacher);
    }

    updateClass(newClass: Class): Observable<result> {
        const url = `${this.TEACHER_API}/updateClass`;
        return this.http.put<result>(url, newClass);
    }

    updateCourse(course: Course): Observable<result> {
        const url = `${this.TEACHER_API}/updateCourse`;
        return this.http.put<result>(url, course);
    }

    removeTeacher(tid: number | string): Observable<result> {
        const url = `${this.TEACHER_API}/removeTeacher/${tid}`;
        return this.http.delete<result>(url);
    }

    removeClass(classId: number | string): Observable<result> {
        const url = `${this.TEACHER_API}/removeClass/${classId}`;
        return this.http.delete<result>(url);
    }

    removeCourse(courseId: number | string): Observable<result> {
        const url = `${this.TEACHER_API}/removeCourse/${courseId}`;
        return this.http.delete<result>(url);
    }

    removeTeach(tid: number | string, courseId: number | string): Observable<result> {
        const url = `${this.TEACH_API}/removeTeach?tid=${tid}&courseId=${courseId}`;
        return this.http.delete<result>(url);
    }
}
