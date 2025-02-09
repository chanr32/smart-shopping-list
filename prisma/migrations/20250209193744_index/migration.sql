-- RenameIndex
ALTER TABLE `History` RENAME INDEX `History_itemId_fkey` TO `History_itemId_idx`;

-- RenameIndex
ALTER TABLE `Item` RENAME INDEX `Item_userId_fkey` TO `Item_userId_idx`;
