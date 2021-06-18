-- MySQL dump 10.13  Distrib 5.7.24, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user` smallint(5) unsigned NOT NULL,
  `post` smallint(5) unsigned NOT NULL,
  `content` tinytext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_use_id` (`user`),
  KEY `fk_post_id` (`post`),
  CONSTRAINT `fk_post_id` FOREIGN KEY (`post`) REFERENCES `posts` (`id`),
  CONSTRAINT `fk_use_id` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (112,48,122,'Praesent vel elit arcu.'),(113,49,122,'Mauris a velit placerat, suscipit nisi sit amet, rutrum enim. \nConsequat, molestie ante ac, tempus diam. Aliquam laoreet, orci sit amet finibus scelerisque, velit metus tempus sem, ac sagittis elit risus id erat.'),(114,47,124,'Maecenas sit amet eros consequat, molestie ante ac, tempus diam.\n\nAliquam laoreet, orci sit amet finibus scelerisque, velit metus tempus sem, ac sagittis elit risus id erat. Suspendisse potenti.'),(115,47,122,'Fusce viverra orci maximus odio dignissim sagittis.'),(116,46,122,'Suspendisse imperdiet porttitor libero, quis feugiat dolor lacinia vel. Mauris mattis ut dolor in eleifend.\nMauris fringilla pharetra interdum. Fusce viverra orci maximus odio dignissim sagittis.');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `url` varchar(2000) NOT NULL,
  `alttext` varchar(100) DEFAULT NULL,
  `post` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_image_post_id` (`post`),
  CONSTRAINT `fk_image_post_id` FOREIGN KEY (`post`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (45,'https://libreshot.com/wp-content/uploads/2020/03/tree-branches-struture.jpg',NULL,122),(46,'https://media.giphy.com/media/gcXcSRYZ9cGWY/giphy.gif',NULL,123),(48,'https://media.giphy.com/media/eHADNzrqEu7T030YNs/giphy.gif',NULL,126);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `user` smallint(5) unsigned NOT NULL,
  `postdate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (122,'\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pharetra sed augue egestas luctus. Etiam commodo pretium nisi, ac tincidunt lectus placerat sed. Integer vel quam rhoncus, imperdiet lectus eu, condimentum massa. Pellentesque massa ipsum, semper nec interdum in, lacinia in eros. Ut venenatis ligula nec magna lobortis convallis. Etiam non auctor eros, id malesuada felis. Morbi quis molestie tellus. Praesent vel elit arcu. Phasellus non enim finibus, lobortis tellus vel, viverra libero. Nullam aliquam tincidunt ligula, at aliquam magna auctor vel. Aliquam erat volutpat. Suspendisse imperdiet porttitor libero, quis feugiat dolor lacinia vel. Mauris mattis ut dolor in eleifend. Mauris fringilla pharetra interdum. Fusce viverra orci maximus odio dignissim sagittis.\n\nSed ut urna dapibus, molestie nibh quis, aliquet ex. Mauris a velit placerat, suscipit nisi sit amet, rutrum enim. Vestibulum rutrum sapien justo, condimentum imperdiet tortor porta mattis. Suspendisse egestas est a nisl scelerisque, in pharetra arcu blandit. Maecenas sit amet eros consequat, molestie ante ac, tempus diam. Aliquam laoreet, orci sit amet finibus scelerisque, velit metus tempus sem, ac sagittis elit risus id erat. Suspendisse potenti.',47,'2021-06-18 11:37:26'),(123,'Sed ut urna dapibus, molestie nibh quis, aliquet ex. Mauris a velit placerat, suscipit nisi sit amet, rutrum enim. Vestibulum rutrum sapien justo, condimentum imperdiet tortor porta mattis. Suspendisse egestas est a nisl scelerisque, in pharetra arcu blandit. Maecenas sit amet eros consequat, molestie ante ac, tempus diam. Aliquam laoreet, orci sit amet finibus scelerisque, velit metus tempus sem, ac sagittis elit risus id erat. Suspendisse potenti.',48,'2021-06-18 11:38:53'),(124,'Aliquam laoreet, orci sit amet finibus scelerisque, velit metus tempus sem, ac sagittis elit risus id erat.\nPhasellus non enim finibus, lobortis tellus vel, viverra libero. Nullam aliquam tincidunt ligula, at aliquam magna auctor vel. Aliquam erat volutpat. Suspendisse imperdiet porttitor libero, quis feugiat dolor lacinia vel.',49,'2021-06-18 11:40:49'),(126,'\nSed ut urna dapibus, molestie nibh quis, aliquet ex. Mauris a velit placerat, suscipit nisi sit amet, rutrum enim. Vestibulum rutrum sapien justo, condimentum imperdiet tortor porta mattis. Suspendisse egestas est a nisl scelerisque, in pharetra arcu blandit. Maecenas sit amet eros consequat, molestie ante ac, tempus diam. Aliquam laoreet, orci sit amet finibus scelerisque, velit metus tempus sem, ac sagittis elit risus id erat. Suspendisse potenti. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nam pharetra sed augue egestas luctus. Etiam commodo pretium nisi, ac tincidunt lectus placerat sed. Integer vel quam rhoncus, imperdiet lectus eu, condimentum massa. Pellentesque massa ipsum, semper nec interdum in, lacinia in eros. Ut venenatis ligula nec magna lobortis convallis. Etiam non auctor eros, id malesuada felis. Morbi quis molestie tellus. Praesent vel elit arcu. Phasellus non enim finibus, lobortis tellus vel, viverra libero. Nullam aliquam tincidunt ligula, at aliquam magna auctor vel. Aliquam erat volutpat. Suspendisse imperdiet porttitor libero, quis feugiat dolor lacinia vel. Mauris mattis ut dolor in eleifend. Mauris fringilla pharetra interdum. Fusce viverra orci maximus odio dignissim sagittis.',46,'2021-06-18 11:46:21');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `email` varchar(320) NOT NULL,
  `userpassword` varchar(60) NOT NULL,
  `admin` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (46,'Sabine','sabine@gmail.com','$2b$10$hoDKPdi3mgTXnLmclBpyluFgKkXW5BL/hQDWdCVWkEKYtOBffQBX6',_binary ''),(47,'Vincent','vincent@gmail.com','$2b$10$YW1PKiA91kT.Q2BuzXPu1eL99FLW8isvg3n5TTWuaqgzaqiyVUW2y',_binary '\0'),(48,'Camille','camille@gmail.com','$2b$10$2xKSBnU4BINVHDEbGSrVZu3fkE8dvaGEY1U.HscVTDgXmB1SNvLgC',_binary '\0'),(49,'Joris','joris@gmail.com','$2b$10$6b2LDkiQ6Xl.wx3zUvyo/.s15CWoom/ZLwPCcxD2cuWvtVjzRORku',_binary '\0');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER after_user_insert
AFTER INSERT
ON Users
FOR EACH ROW

BEGIN

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-18 11:58:32
