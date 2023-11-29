-- CreateTable
CREATE TABLE `PostsActions` (
    `id` VARCHAR(191) NOT NULL,
    `actionType` ENUM('like', 'dislike', 'bookmark') NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `postId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PostsActions` ADD CONSTRAINT `PostsActions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostsActions` ADD CONSTRAINT `PostsActions_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
