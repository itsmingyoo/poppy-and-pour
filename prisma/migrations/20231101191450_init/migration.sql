-- CreateTable
CREATE TABLE "poppy_and_pour.test" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "text" TEXT,

    CONSTRAINT "poppy_and_pour.test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "poppy_and_pour.test_email_key" ON "poppy_and_pour.test"("email");
