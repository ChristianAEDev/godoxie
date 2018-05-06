package main

import (
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	log.Println("Starting...")

	router := mux.NewRouter()

	// Host the front end
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./dist")))

	methods := []string{"GET", "POST", "PUT", "DELETE"}
	headers := []string{"Content-Type"}

	port := "8080"
	log.Printf("Started on port %v", port)
	// Startup the endpoint
	http.ListenAndServe(":"+port,
		handlers.CORS(handlers.AllowedMethods(methods), handlers.AllowedHeaders(headers))(router))

}
