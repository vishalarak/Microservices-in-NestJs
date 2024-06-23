/*
  Warnings:

  - Added the required column `profile_picture` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "profile_picture" TEXT NOT NULL;
