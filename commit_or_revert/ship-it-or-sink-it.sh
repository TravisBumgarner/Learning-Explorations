git add .
(npm run test && git commit -m $1) || (git reset --hard && git clean -f -d)
