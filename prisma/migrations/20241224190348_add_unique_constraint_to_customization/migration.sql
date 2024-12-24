/*
  Warnings:

  - A unique constraint covering the columns `[projectId,key]` on the table `Customization` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customization_projectId_key_key" ON "Customization"("projectId", "key");
