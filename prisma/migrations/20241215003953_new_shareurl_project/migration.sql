/*
  Warnings:

  - A unique constraint covering the columns `[shareUrl]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "shareUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Project_shareUrl_key" ON "Project"("shareUrl");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
