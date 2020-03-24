import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../../service/teacher.service";
import {TeacherMsg} from "../../enity/teacher";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  teacherMsgs: TeacherMsg[];

  constructor(private authenticationService: AuthenticationService, private teacherService: TeacherService) {
  }

  ngOnInit() {
    this.teacherService.getMsgInfo(this.authenticationService.getUserNo()).subscribe(data => {
      this.teacherMsgs = data;
    });
  }

  isreaded(id: number) {
    this.teacherMsgs[id].mstatus = 1;
    this.teacherService.readMsg(this.teacherMsgs[id].mid).subscribe();
  }

  deleteMsg(id: number) {
    this.teacherService.deleteMsg(this.teacherMsgs[id].mid).subscribe();
    this.teacherMsgs.splice(id, 1);
  }

}
