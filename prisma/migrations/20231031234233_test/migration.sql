-- CreateTable
CREATE TABLE "Test" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "text" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_email_key" ON "Test"("email");
