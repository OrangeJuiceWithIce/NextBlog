/*
  Warnings:

  - You are about to alter the column `title` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `title` VARCHAR(100) NOT NULL,
    MODIFY `content` TEXT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(50) NULL,
    MODIFY `password` VARCHAR(100) NOT NULL;
