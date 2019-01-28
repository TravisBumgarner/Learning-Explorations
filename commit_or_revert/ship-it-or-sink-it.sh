git add .
(npm run test && git commit -m $1) || echo "failure"


git commit

echo $1