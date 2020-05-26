import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {Teach, Teacher, TeacherMsg} from "../enity/teacher";
import {catchError, tap} from "rxjs/operators";
import {Curriculum} from "../enity/arrange";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) {
  }

  private teacher_api = `${environment.apiUrl}/teacher`;

  private teach_api = `${environment.apiUrl}/teach`;


  getTeacherInfo(tid: string): Observable<Teacher> {
    const url = `${this.teacher_api}/getTeacherInfo/${tid}`;
    return this.http.get<Teacher>(url).pipe(
      catchError(this.handleError<Teacher>(`getTeacherInfo id=${tid}`))
    );
  }

  getTeaches(tid: string): Observable<Teach[]> {
    const url = `${this.teach_api}/getTeachInfo/${tid}`;
    return this.http.get<Teach[]>(url);
  }

  getTeacheCls(tid: string): Observable<Teach[]> {
    const url = `${this.teach_api}/getTeachInfo/${tid}`;
    return this.http.get<Teach[]>(url);
  }

  getMsgInfo(tid: string): Observable<TeacherMsg[]> {
    const url = `${this.teacher_api}/getMsgInfo/${tid}`;
    return this.http.get<TeacherMsg[]>(url).pipe(
      catchError(this.handleError<TeacherMsg[]>(`getMsgInfo id=${tid}`))
    );
  }

  readMsg(mid: number) {
    const url = `${this.teacher_api}/readMsg/${mid}`;
    return this.http.get(url);
  }


  deleteMsg(mid: number) {
    const url = `${this.teacher_api}/deleteMsg/${mid}`;
    return this.http.get(url);
  }

  updatePassword(tid: string, oldPw: string, newPw: string): Observable<number> {
    const url = this.teacher_api + '/updatePassword';
    return this.http.get<number>(url, {
      params: {
        "tid": tid, "oldPw": oldPw, "newPw": newPw
      }
    })
  }

  getCurriculum(tid: string, week: string): Observable<Curriculum[]> {
    const url = this.teacher_api + '/getCurriculum';
    return this.http.get<Curriculum[]>(url, {
      params: {
        "tid": tid, "week": week
      }
    })
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (errorResponse: any): Observable<T> => {
      console.error(errorResponse.error); // log to console instead

      if (result) {
        return of(result as T);
      }

      return of();
    }
  }

}
