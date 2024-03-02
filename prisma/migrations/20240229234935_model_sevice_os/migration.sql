/*
  Warnings:

  - You are about to drop the column `userIds` on the `roles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "roles" DROP COLUMN "userIds";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "companyId" TEXT;

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "cep" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "companyType" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "website" TEXT,
    "cnpj" TEXT,
    "industry" TEXT,
    "description" TEXT,
    "logo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "technicians" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "function" TEXT NOT NULL,
    "companyId" TEXT,

    CONSTRAINT "technicians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "document" TEXT,
    "gender" TEXT,
    "contact" TEXT,
    "address" TEXT,
    "cep" TEXT,
    "city" TEXT,
    "state" TEXT,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_services" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,
    "technicianId" TEXT,

    CONSTRAINT "order_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemsOs" (
    "id" TEXT NOT NULL,
    "orderServiceId" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "nSerie" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tecnico" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "acessories" TEXT,
    "usageBrand" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemsOs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusItemOs" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatusItemOs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "gender" TEXT,
    "birthDate" TIMESTAMP(3),
    "address" TEXT,
    "cep" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "document" TEXT,
    "profileImage" TEXT,
    "position" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- AddForeignKey
ALTER TABLE "technicians" ADD CONSTRAINT "technicians_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_services" ADD CONSTRAINT "order_services_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_services" ADD CONSTRAINT "order_services_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_services" ADD CONSTRAINT "order_services_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicians"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsOs" ADD CONSTRAINT "ItemsOs_orderServiceId_fkey" FOREIGN KEY ("orderServiceId") REFERENCES "order_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusItemOs" ADD CONSTRAINT "StatusItemOs_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ItemsOs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
