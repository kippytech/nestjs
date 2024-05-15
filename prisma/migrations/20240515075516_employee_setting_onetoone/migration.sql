-- CreateTable
CREATE TABLE "EmployeeSetting" (
    "id" SERIAL NOT NULL,
    "notificationsOn" BOOLEAN NOT NULL,
    "smsEnabled" BOOLEAN NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "EmployeeSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeSetting_employeeId_key" ON "EmployeeSetting"("employeeId");

-- AddForeignKey
ALTER TABLE "EmployeeSetting" ADD CONSTRAINT "EmployeeSetting_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
