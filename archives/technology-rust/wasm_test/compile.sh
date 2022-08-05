# Compile Rust functions for JS
cd rust_functions

wasm-pack build
mv pkg ../

# Move over to JS Code, bringing rust with us

cd ../js_app
mv ../pkg ./

./node_modules/.bin/webpack

./node_modules/.bin/wasm-server
