/*
  Warnings:

  - You are about to drop the column `message` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `associated` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notification` DROP COLUMN `message`,
    ADD COLUMN `associated` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` ENUM('like', 'comment', 'follow', 'repost') NOT NULL;
