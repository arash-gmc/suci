/*
  Warnings:

  - You are about to drop the column `brithDate` on the `user` table. All the data in the column will be lost.
  - The values [Male,Female] on the enum `User_gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `brithDate`,
    ADD COLUMN `brithYear` INTEGER NULL,
    MODIFY `gender` ENUM('male', 'female') NULL;
