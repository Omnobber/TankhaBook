-- ============================================
-- TankhaBook – database.sql
-- Run this on your Hostinger MySQL database
-- ============================================

-- Create database (optional – Hostinger usually creates it via panel)
-- CREATE DATABASE IF NOT EXISTS tankhabook_db
--   CHARACTER SET utf8mb4
--   COLLATE utf8mb4_unicode_ci;

USE tankhabook_db;

-- --------------------------------------------
-- Table: enquiries
-- --------------------------------------------
CREATE TABLE IF NOT EXISTS `enquiries` (
  `id`         INT          NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(120) NOT NULL,
  `phone`      VARCHAR(15)  NOT NULL,
  `message`    TEXT,
  `ip_address` VARCHAR(45)  DEFAULT NULL,
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_phone`      (`phone`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci
  COMMENT='Stores website enquiries from the contact form';

-- --------------------------------------------
-- Sample data (optional – remove in production)
-- --------------------------------------------
INSERT INTO `enquiries` (`name`, `phone`, `message`) VALUES
  ('Ramesh Kumar',  '9876543210', 'Interested in Pro plan for 20 employees'),
  ('Sunita Devi',   '8765432109', 'Need demo for garment factory'),
  ('Anil Prasad',   '7654321098', 'How does payslip generation work?');

-- Done!
SELECT 'TankhaBook database setup complete!' AS status;
