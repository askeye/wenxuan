/*
 Navicat Premium Data Transfer

 Source Server         : root2
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : wenxuan

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 25/09/2020 17:38:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `youbian` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `number` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `number2` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `def` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('张三', '河南郑州中原区玉兰街', '123456', '12345678910', '1234-123456', '1234567890@qq.com', 1, '默认地址');
INSERT INTO `address` VALUES ('王五', '科学大道', '455000', '12345678910', '1234-123456', '123@qq.com', 7, '');
INSERT INTO `address` VALUES ('李四', '哈哈哈哈哈哈', '123456', '12345678910', '1234-123456', '1234863158@qq.com', 6, '');
INSERT INTO `address` VALUES ('哈哈', '哈哈哈哈哈哈', '123456', '12345678910', '1234-123456', '1234863158@qq.com', 5, '');
INSERT INTO `address` VALUES ('李四', '哈哈哈哈哈哈', '123456', '12345678910', '1234-123456', '11111@qq.com', 8, '');
INSERT INTO `address` VALUES ('李三', '哈哈哈哈哈哈', '123456', '12345678910', '1234-123456', '1234863158@qq.com', 9, '');
INSERT INTO `address` VALUES ('李四', '哈哈哈哈哈哈', '123456', '12345678910', '1234-123456', '1234863158@qq.com', 10, '');
INSERT INTO `address` VALUES ('阿萨德', '哈哈哈哈哈哈', '123456', '12345678910', '1234-123456', '1234863158@qq.com', 11, '');

SET FOREIGN_KEY_CHECKS = 1;
