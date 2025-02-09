/*
  Warnings:

  - Made the column `brand` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Item` MODIFY `brand` VARCHAR(191) NOT NULL DEFAULT '';
