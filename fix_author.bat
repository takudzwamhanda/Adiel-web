@echo off
git filter-branch --env-filter "if [ $GIT_COMMIT = e2d0944 ]; then export GIT_AUTHOR_NAME='Takudzwa Mhanda'; export GIT_AUTHOR_EMAIL='noiamalvistacool02@gmail.com'; export GIT_COMMITTER_NAME='Takudzwa Mhanda'; export GIT_COMMITTER_EMAIL='noiamalvistacool02@gmail.com'; fi" -- --all
