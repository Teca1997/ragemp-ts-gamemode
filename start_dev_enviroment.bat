echo "Development enviroment started"

concurrently "tsc -w -p ./packages/tsconfig.json" "tsc -w -p ./client_packages/tsconfig.json"