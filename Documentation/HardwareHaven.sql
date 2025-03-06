-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hardware_haven
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Procesadores'),(2,'Memorias RAM'),(3,'Motherboards'),(4,'Tarjetas Gráficas'),(5,'Gabinetes'),(6,'Coolers'),(9,'Periferico'),(23,'Semiconductor'),(25,'Grandes Equipos ');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `componente`
--

DROP TABLE IF EXISTS `componente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `componente` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `categoria_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `componente_categoria_id_index` (`categoria_id`),
  CONSTRAINT `componente_categoria_id_foreign` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `componente`
--

LOCK TABLES `componente` WRITE;
/*!40000 ALTER TABLE `componente` DISABLE KEYS */;
INSERT INTO `componente` VALUES (1,'Intel Core i9','Procesador Intel Core i9 13900F 5.6GHz Turbo Socket 1700',1),(2,'Corsair Vengeance LPX 16GB','Memoria RAM DDR4 Corsair Vengeance LPX 16GB',2),(3,'ASUS ROG Strix Z790-E','Motherboard ASUS ROG Strix Z790-E',3),(4,'NVIDIA GeForce RTX 4090','Tarjeta Gráfica NVIDIA GeForce RTX 4090',4),(5,'Gabinete Cougar','Gabinete Cougar MX360 ARGB Vidrio Templado ATX',5),(6,'Cooler Fan','Cooler Fan ID-Cooling NO-8025-SD 80mm',6);
/*!40000 ALTER TABLE `componente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fecha_compra` datetime NOT NULL,
  `fecha_cancel` datetime DEFAULT NULL,
  `total` decimal(9,3) DEFAULT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `compra_user_id_index` (`user_id`),
  CONSTRAINT `compra_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES (86,'2025-02-14 18:02:16','2025-02-28 01:14:04',60000.000,184),(87,'2025-02-14 18:31:35','2025-02-28 10:33:59',30000.000,184),(88,'2025-02-16 11:56:34','2025-02-28 10:38:26',80000.000,184),(89,'2025-02-18 18:56:29','2025-02-28 10:38:29',30000.000,184),(90,'2025-02-18 18:58:17',NULL,80000.000,184),(91,'2025-02-18 19:18:35',NULL,30000.000,184),(92,'2025-02-18 19:18:58',NULL,20000.000,184),(93,'2025-02-18 19:20:49',NULL,80000.000,184),(94,'2025-02-18 19:45:01',NULL,240000.000,184),(95,'2025-02-18 21:54:32',NULL,30000.000,184),(96,'2025-02-19 15:58:01',NULL,80000.000,184),(97,'2025-02-19 16:19:14',NULL,30000.000,184),(98,'2025-02-19 16:21:07',NULL,160000.000,184),(99,'2025-02-19 16:41:27',NULL,80000.000,184),(100,'2025-02-19 17:59:20',NULL,30000.000,184),(101,'2025-02-19 18:06:46',NULL,30000.000,184),(102,'2025-02-19 18:22:54',NULL,80000.000,184),(103,'2025-02-19 18:52:32',NULL,60000.000,184),(104,'2025-02-19 19:13:05',NULL,60000.000,184),(105,'2025-02-19 19:16:57',NULL,30000.000,184),(106,'2025-02-19 19:48:56',NULL,80000.000,184),(107,'2025-02-19 20:41:28',NULL,30000.000,184),(108,'2025-02-19 21:24:08',NULL,30000.000,184),(109,'2025-02-19 21:32:36',NULL,30000.000,184),(110,'2025-02-19 21:38:39',NULL,80000.000,184),(111,'2025-02-19 21:39:36',NULL,80000.000,184),(112,'2025-02-20 16:59:00',NULL,160000.000,184),(113,'2025-02-28 10:24:01',NULL,200.000,184),(114,'2025-02-28 17:21:12','2025-02-28 17:21:44',110000.000,184),(115,'2025-02-28 20:17:16',NULL,80000.000,184),(116,'2025-03-01 10:56:13',NULL,80000.000,184),(117,'2025-03-01 23:37:31','2025-03-01 23:37:54',400.000,184),(118,'2025-03-05 10:39:54','2025-03-05 10:40:28',80000.000,184),(119,'2025-03-05 12:19:25',NULL,160000.000,184),(120,'2025-03-05 17:11:07',NULL,160000.000,184);
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linea_compra`
--

DROP TABLE IF EXISTS `linea_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linea_compra` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `sub_total` decimal(9,3) DEFAULT NULL,
  `compra_id` int unsigned NOT NULL,
  `componente_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `linea_compra_compra_id_index` (`compra_id`),
  KEY `linea_compra_componente_id_index` (`componente_id`),
  CONSTRAINT `linea_compra_componente_id_foreign` FOREIGN KEY (`componente_id`) REFERENCES `componente` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `linea_compra_compra_id_foreign` FOREIGN KEY (`compra_id`) REFERENCES `compra` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linea_compra`
--

LOCK TABLES `linea_compra` WRITE;
/*!40000 ALTER TABLE `linea_compra` DISABLE KEYS */;
INSERT INTO `linea_compra` VALUES (162,1,80000.000,86,2),(163,2,60000.000,86,3),(164,1,80000.000,87,2),(165,1,30000.000,87,3),(166,1,30000.000,88,3),(167,1,80000.000,88,2),(168,1,80000.000,89,2),(169,1,30000.000,89,3),(170,1,200.000,90,1),(171,1,80000.000,90,2),(172,1,80000.000,91,2),(173,1,30000.000,91,3),(174,1,15000.000,92,4),(175,1,10000.000,92,5),(176,1,20000.000,92,6),(177,5,150000.000,93,3),(178,1,80000.000,93,2),(179,3,240000.000,94,2),(180,1,80000.000,95,2),(181,1,30000.000,95,3),(182,1,30000.000,96,3),(183,1,80000.000,96,2),(184,1,80000.000,97,2),(185,1,30000.000,97,3),(186,2,160000.000,98,2),(187,1,80000.000,99,2),(188,1,80000.000,100,2),(189,1,30000.000,100,3),(190,1,80000.000,101,2),(191,1,30000.000,101,3),(192,1,80000.000,102,2),(193,1,80000.000,103,2),(194,2,60000.000,103,3),(195,2,60000.000,104,3),(196,1,30000.000,105,3),(197,1,80000.000,106,2),(198,1,80000.000,107,2),(199,1,30000.000,107,3),(200,1,30000.000,108,3),(201,1,80000.000,109,2),(202,1,30000.000,109,3),(203,1,30000.000,110,3),(204,1,80000.000,110,2),(205,2,60000.000,111,3),(206,1,80000.000,111,2),(207,2,160000.000,112,2),(208,1,200.000,113,1),(209,1,30000.000,114,3),(210,1,80000.000,114,2),(211,1,80000.000,115,2),(212,1,30000.000,116,3),(213,1,80000.000,116,2),(214,2,400.000,117,1),(215,2,60000.000,118,3),(216,1,80000.000,118,2),(217,2,160000.000,119,2),(218,2,160000.000,120,2);
/*!40000 ALTER TABLE `linea_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `precio`
--

DROP TABLE IF EXISTS `precio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `precio` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fecha_desde` datetime NOT NULL,
  `valor` decimal(9,3) NOT NULL,
  `componente_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `precio_componente_id_index` (`componente_id`),
  CONSTRAINT `precio_componente_id_foreign` FOREIGN KEY (`componente_id`) REFERENCES `componente` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `precio`
--

LOCK TABLES `precio` WRITE;
/*!40000 ALTER TABLE `precio` DISABLE KEYS */;
INSERT INTO `precio` VALUES (1,'2024-08-15 00:00:00',200.000,1),(2,'2024-08-15 00:00:00',80000.000,2),(3,'2024-08-15 00:00:00',30000.000,3),(4,'2024-08-15 00:00:00',15000.000,4),(5,'2024-08-15 00:00:00',10000.000,5),(6,'2024-08-15 00:00:00',20000.000,6);
/*!40000 ALTER TABLE `precio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tipo_usuario` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (184,'Cliente','nacho55123','admin@gmail.com','Cliente'),(187,'Administrador','nacho55123','admin@gmail.com','Administrador');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-06  6:57:35
