/*
  Warnings:

  - Added the required column `mood` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Journal" ADD COLUMN     "mood" TEXT NOT NULL;
