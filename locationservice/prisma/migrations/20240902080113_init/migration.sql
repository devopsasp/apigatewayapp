-- CreateTable
CREATE TABLE `Servicelocation` (
    `locationid` INTEGER NOT NULL,
    `locationname` VARCHAR(191) NOT NULL,
    `servieProvider` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`locationid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
