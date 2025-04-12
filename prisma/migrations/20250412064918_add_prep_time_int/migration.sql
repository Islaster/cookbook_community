/*
  Warnings:

  - You are about to alter the column `cookingTime` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `prepTime` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" JSONB NOT NULL,
    "instructions" JSONB NOT NULL,
    "image" TEXT NOT NULL,
    "difficulty" TEXT,
    "cookingTime" INTEGER,
    "prepTime" INTEGER,
    "toolsNeeded" JSONB NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("cookingTime", "createdAt", "description", "difficulty", "id", "image", "ingredients", "instructions", "prepTime", "title", "toolsNeeded", "userId") SELECT "cookingTime", "createdAt", "description", "difficulty", "id", "image", "ingredients", "instructions", "prepTime", "title", "toolsNeeded", "userId" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
