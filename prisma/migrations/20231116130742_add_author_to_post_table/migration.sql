/*
  Warnings:

  - Added the required column `authorId` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Posts` ADD COLUMN `authorId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
