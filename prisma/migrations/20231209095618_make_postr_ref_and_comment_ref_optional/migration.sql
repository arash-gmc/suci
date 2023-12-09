-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_commentRefId_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_postRefId_fkey`;

-- AlterTable
ALTER TABLE `Comment` MODIFY `postRefId` VARCHAR(191) NULL,
    MODIFY `commentRefId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postRefId_fkey` FOREIGN KEY (`postRefId`) REFERENCES `Posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_commentRefId_fkey` FOREIGN KEY (`commentRefId`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
