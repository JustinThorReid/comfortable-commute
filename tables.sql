CREATE TABLE `record` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `time` datetime NOT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `dewPoint` float DEFAULT NULL,
  `humidity` float DEFAULT NULL,
  `pressure` float DEFAULT NULL,
  `windSpeed` float DEFAULT NULL,
  `windGust` float DEFAULT NULL,
  `windBearing` float DEFAULT NULL,
  `cloudCover` float DEFAULT NULL,
  `uvIndex` float DEFAULT NULL,
  `visibility` float DEFAULT NULL,
  `ozone` float DEFAULT NULL,
  `precipProbability` float DEFAULT NULL,
  `precipType` varchar(64) DEFAULT NULL,
  `precipIntensity` float DEFAULT NULL,
  `precipIntensityError` float DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `feelsTemperature` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `output_datapoint` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user_feedback` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inputId` int(10) unsigned NOT NULL,
  `outputId` int(10) unsigned NOT NULL,
  `value` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `inputId` (`inputId`),
  KEY `outputId` (`outputId`),
  CONSTRAINT `user_feedback_ibfk_1` FOREIGN KEY (`inputId`) REFERENCES `record` (`id`),
  CONSTRAINT `user_feedback_ibfk_2` FOREIGN KEY (`outputId`) REFERENCES `output_datapoint` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
