@echo off
ECHO SOURCE BRANCH IS %BUILD_SOURCEBRANCH%
IF %BUILD_SOURCEBRANCH% NEQ refs/heads/minsDream (
   ECHO "Not building minsDream branch."
   EXIT
)
SET sourceBranch=origin/%BUILD_SOURCEBRANCH:refs/heads/=%
ECHO GIT STATUS
git status
ECHO GIT ADD
git add src/Monolith/ClassifiedAds.Migrator/MinsDream/
ECHO GIT COMMIT
git commit -m "migrations - %1"
ECHO GIT PUSH
git push