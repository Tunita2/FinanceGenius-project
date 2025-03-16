CREATE DATABASE  IF NOT EXISTS `financialmanagement` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `financialmanagement`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: financialmanagement
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `budget`
--

DROP TABLE IF EXISTS `budget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget` (
  `budget_id` int NOT NULL AUTO_INCREMENT,
  `budget_name` varchar(255) NOT NULL,
  `budget_amount` decimal(10,2) NOT NULL,
  `budget_date` date NOT NULL,
  `budget_description` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`budget_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `budget_id` FOREIGN KEY (`user_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget`
--

LOCK TABLES `budget` WRITE;
/*!40000 ALTER TABLE `budget` DISABLE KEYS */;
INSERT INTO `budget` VALUES (18,'Đi Huế',1500000.00,'2025-04-05','đi chơi vui vẻ',3),(19,'tiết kiệm',10000.00,'2025-03-27','Không tặng là giận',2),(20,'tiết kiệm',100000.00,'2011-12-02','hang out',1);
/*!40000 ALTER TABLE `budget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `category` enum('most_asked','troublesome') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
INSERT INTO `faqs` VALUES (1,'Tôi có thể liên lạc với bạn bằng cách nào nếu tôi có bất kỳ câu hỏi nào?','Bạn có thể liên hệ với chúng tôi qua email hoặc số điện thoại...','most_asked','2025-03-07 20:02:53','2025-03-07 20:02:53'),(2,'Thay đổi số điện thoại','Dễ lắm, làm theo các bước là được!','most_asked','2025-03-07 20:02:53','2025-03-07 20:02:53'),(3,'Cách làm giàu','Người giàu thường hay tiêu nhiều tiền','most_asked','2025-03-07 20:02:53','2025-03-07 20:02:53'),(4,'Làm thế nào để đặt mục tiêu tài chính?','Bạn nên bắt đầu bằng việc đánh giá tình hình tài chính hiện tại và thiết lập các mục tiêu SMART...','troublesome','2025-03-07 20:02:53','2025-03-07 20:02:53'),(5,'Làm thế nào để tiết kiệm tiền hiệu quả?','Hãy thiết lập ngân sách, theo dõi chi tiêu và luôn ưu tiên tiết kiệm trước khi chi tiêu...','troublesome','2025-03-07 20:02:53','2025-03-07 20:02:53'),(6,'Tại sao tôi không thể thêm transaction?','Có thể do hệ thống bị gián đoạn hoặc dữ liệu nhập vào không hợp lệ. Vui lòng kiểm tra lại...','troublesome','2025-03-07 20:02:53','2025-03-07 20:02:53');
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goal`
--

DROP TABLE IF EXISTS `goal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goal` (
  `goal_id` int NOT NULL AUTO_INCREMENT,
  `goal_name` varchar(255) NOT NULL,
  `goal_amount` decimal(15,2) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `payment_method` enum('Ví điện tử','Thẻ ngân hàng','Tiền mặt') NOT NULL,
  `user_id` int NOT NULL,
  `saved_amount` decimal(10,2) DEFAULT '0.00',
  `remaining_amount` decimal(10,2) GENERATED ALWAYS AS ((`goal_amount` - `saved_amount`)) STORED,
  PRIMARY KEY (`goal_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `goal_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `goal_chk_1` CHECK ((`goal_amount` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goal`
--

LOCK TABLES `goal` WRITE;
/*!40000 ALTER TABLE `goal` DISABLE KEYS */;
INSERT INTO `goal` (`goal_id`, `goal_name`, `goal_amount`, `start_date`, `end_date`, `payment_method`, `user_id`, `saved_amount`) VALUES (7,'Nội thất',555.00,'2025-03-13','2025-03-13','Thẻ ngân hàng',1,0.00),(8,'Mua nhà',123123.00,'2025-03-05','2025-03-12','Ví điện tử',1,0.00),(9,'Mua nhà',7.00,'2025-03-05','2025-03-19','Ví điện tử',1,0.00),(10,'Xe',4.00,'2025-03-07','2025-03-25','Ví điện tử',1,0.00),(11,'Mua nhà',100000.00,'2025-03-05','2025-03-20','Ví điện tử',3,0.00),(12,'Mua nhà',11111.00,'2025-03-11','2025-03-29','Ví điện tử',2,0.00),(13,'Xe',10000.00,'2025-03-20','2025-03-28','Thẻ ngân hàng',3,0.00),(14,'Kỳ nghỉ',10000.00,'2025-03-06','2025-03-27','Thẻ ngân hàng',3,0.00),(15,'Học',15000.00,'2025-03-21','2025-03-28','Tiền mặt',3,0.00),(16,'Học',1000000.00,'2025-03-14','2025-03-31','Tiền mặt',3,0.00),(17,'Xe',100000.00,'2025-04-05','2025-04-05','Thẻ ngân hàng',3,0.00);
/*!40000 ALTER TABLE `goal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persons`
--

DROP TABLE IF EXISTS `persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persons`
--

LOCK TABLES `persons` WRITE;
/*!40000 ALTER TABLE `persons` DISABLE KEYS */;
INSERT INTO `persons` VALUES (1,'tuan','tuan@gmail.com','2223235231','1111111111'),(2,'Builetuan','admin@gmail.com','0327688653','1111111111'),(3,'long','long@gmail.com','0905060704','123'),(4,'tuann','tuna@gmail.com','123345','123'),(5,'phanbinh','binh@gmail.com','123456789','123'),(6,'huy','huy@gmail.com','1234567890','123'),(7,'hieu','hieuorg@gmail.com','1234567890','123'),(8,'hieu','binhMinh@gmail.com','123123123123','123'),(9,'minhhh','.@gmail.com','123123123123','123'),(10,'Le Tuan','tuan1@gmail.com','123123123123','123');
/*!40000 ALTER TABLE `persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reminders`
--

DROP TABLE IF EXISTS `reminders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reminders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment_account_name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `due_date` date NOT NULL,
  `frequency` enum('Một lần','Hàng ngày','Hàng tuần','Hàng tháng') NOT NULL,
  `payment_method` enum('Ví điện tử','Thẻ ngân hàng','Tiền mặt') NOT NULL,
  `notification_time` enum('1 ngày trước','3 ngày trước','1 tuần trước') NOT NULL,
  `status` enum('sắp đến','hoàn thành') DEFAULT 'sắp đến',
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reminders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reminders`
--

LOCK TABLES `reminders` WRITE;
/*!40000 ALTER TABLE `reminders` DISABLE KEYS */;
INSERT INTO `reminders` VALUES (14,'tien dien',223123.00,'2025-03-07','Một lần','Ví điện tử','1 ngày trước','hoàn thành',1),(16,'tien dien',1123999.00,'2025-03-08','Một lần','Ví điện tử','1 ngày trước','sắp đến',1),(18,'tien dien',100000.00,'2025-03-14','Một lần','Ví điện tử','1 ngày trước','sắp đến',2),(19,'tien dien',10000.00,'2025-03-13','Một lần','Ví điện tử','1 ngày trước','hoàn thành',3),(20,'tiền nước',9999.00,'2025-03-20','Một lần','Ví điện tử','3 ngày trước','sắp đến',3),(21,'tiền điện',9000.00,'2025-03-14','Hàng tháng','Tiền mặt','1 ngày trước','hoàn thành',3),(22,'tiền internet',18000.00,'2025-03-05','Hàng tháng','Thẻ ngân hàng','1 ngày trước','sắp đến',3),(23,'tiền nước',9000.00,'2025-03-15','Một lần','Ví điện tử','1 ngày trước','sắp đến',1);
/*!40000 ALTER TABLE `reminders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistic`
--

DROP TABLE IF EXISTS `statistic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statistic` (
  `statistic_id` int NOT NULL AUTO_INCREMENT,
  `money_in` int DEFAULT NULL,
  `money_out` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`statistic_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `statistic_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistic`
--

LOCK TABLES `statistic` WRITE;
/*!40000 ALTER TABLE `statistic` DISABLE KEYS */;
INSERT INTO `statistic` VALUES (1,100000,1000000,1),(2,200000,2000000,2),(3,300000,3000000,3),(4,400000,400000,4);
/*!40000 ALTER TABLE `statistic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `total_list`
--

DROP TABLE IF EXISTS `total_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `total_list` (
  `totalList_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `money` bigint DEFAULT NULL,
  `money_status` enum('expense','income') DEFAULT 'expense',
  `date_now` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`totalList_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `totalList_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `persons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `total_list`
--

LOCK TABLES `total_list` WRITE;
/*!40000 ALTER TABLE `total_list` DISABLE KEYS */;
INSERT INTO `total_list` VALUES (30,'aewf',1,'expense','2025-03-07 07:24:41',1),(31,'awef',2,'expense','2025-03-07 07:24:41',1),(32,'awef',3,'income','2025-03-07 07:24:41',1),(33,'awfef',4,'income','2025-03-07 07:24:41',1),(34,'waeg',5,'expense','2025-03-07 07:24:41',2),(35,'awega',6,'expense','2025-03-07 07:24:41',2),(36,'aweghaw',7,'income','2025-03-07 07:24:41',2),(37,'lương ',12312,'income','2025-03-06 17:00:00',1),(38,'cafe',12312323,'income','2025-03-07 17:00:00',1),(39,'luong',100000,'income','2025-03-07 17:00:00',1),(40,'cafe',10000,'expense','2025-03-07 17:00:00',1),(41,'cafe',12312,'income','2025-03-10 17:00:00',2),(42,'cafe',100000,'expense','2025-03-13 17:00:00',3),(43,'lương ',12312,'income','2025-03-13 17:00:00',3),(44,'Đổ xăng',10000,'expense','2025-03-13 17:00:00',3),(45,'Trả nợ',10000,'income','2025-03-13 17:00:00',3),(46,'Ăn vặt',10000,'expense','2025-03-13 17:00:00',3),(47,'cafe',10000,'expense','2025-03-13 17:00:00',8),(48,'lương ',12312,'income','2025-03-20 17:00:00',3),(49,'cafe',10000,'income','2025-03-14 17:00:00',1);
/*!40000 ALTER TABLE `total_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-16 11:41:39
