-- CreateEnum
CREATE TYPE "Role" AS ENUM ('VENDOR', 'SUPPORTER');

-- CreateTable
CREATE TABLE "PreRegistration" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "city" TEXT,
    "zip" TEXT,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PreRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PreRegistration_email_key" ON "PreRegistration"("email");
