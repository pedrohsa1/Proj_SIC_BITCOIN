-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: 54.232.118.69    Database: braxcoin
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `sobrenome` varchar(255) DEFAULT NULL,
  `pais` varchar(255) DEFAULT 'BRA',
  `token_2FA` varchar(60) DEFAULT NULL,
  `otpauth_url_2FA` varchar(255) DEFAULT NULL,
  `habilit_2FA` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (19,'teste','teste@teste.com.br','teste','$2a$10$tbxv5g6pAMXDS7n4lQ89k.cjP6e1RbT5AYIUMHh4Yk9vBiwpiACNW','teste pedro','BRA','MNKGWI3ONAXWSJDOMF2GMMSULMUD4SSXGJLFQ3CXOJUGGOBRGI3Q','otpauth://totp/Braxcoin%20(teste%20-%20teste%40teste.com.br)?secret=MNKGWI3ONAXWSJDOMF2GMMSULMUD4SSXGJLFQ3CXOJUGGOBRGI3Q',0),(20,'pedrohenrique','p_henrique94@hotmail.com','Teste','$2a$10$OoCn8cqKAPgbZP2r.PEN4.YxFMi.pNrJMHI0IJ3/2AtVIzcaAupNS','Teste','BRA','NBACCYRQOJAXEJBFGESWIZ3PNNBDGM3BLZLCGOBDNNETYQBWGJCQ','otpauth://totp/Braxcoin%20(pedrohenrique%20-%20p_henrique94%40hotmail.com)?secret=NBACCYRQOJAXEJBFGESWIZ3PNNBDGM3BLZLCGOBDNNETYQBWGJCQ',0),(21,'rvazsilva','rvazsilva@gmail.com','Ricardo','$2a$10$fsJafs.L2PtR4Xzuq1as/.x4CFrrr7kU7KmzpJUA7jdsU2lvRVCBa','Vaz da Silva','BRA','IMWEM6TWH5WHK4BZFA4CKOSAKVMFU5KAG5AUMOTRIJNWE4K6HR3Q','otpauth://totp/Braxcoin%20(rvazsilva%20-%20rvazsilva%40gmail.com)?secret=IMWEM6TWH5WHK4BZFA4CKOSAKVMFU5KAG5AUMOTRIJNWE4K6HR3Q',1),(22,'uelmatrix','uelmatrix@gmail.com','Uelen Paulo','$2a$10$QLAgyDipR5lit6OjOVmE3.IcomRyOkXXzD3IDSfvo2GmetyNkV1jq','Pereira','BRA','FZGCGOKUGVGSM6THHFJC4OK5HZ4HU4KPJYWDEYLDEE3FM6DNFQ4Q','otpauth://totp/Braxcoin%20(uelmatrix%20-%20uelmatrix%40gmail.com)?secret=FZGCGOKUGVGSM6THHFJC4OK5HZ4HU4KPJYWDEYLDEE3FM6DNFQ4Q',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-22 15:25:57
