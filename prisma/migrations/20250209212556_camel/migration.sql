/*
  Warnings:

  - You are about to drop the column `last_purchase_date` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `on_list` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Item` DROP COLUMN `last_purchase_date`,
    DROP COLUMN `on_list`,
    ADD COLUMN `lastPurchaseDate` TIMESTAMP(0) NULL,
    ADD COLUMN `onList` BOOLEAN NOT NULL DEFAULT true;
