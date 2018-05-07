package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	log.Println("Starting...")

	router := mux.NewRouter()
	api := router.PathPrefix("/api/v1").Subrouter()
	api.HandleFunc("/hello", hello).Methods("GET")

	// Host the front end

	methods := []string{"GET", "POST", "PUT", "DELETE"}
	headers := []string{"Content-Type"}

	port := "8080"
	log.Printf("Started on port %v", port)
	// Startup the endpoint
	http.ListenAndServe(":"+port,
		handlers.CORS(handlers.AllowedMethods(methods), handlers.AllowedHeaders(headers))(router))

}

func hello(w http.ResponseWriter, r *http.Request) {
	message := "Hello Vue-World!"
	response := struct {
		Message string
	}{
		message,
	}

	respsoneJSON, err := json.Marshal(response)
	if err != nil {
		respondWithError(w, err)

	}
	w.Write(respsoneJSON)
}

func respondWithError(w http.ResponseWriter, err error) {
	message := fmt.Sprintf("Error: %v", err)
	log.Println(err)
	http.Error(w, message, http.StatusBadRequest)
}
