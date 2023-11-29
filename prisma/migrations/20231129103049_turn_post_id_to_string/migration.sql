/*
  Warnings:

  - The primary key for the `Posts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `PostsActions` DROP FOREIGN KEY `PostsActions_postId_fkey`;

-- AlterTable
ALTER TABLE `Posts` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `PostsActions` ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `postId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `PostsActions` ADD CONSTRAINT `PostsActions_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
