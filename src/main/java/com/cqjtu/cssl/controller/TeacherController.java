package com.cqjtu.cssl.controller;

import com.cqjtu.cssl.entity.Curriculum;
import com.cqjtu.cssl.entity.Teach;
import com.cqjtu.cssl.entity.Teacher;
import com.cqjtu.cssl.entity.TeacherMsg;
import com.cqjtu.cssl.service.TeacherMsgService;
import com.cqjtu.cssl.service.TeacherService;
import io.swagger.annotations.Api;
import lombok.NonNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 教师信息前端控制器
 *
 * @author suwen
 * @since 2020-02-27
 */
@Log4j2
@Api(tags = "教师信息-控制器")
@RestController
@RequestMapping("/teacher")
public class TeacherController {

  private final TeacherService teacherService;
  private final TeacherMsgService teacherMsgService;

  @Autowired
  public TeacherController(TeacherService teacherService, TeacherMsgService teacherMsgService) {
    this.teacherService = teacherService;
    this.teacherMsgService = teacherMsgService;
  }

  /**
   * 根据教师 id 获取教师信息
   *
   * @author suwen
   * @date 2020/3/23 16:45 下午
   * @return 教师信息
   */
  @GetMapping(value = "/getTeacherInfo/{tid}")
  public Teacher getTeacherInfo(@NonNull @PathVariable String tid) {
    return teacherService.getById(tid);
  }

  /**
   * 根据教师 id 获取消息
   *
   * @author suwen
   * @date 2020/3/23 17:28 下午
   * @return 授课信息列表
   */
  @GetMapping(value = "/getMsgInfo/{tid}")
  public List<TeacherMsg> getMsgInfo(@NonNull @PathVariable String tid) {
    return teacherMsgService.getMsgListByTid(tid);
  }

  /**
   * 根据消息 id 已读消息
   *
   * @author suwen
   * @date 2020/3/24 12:28 下午
   */
  @GetMapping(value = "/readMsg/{mid}")
  public void readMsg(@NonNull @PathVariable String mid) {
    TeacherMsg teacherMsg = teacherMsgService.getById(mid);
    teacherMsg.setMstatus(1);
    teacherMsgService.updateById(teacherMsg);
  }

  /**
   * 根据消息 id 删除消息
   *
   * @author suwen
   * @date 2020/3/24 12:28 下午
   */
  @GetMapping(value = "/deleteMsg/{mid}")
  public void deleteMsg(@NonNull @PathVariable String mid) {
    teacherMsgService.removeById(mid);
  }

  /**
   * 用户修改密码
   *
   * @param request http 请求
   * @return int 状态码
   * @author suwen
   * @date 2020/4/1 下午7:56
   */
  @GetMapping("/updatePassword")
  public int updatePassword(HttpServletRequest request) {
    String tid = request.getParameter("tid");
    String oldPw = request.getParameter("oldPw");
    String newPw = request.getParameter("newPw");

    return teacherService.updatePassword(
        request.getParameter("tid"), request.getParameter("oldPw"), request.getParameter("newPw"));
  }

  @GetMapping("/getCurriculum")
  public List<Curriculum> getCurriculum(HttpServletRequest request) {
    String tid = request.getParameter("tid");
    String week = request.getParameter("week");

    return teacherService.getCurriculum(tid, week);
  }
}
