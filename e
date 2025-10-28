[1mdiff --git a/scripts/activate.sh b/scripts/activate.sh[m
[1mindex 4979ea78b..183ec52a7 100755[m
[1m--- a/scripts/activate.sh[m
[1m+++ b/scripts/activate.sh[m
[36m@@ -1,9 +1,9 @@[m
[31m-# Prompt and set GitHub config[m
[31m-read -p "Enter your Git username: " GIT_USER_NAME[m
[31m-read -p "Enter your Git email: " GIT_USER_EMAIL[m
[31m-[m
[31m-git config --global user.name "$GIT_USER_NAME"[m
[31m-git config --global user.email "$GIT_USER_EMAIL"[m
[31m-[m
[31m-echo "Git User: $(git config --global user.name)"[m
[32m+[m[32m# Prompt and set GitHub config[m[41m[m
[32m+[m[32mread -p "Enter your Git username: " GIT_USER_NAME[m[41m[m
[32m+[m[32mread -p "Enter your Git email: " GIT_USER_EMAIL[m[41m[m
[32m+[m[41m[m
[32m+[m[32mgit config --global user.name "$GIT_USER_NAME"[m[41m[m
[32m+[m[32mgit config --global user.email "$GIT_USER_EMAIL"[m[41m[m
[32m+[m[41m[m
[32m+[m[32mecho "Git User: $(git config --global user.name)"[m[41m[m
 echo "Git Email: $(git config --global user.email)"[m
\ No newline at end of file[m
