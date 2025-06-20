/*
  Warnings:

  - You are about to drop the column `clientId` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `booking` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - Added the required column `clientName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientWhatsApp` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_clientId_fkey`;

-- DropIndex
DROP INDEX `Booking_clientId_fkey` ON `booking`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `clientId`,
    DROP COLUMN `service`,
    DROP COLUMN `status`,
    ADD COLUMN `clientName` VARCHAR(191) NOT NULL,
    ADD COLUMN `clientWhatsApp` VARCHAR(191) NOT NULL,
    ADD COLUMN `serviceId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('ADMIN', 'CLIENT') NOT NULL DEFAULT 'CLIENT';

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
