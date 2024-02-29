package main

import (
	"fmt"
	"net/http"
	"path/filepath"
	"github.com/gorilla/mux"
)

func main() {
	port := "8080"
	staticDir := "./static" // Change this to the build directory of your React app

	r := mux.NewRouter()

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filepath.Join(staticDir, "index.html"))
	})

	r.HandleFunc("/api/data", func(w http.ResponseWriter, r *http.Request) {
		// You can handle API logic here and send back JSON data to your React app
		// For example:
		data := []byte(`{"message": "Hello from Go server!"}`)
		w.Header().Set("Content-Type", "application/json")
		w.Write(data)
	})

	// Set up CORS middleware to allow requests from localhost:3000
	corsMiddleware := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			next.ServeHTTP(w, r)
		})
	}

	// Attach the CORS middleware to all routes
	r.Use(corsMiddleware)

	// Serve static files
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir(staticDir))))

	fmt.Printf("Server listening on port %s...\n", port)
	err := http.ListenAndServe(":"+port, r)
	if err != nil {
		fmt.Printf("Error: %s\n", err)
	}
}
