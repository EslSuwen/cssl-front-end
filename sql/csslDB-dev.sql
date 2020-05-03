/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : csslDB

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 20/04/2020 16:35:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for arrange
-- ----------------------------
DROP TABLE IF EXISTS `arrange`;
CREATE TABLE `arrange` (
  `aid` int NOT NULL AUTO_INCREMENT COMMENT '时间安排编号',
  `lab_id` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '实验室编号',
  `pro_id` int DEFAULT NULL COMMENT '项目编号',
  `tid` char(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '教师编号',
  `course_id` int DEFAULT NULL COMMENT '课程编号',
  `lab_class` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '实验室类型',
  `lab_remark` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '实验室备注',
  `exp_proname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '实验名称',
  `campus` char(8) DEFAULT NULL COMMENT '校区',
  `status` tinyint DEFAULT NULL,
  PRIMARY KEY (`aid`),
  KEY `fk_relationship_12` (`lab_id`) USING BTREE,
  KEY `fk_relationship_13` (`pro_id`) USING BTREE,
  KEY `fk_relationship_14` (`tid`,`course_id`) USING BTREE,
  KEY `tid` (`tid`),
  KEY `aid` (`aid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC COMMENT='实验时间安排';

-- ----------------------------
-- Records of arrange
-- ----------------------------
BEGIN;
INSERT INTO `arrange` VALUES (1, 'B01406', 1, '256740953460', 17015054, '17级3、4班', '无', '实验', '双福校区', 0);
INSERT INTO `arrange` VALUES (3, '60201', 3, '123', 14211829, '计算机1班-计算机2班', '', 'python语言', '南岸校区', 0);
INSERT INTO `arrange` VALUES (4, 'B01406', 13, '123', 14210187, '计算机3班-计算机4班', '', '上机', '双福校区', 0);
INSERT INTO `arrange` VALUES (5, '60201', 18, '123', 14210669, '曙光班', '', '汇编上机', '南岸校区', 0);
COMMIT;

-- ----------------------------
-- Table structure for arrange_period
-- ----------------------------
DROP TABLE IF EXISTS `arrange_period`;
CREATE TABLE `arrange_period` (
  `aid` int NOT NULL,
  `lab_week` int NOT NULL,
  `lab_day` int NOT NULL,
  `lab_session` int NOT NULL,
  PRIMARY KEY (`aid`,`lab_week`,`lab_day`,`lab_session`),
  CONSTRAINT `aid` FOREIGN KEY (`aid`) REFERENCES `arrange` (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of arrange_period
-- ----------------------------
BEGIN;
INSERT INTO `arrange_period` VALUES (1, 2, 1, 1);
INSERT INTO `arrange_period` VALUES (1, 2, 1, 2);
INSERT INTO `arrange_period` VALUES (1, 3, 1, 1);
INSERT INTO `arrange_period` VALUES (1, 4, 1, 1);
INSERT INTO `arrange_period` VALUES (1, 4, 1, 3);
INSERT INTO `arrange_period` VALUES (1, 6, 1, 1);
INSERT INTO `arrange_period` VALUES (3, 1, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 2, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 3, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 4, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 5, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 6, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 7, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 8, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 9, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 10, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 11, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 12, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 13, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 14, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 15, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 16, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 17, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 18, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 19, 3, 3);
INSERT INTO `arrange_period` VALUES (3, 20, 3, 3);
INSERT INTO `arrange_period` VALUES (4, 1, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 1, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 2, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 2, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 3, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 3, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 4, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 4, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 5, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 5, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 6, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 6, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 7, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 7, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 8, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 8, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 9, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 9, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 10, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 10, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 11, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 11, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 12, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 12, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 13, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 13, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 14, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 14, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 15, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 15, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 16, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 16, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 17, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 17, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 18, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 18, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 19, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 19, 5, 3);
INSERT INTO `arrange_period` VALUES (4, 20, 1, 3);
INSERT INTO `arrange_period` VALUES (4, 20, 5, 3);
INSERT INTO `arrange_period` VALUES (5, 1, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 2, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 3, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 4, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 5, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 6, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 7, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 8, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 9, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 10, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 11, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 12, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 13, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 14, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 15, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 16, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 17, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 18, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 19, 4, 1);
INSERT INTO `arrange_period` VALUES (5, 20, 4, 1);
COMMIT;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `class_name` varchar(16) NOT NULL,
  `major_id` int NOT NULL,
  `class_num` int DEFAULT NULL,
  PRIMARY KEY (`class_name`,`major_id`) USING BTREE,
  KEY `fk_relationship_8` (`major_id`) USING BTREE,
  CONSTRAINT `fk_relationship_8` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of class
-- ----------------------------
BEGIN;
INSERT INTO `class` VALUES ('17级1班', 456, 35);
INSERT INTO `class` VALUES ('17级1班', 789, 35);
INSERT INTO `class` VALUES ('17级2班', 456, 29);
INSERT INTO `class` VALUES ('17级3班', 123, 29);
INSERT INTO `class` VALUES ('17级4班', 123, 30);
COMMIT;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `course_id` int NOT NULL,
  `course_name` varchar(32) NOT NULL,
  PRIMARY KEY (`course_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of course
-- ----------------------------
BEGIN;
INSERT INTO `course` VALUES (14210118, 'RFID原理与应用');
INSERT INTO `course` VALUES (14210187, '操作系统原理A');
INSERT INTO `course` VALUES (14210240, '传感器原理及应用');
INSERT INTO `course` VALUES (14210669, '汇编与计算机组成原理');
INSERT INTO `course` VALUES (14210749, '计算机网络原理');
INSERT INTO `course` VALUES (14211006, '嵌入式系统基础B');
INSERT INTO `course` VALUES (14211165, '数字信号处理B');
INSERT INTO `course` VALUES (14211209, '通信原理A');
INSERT INTO `course` VALUES (14211245, '网络软件与设计');
INSERT INTO `course` VALUES (14211346, '信息论与编码B');
INSERT INTO `course` VALUES (14211374, '移动互联APP');
INSERT INTO `course` VALUES (14211829, '程序设计方法学');
INSERT INTO `course` VALUES (14212048, '电子技术课外实践');
INSERT INTO `course` VALUES (14212067, '多媒体技术');
INSERT INTO `course` VALUES (14212213, '工程实训（通信工程）');
INSERT INTO `course` VALUES (14212214, '工程实训（物联网工程）');
INSERT INTO `course` VALUES (14212831, '嵌入式系统基础A');
INSERT INTO `course` VALUES (14212966, '数据库原理');
INSERT INTO `course` VALUES (14213065, '通信技术实践');
INSERT INTO `course` VALUES (14213068, '通信网规划与设计');
INSERT INTO `course` VALUES (14213072, '通信原理B');
INSERT INTO `course` VALUES (17015054, '高级语言程序设计');
INSERT INTO `course` VALUES (17015062, '轨道信号系统与设备基础');
INSERT INTO `course` VALUES (17015184, '大数据概论');
INSERT INTO `course` VALUES (17015187, '数据导入与预处理技术');
INSERT INTO `course` VALUES (18210145, '高级语言程序设计A');
INSERT INTO `course` VALUES (18210161, '计算思维综合实践I');
INSERT INTO `course` VALUES (18210177, '高级语言程序设计B');
INSERT INTO `course` VALUES (19210322, '数据结构A');
INSERT INTO `course` VALUES (19210916, '信号与系统');
INSERT INTO `course` VALUES (19211634, '大数据开发语言');
INSERT INTO `course` VALUES (19211825, '计算思维综合实践I');
INSERT INTO `course` VALUES (19212095, '数字电路');
INSERT INTO `course` VALUES (19212099, '数据库技术');
INSERT INTO `course` VALUES (19212413, 'Java编程能力强化提升');
INSERT INTO `course` VALUES (19212769, '基于FPGA的SOC设计');
COMMIT;

-- ----------------------------
-- Table structure for exp_project
-- ----------------------------
DROP TABLE IF EXISTS `exp_project`;
CREATE TABLE `exp_project` (
  `pro_id` int NOT NULL AUTO_INCREMENT,
  `lab_cen_name` varchar(64) NOT NULL DEFAULT '信息技术实践教学中心',
  `exp_cname` varchar(32) NOT NULL,
  `exp_eqname` varchar(16) DEFAULT NULL,
  `eqnum` int DEFAULT NULL,
  `exp_major` varchar(32) NOT NULL,
  `ssort` varchar(16) NOT NULL,
  `exp_time` int NOT NULL,
  `book` varchar(128) DEFAULT NULL,
  `software` varchar(32) DEFAULT NULL,
  `exp_tid` char(12) NOT NULL,
  `lab_status` tinyint DEFAULT NULL,
  `cname` varchar(32) NOT NULL,
  `con_name` varchar(16) DEFAULT NULL,
  `con_num` int NOT NULL,
  `course_id` int NOT NULL,
  PRIMARY KEY (`pro_id`) USING BTREE,
  KEY `cid` (`course_id`),
  CONSTRAINT `cid` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of exp_project
-- ----------------------------
BEGIN;
INSERT INTO `exp_project` VALUES (1, '信息技术实践教学中心', 'java程序设计EB', '计算机', 40, '计算机科学与技术', '本科生', 32, '《Java语言程序设计》，辛运帏，饶一梅，人民邮电出版社，2009  ', 'eclipse，SQL Server, jdk', '256740953460', 0, 'java程序设计', '无', 2, 18210177);
INSERT INTO `exp_project` VALUES (3, '信息技术实践教学中心', 'python语言', '计算机', 40, '计算机科学与技术', '本科生', 45, '《数据预处理》', 'python', '123', 2, 'python', '无', 2, 14211829);
INSERT INTO `exp_project` VALUES (13, '信息技术实践教学中心', '上机', '设备', 1, '', '', 40, '教材', '软件', '123', 2, '操作系统原理A', '材料', 1, 14210187);
INSERT INTO `exp_project` VALUES (18, '信息技术实践教学中心', '汇编上机', '计算机', 50, '', '', 0, '教材', '软件', '123', 2, '汇编与计算机组成原理', '材料', 10, 14210669);
COMMIT;

-- ----------------------------
-- Table structure for lab_arrange_backup
-- ----------------------------
DROP TABLE IF EXISTS `lab_arrange_backup`;
CREATE TABLE `lab_arrange_backup` (
  `lab_week` int NOT NULL,
  `lab_day` int NOT NULL,
  `lab_session` varchar(16) NOT NULL,
  `lab_id` varchar(16) NOT NULL,
  `pro_id` int DEFAULT NULL,
  `tid` char(12) DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `lab_class` varchar(128) NOT NULL,
  `lab_remark` varchar(8) NOT NULL,
  `exp_proname` varchar(32) NOT NULL,
  PRIMARY KEY (`lab_week`,`lab_day`,`lab_session`,`lab_id`) USING BTREE,
  KEY `fk_relationship_12` (`lab_id`) USING BTREE,
  KEY `fk_relationship_13` (`pro_id`) USING BTREE,
  KEY `fk_relationship_14` (`tid`,`course_id`) USING BTREE,
  CONSTRAINT `fk_relationship_14` FOREIGN KEY (`tid`, `course_id`) REFERENCES `teach` (`tid`, `course_id`),
  CONSTRAINT `Relationship_12` FOREIGN KEY (`lab_id`) REFERENCES `lab_info` (`lab_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of lab_arrange_backup
-- ----------------------------
BEGIN;
INSERT INTO `lab_arrange_backup` VALUES (2, 1, '1-2节', '60202', 1, '256740953460', 17015054, '17级3、4班', '', '实验1');
INSERT INTO `lab_arrange_backup` VALUES (2, 1, '3-4节', '60202', 1, '256740953460', 17015054, '17级3、4班', '实验', '实验1');
INSERT INTO `lab_arrange_backup` VALUES (3, 1, '1-2节', '60202', 1, '256740953460', 17015054, '17级3、4班', '', '实验2');
INSERT INTO `lab_arrange_backup` VALUES (4, 1, '1-2节', '60202', 1, '256740953460', 17015054, '17级3、4班', '', '实验3');
INSERT INTO `lab_arrange_backup` VALUES (4, 1, '5-6节', '60202', 1, '256740953460', 17015054, '17级3、4班', '', '实验4');
INSERT INTO `lab_arrange_backup` VALUES (6, 1, '1-2节', '60202', 1, '256740953460', 17015054, '17级3、4班', '', '实验4');
COMMIT;

-- ----------------------------
-- Table structure for lab_info
-- ----------------------------
DROP TABLE IF EXISTS `lab_info`;
CREATE TABLE `lab_info` (
  `lab_id` varchar(16) NOT NULL,
  `tid` char(12) DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `lab_name` varchar(64) NOT NULL,
  `lab_campus` char(4) NOT NULL,
  `lab_cap` int NOT NULL,
  `lab_area` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`lab_id`) USING BTREE,
  KEY `fk_relationship_4` (`type_id`) USING BTREE,
  KEY `fk_lab_mange` (`tid`) USING BTREE,
  CONSTRAINT `fk_lab_mange` FOREIGN KEY (`tid`) REFERENCES `teacher` (`tid`),
  CONSTRAINT `fk_relationship_4` FOREIGN KEY (`type_id`) REFERENCES `lab_type` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of lab_info
-- ----------------------------
BEGIN;
INSERT INTO `lab_info` VALUES ('60101', '344847034079', 123, '软件开放实验室', '南岸', 70, 100.00);
INSERT INTO `lab_info` VALUES ('60102', NULL, NULL, '嵌入式系统实验室', '南岸', 70, 50.00);
INSERT INTO `lab_info` VALUES ('60103', NULL, NULL, '硬件开放实验室', '南岸', 70, 140.00);
INSERT INTO `lab_info` VALUES ('60104', NULL, NULL, '通信技术实验室', '南岸', 70, 140.00);
INSERT INTO `lab_info` VALUES ('60105', NULL, NULL, '网络技术实验室', '南岸', 70, 140.00);
INSERT INTO `lab_info` VALUES ('60201', NULL, NULL, '轨道交通实验室', '南岸', 70, 100.00);
INSERT INTO `lab_info` VALUES ('60202', '256740953460', 456, '计算机联锁实验室', '南岸', 70, 100.00);
INSERT INTO `lab_info` VALUES ('60203', NULL, NULL, '实验教师办公室', '南岸', 70, 20.00);
INSERT INTO `lab_info` VALUES ('60204', NULL, NULL, '实验教师办公室', '南岸', 70, 20.00);
INSERT INTO `lab_info` VALUES ('60205', NULL, NULL, '物联网工程实验室', '南岸', 70, 100.00);
INSERT INTO `lab_info` VALUES ('60206', NULL, NULL, '物联网技术实验室', '南岸', 70, 40.00);
INSERT INTO `lab_info` VALUES ('60207', NULL, NULL, '交通综合信息与指挥控制创新平台', '南岸', 70, 120.00);
INSERT INTO `lab_info` VALUES ('60801', NULL, NULL, '计算机软件实验室', '南岸', 70, 210.00);
INSERT INTO `lab_info` VALUES ('B01401', NULL, NULL, '实验教师办公室', '双福', 70, 20.00);
INSERT INTO `lab_info` VALUES ('B01402', NULL, NULL, '软件设计实践开放实验室', '双福', 70, 40.00);
INSERT INTO `lab_info` VALUES ('B01406', NULL, NULL, '信号与系统/EDA实验室', '双福', 70, 45.00);
INSERT INTO `lab_info` VALUES ('B01407', NULL, NULL, '计算机软件实验室', '双福', 70, 100.00);
INSERT INTO `lab_info` VALUES ('B01408', NULL, NULL, '硬件设计实践开放实验室', '双福', 70, 45.00);
INSERT INTO `lab_info` VALUES ('B01409', NULL, NULL, '计算机软件实验室', '双福', 70, 100.00);
INSERT INTO `lab_info` VALUES ('B01410', NULL, NULL, '软件类设计实践开放实验室', '双福', 70, 45.00);
COMMIT;

-- ----------------------------
-- Table structure for lab_type
-- ----------------------------
DROP TABLE IF EXISTS `lab_type`;
CREATE TABLE `lab_type` (
  `type_id` int NOT NULL,
  `type_name` varchar(16) NOT NULL,
  PRIMARY KEY (`type_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of lab_type
-- ----------------------------
BEGIN;
INSERT INTO `lab_type` VALUES (123, '电子实验室');
INSERT INTO `lab_type` VALUES (456, '计算机实验室');
COMMIT;

-- ----------------------------
-- Table structure for major
-- ----------------------------
DROP TABLE IF EXISTS `major`;
CREATE TABLE `major` (
  `major_id` int NOT NULL,
  `major_name` varchar(32) NOT NULL,
  PRIMARY KEY (`major_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of major
-- ----------------------------
BEGIN;
INSERT INTO `major` VALUES (123, '计算机科学与技术');
INSERT INTO `major` VALUES (456, '物联网工程');
INSERT INTO `major` VALUES (666, '计算机大类');
INSERT INTO `major` VALUES (789, '电信类');
COMMIT;

-- ----------------------------
-- Table structure for project_item
-- ----------------------------
DROP TABLE IF EXISTS `project_item`;
CREATE TABLE `project_item` (
  `ino` int NOT NULL AUTO_INCREMENT,
  `iid` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pro_id` int NOT NULL,
  `iname` varchar(32) NOT NULL,
  `itype` varchar(8) NOT NULL,
  `itime` int NOT NULL,
  `ctype` char(4) NOT NULL,
  `num` int NOT NULL,
  `intend` varchar(256) NOT NULL,
  PRIMARY KEY (`ino`) USING BTREE,
  KEY `fk_relationship_5` (`pro_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of project_item
-- ----------------------------
BEGIN;
INSERT INTO `project_item` VALUES (1, 'XX11058-001', 1, '实验1', '验证', 2, '必修', 1, '熟悉JDK的安装和配置；熟悉Java IDE开发环境的安装；学习利用JDK和IDE开发工具编写简单的Java程序，熟悉Java程序的编写、编译和运行过程。');
INSERT INTO `project_item` VALUES (2, 'XX11058-002', 1, '实验2', '验证', 2, '必修', 1, '理解面向过程和面向对象；学会查阅JDK API文档；在类的方法中熟练使用三种基本控制结构');
INSERT INTO `project_item` VALUES (3, 'XX11058-003', 1, '实验3', '验证', 2, '必修', 1, '熟悉Java数组的定义、初始化和使用；掌握类的定义、创建对象；掌握方法的定义、重载；理解成员变量和局部变量。');
INSERT INTO `project_item` VALUES (4, 'XX11058-004', 1, '实验4', '验证', 4, '必修', 1, '熟练掌握构造器的定义和重载；熟练掌握类的继承；熟练使用访问控制符实现所需的封装要求；熟练掌握多态。');
INSERT INTO `project_item` VALUES (5, 'XX11058-005', 1, '实验5', '综合', 4, '必修', 1, '理解抽象的内涵，掌握抽象方法和抽象类的定义和使用；理解接口的内涵，掌握接口的定义和使用；掌握Java类库中基本类的使用。');
INSERT INTO `project_item` VALUES (6, 'XX11058-006', 3, '实验4', '验证', 4, '必修', 1, '熟练掌握构造器的定义和重载；熟练掌握类的继承；熟练使用访问控制符实现所需的封装要求；熟练掌握多态。');
INSERT INTO `project_item` VALUES (7, 'XX11058-007', 3, '实验5', '综合', 4, '必修', 1, '理解抽象的内涵，掌握抽象方法和抽象类的定义和使用；理解接口的内涵，掌握接口的定义和使用；掌握Java类库中基本类的使用。');
INSERT INTO `project_item` VALUES (8, 'xx123-1', 13, 'item1', '验证', 11, '必修', 1, '目的1');
INSERT INTO `project_item` VALUES (9, 'xx123-2', 13, 'item2', '综合', 21, '选修', 2, '目的2');
INSERT INTO `project_item` VALUES (15, 'xxx11-001', 18, 'item1', '综合', 2, '选修', 5, '目的1');
INSERT INTO `project_item` VALUES (16, 'xxx11-002', 18, 'item2', '验证', 2, '选修', 5, '目的2');
INSERT INTO `project_item` VALUES (17, 'xxx11-003', 18, 'item3', '验证', 2, '选修', 5, '目的2');
COMMIT;

-- ----------------------------
-- Table structure for teach
-- ----------------------------
DROP TABLE IF EXISTS `teach`;
CREATE TABLE `teach` (
  `tid` char(12) NOT NULL,
  `course_id` int NOT NULL,
  `apply_limit` tinyint DEFAULT NULL,
  PRIMARY KEY (`tid`,`course_id`) USING BTREE,
  KEY `fk_relationship_7` (`course_id`) USING BTREE,
  CONSTRAINT `fk_relationship_6` FOREIGN KEY (`tid`) REFERENCES `teacher` (`tid`),
  CONSTRAINT `fk_relationship_7` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of teach
-- ----------------------------
BEGIN;
INSERT INTO `teach` VALUES ('123', 14210187, 0);
INSERT INTO `teach` VALUES ('123', 14210669, 0);
INSERT INTO `teach` VALUES ('123', 14211374, 0);
INSERT INTO `teach` VALUES ('123', 17015054, 0);
INSERT INTO `teach` VALUES ('123', 17015184, 0);
INSERT INTO `teach` VALUES ('256740953460', 17015054, 0);
INSERT INTO `teach` VALUES ('344847034079', 14210669, 0);
INSERT INTO `teach` VALUES ('529144083628', 14210187, 0);
INSERT INTO `teach` VALUES ('768326701984', 17015184, 0);
INSERT INTO `teach` VALUES ('773194542654', 14211374, 0);
INSERT INTO `teach` VALUES ('773194542654', 17015054, 1);
COMMIT;

-- ----------------------------
-- Table structure for teachclass
-- ----------------------------
DROP TABLE IF EXISTS `teachclass`;
CREATE TABLE `teachclass` (
  `tid` char(12) NOT NULL,
  `course_id` int NOT NULL,
  `class_name` varchar(16) NOT NULL,
  `major_id` int NOT NULL,
  PRIMARY KEY (`tid`,`course_id`,`class_name`,`major_id`) USING BTREE,
  KEY `fk_relationship_10` (`class_name`,`major_id`) USING BTREE,
  CONSTRAINT `fk_relationship_10` FOREIGN KEY (`class_name`, `major_id`) REFERENCES `class` (`class_name`, `major_id`),
  CONSTRAINT `fk_relationship_11` FOREIGN KEY (`tid`, `course_id`) REFERENCES `teach` (`tid`, `course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of teachclass
-- ----------------------------
BEGIN;
INSERT INTO `teachclass` VALUES ('773194542654', 14211374, '17级1班', 789);
INSERT INTO `teachclass` VALUES ('256740953460', 17015054, '17级2班', 456);
INSERT INTO `teachclass` VALUES ('529144083628', 14210187, '17级2班', 456);
INSERT INTO `teachclass` VALUES ('344847034079', 14210669, '17级3班', 123);
INSERT INTO `teachclass` VALUES ('768326701984', 17015184, '17级4班', 123);
INSERT INTO `teachclass` VALUES ('773194542654', 14211374, '17级4班', 123);
COMMIT;

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `tid` char(12) NOT NULL,
  `tname` varchar(16) NOT NULL,
  `tphone` varchar(16) DEFAULT NULL,
  `tqq` varchar(16) DEFAULT NULL,
  `temail` varchar(32) DEFAULT NULL,
  `tpassword` varchar(16) NOT NULL,
  `tlimit` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`tid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of teacher
-- ----------------------------
BEGIN;
INSERT INTO `teacher` VALUES ('123', '李益才', '15123456789', '123456789', '123456789@qq.com', '123', 0);
INSERT INTO `teacher` VALUES ('256740953460', '李益才', '15123456789', '123456789', '123456789@qq.com', '123456', 0);
INSERT INTO `teacher` VALUES ('344847034079', '徐毅', '15123456789', '123456789', '123456789@qq.com', '123456', 0);
INSERT INTO `teacher` VALUES ('529144083628', '米波', '15123456789', '123456789', '123456789@qq.com', '123456', 0);
INSERT INTO `teacher` VALUES ('768326701984', '刘君', '15123456789', '123456789', '123456789@qq.com', 'w4dw8d4a8', 0);
INSERT INTO `teacher` VALUES ('773194542654', '陈禾', '15123456789', '123456789', '123456789@qq.com', 'wad5aw72516', 0);
COMMIT;

-- ----------------------------
-- Table structure for teacher_msg
-- ----------------------------
DROP TABLE IF EXISTS `teacher_msg`;
CREATE TABLE `teacher_msg` (
  `mid` int NOT NULL AUTO_INCREMENT,
  `tid` char(12) NOT NULL,
  `mtitle` varchar(36) NOT NULL,
  `mresult` tinyint NOT NULL,
  `mtext` varchar(255) NOT NULL,
  `mdate` datetime NOT NULL,
  `mstatus` tinyint NOT NULL,
  PRIMARY KEY (`mid`),
  KEY `tid` (`tid`),
  CONSTRAINT `tid` FOREIGN KEY (`tid`) REFERENCES `teacher` (`tid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of teacher_msg
-- ----------------------------
BEGIN;
INSERT INTO `teacher_msg` VALUES (23, '123', '实验室安排通知', 1, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 0);
INSERT INTO `teacher_msg` VALUES (24, '123', '实验室安排通知', 0, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 1);
INSERT INTO `teacher_msg` VALUES (25, '123', '实验室安排通知', 1, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 0);
INSERT INTO `teacher_msg` VALUES (26, '123', '实验室安排通知', 0, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 1);
INSERT INTO `teacher_msg` VALUES (27, '123', '实验室安排通知', 1, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 0);
INSERT INTO `teacher_msg` VALUES (28, '123', '实验室安排通知', 0, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 1);
INSERT INTO `teacher_msg` VALUES (29, '123', '实验室安排通知', 1, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 1);
INSERT INTO `teacher_msg` VALUES (30, '123', '实验室安排通知', 0, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 1);
COMMIT;

-- ----------------------------
-- Table structure for teacher_msg_copy1
-- ----------------------------
DROP TABLE IF EXISTS `teacher_msg_copy1`;
CREATE TABLE `teacher_msg_copy1` (
  `mid` int NOT NULL AUTO_INCREMENT,
  `tid` char(12) NOT NULL,
  `mtitle` varchar(36) NOT NULL,
  `mresult` tinyint NOT NULL,
  `mtext` varchar(255) NOT NULL,
  `mdate` datetime NOT NULL,
  `mstatus` tinyint NOT NULL,
  PRIMARY KEY (`mid`),
  KEY `tid` (`tid`),
  CONSTRAINT `teacher_msg_copy1_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `teacher` (`tid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of teacher_msg_copy1
-- ----------------------------
BEGIN;
INSERT INTO `teacher_msg_copy1` VALUES (23, '123', '实验室安排通知', 1, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 0);
INSERT INTO `teacher_msg_copy1` VALUES (24, '123', '实验室安排通知', 0, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 1);
INSERT INTO `teacher_msg_copy1` VALUES (25, '123', '实验室安排通知', 1, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 0);
INSERT INTO `teacher_msg_copy1` VALUES (26, '123', '实验室安排通知', 0, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 1);
INSERT INTO `teacher_msg_copy1` VALUES (27, '123', '实验室安排通知', 1, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 0);
INSERT INTO `teacher_msg_copy1` VALUES (28, '123', '实验室安排通知', 0, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 1);
INSERT INTO `teacher_msg_copy1` VALUES (29, '123', '实验室安排通知', 1, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 1);
INSERT INTO `teacher_msg_copy1` VALUES (30, '123', '实验室安排通知', 0, '管理员未通过你关于通信原理实验课的课程安排，请联系管理员', '2020-03-24 19:27:25', 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;