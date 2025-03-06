-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('member', 'admin');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'member';
