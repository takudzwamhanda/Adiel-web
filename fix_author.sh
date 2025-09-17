#!/bin/bash
git filter-branch --env-filter '
if [ "$GIT_COMMIT" = "e2d0944" ]; then
    export GIT_AUTHOR_NAME="Takudzwa"
    export GIT_AUTHOR_EMAIL="noiamalvistacool02.com"
    export GIT_COMMITTER_NAME="Takudzwa"
    export GIT_COMMITTER_EMAIL="noiamalvistacool02.com"
fi
' -- --all
