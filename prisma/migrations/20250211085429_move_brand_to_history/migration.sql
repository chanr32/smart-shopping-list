/*
  Warnings:

  - You are about to drop the column `brand` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `History` ADD COLUMN `brand` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `brand`;
