-- AlterTable
ALTER TABLE `user` ADD COLUMN `brithDate` DATETIME(3) NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `gender` ENUM('Male', 'Female') NULL;
