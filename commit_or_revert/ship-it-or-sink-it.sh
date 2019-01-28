git add .
(npm run test && git commit -m $1) || echo "failure"

echo $1