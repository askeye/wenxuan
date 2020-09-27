/*
 Navicat Premium Data Transfer

 Source Server         : demo
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : wenxuan

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 27/09/2020 15:35:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for b_collection
-- ----------------------------
DROP TABLE IF EXISTS `b_collection`;
CREATE TABLE `b_collection`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `newprice` float(10, 2) NULL DEFAULT NULL,
  `imgurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `book_id` int(11) NULL DEFAULT NULL,
  `admin` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `oldprice` float(10, 2) NULL DEFAULT NULL,
  `publish` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 56 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of b_collection
-- ----------------------------
INSERT INTO `b_collection` VALUES (54, '儿童学习用表（加减法口算表）', 10.00, 'https://img2.winxuancdn.com/8629/1201488629_22_1.jpg?1520705489291', 84, 'kouqi1', 5.00, '2019年9月');
INSERT INTO `b_collection` VALUES (55, '保育员：初级技能 中级技能 不错技能', 14.00, 'https://img2.winxuancdn.com/4699/10054699_800x800.jpg?1558024843558', 320, 'kouqi1', 10.00, '2004-09-01');

SET FOREIGN_KEY_CHECKS = 1;
