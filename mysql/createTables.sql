-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : jeu. 01 juil. 2021 à 09:47
-- Version du serveur :  5.7.32
-- Version de PHP : 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données : `Groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--
DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user` (`user_id`),
  KEY `topic_id` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;


--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `message`, `date`) VALUES
(21, 11, 3, 'Salut tout le monde et bienvenus !', '2021-06-24 11:51:55'),
(22, 13, 1, 'Bonjour Thomas!', '2021-06-24 11:52:53'),
(23, 12, 2, 'Géniale cette appli !', '2021-06-24 11:55:10');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `titre` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `imageUrl` varchar(255) NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `titre`, `content`, `imageUrl`, `date`) VALUES
(11, 1, 'Hello World !', 'Salut à tous ! Bienvenue sur le réseau social de Groupomania !', '', '2021-06-23 16:53:26'),
(12, 1, 'Partagez vos contenus!', 'N\'hésitez pas à partager vos contenus dans ce fil d\'actualités afin de faire vivre ce réseau ;) !', '', '2021-06-23 16:59:28'),
(13, 2, 'Bonjour à tous et toutes!', 'Bonjour tout le monde, Super ce nouveau réseau social, nous allons pouvoir mieux nous connaître et partager ensemble !', '', '2021-06-23 17:14:28');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(30) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `isAdmin` enum('ADMIN','USER') DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `nom`, `prenom`, `isAdmin`, `createAt`) VALUES
(1, 'test3@email.com', '$2b$10$vXrJ2BYqd1fqOE6ykJaN7.C3dMD3CIsFXpFP4X2xXhQcf/GJOAM5e', 'Kevalis', 'Valis', 'Kevin', 'ADMIN', '2021-06-18 15:29:44'),
(2, 'test4@email.com', '$2b$10$ujq4b4pnfEwHEihQalUeNu563R7uGiXckRCn4MFEEInT9GujkLb4m', 'Zerbot', 'Zerbino', 'Thomas', 'USER', '2021-06-18 15:35:06'),
(3, 'test5@email.com', '$2b$10$sdwijaxc/JM/cy9eKKVYfuJXRIhFbq37DkU4r/7eo9ljejaVPbjbW', 'carlito', 'Andre', 'Charles', 'USER', '2021-06-19 09:16:42');


--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;
