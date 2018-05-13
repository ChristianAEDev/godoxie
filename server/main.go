package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	log.Println("Starting...")
	if err != nil {
		log.Println(err)
	}

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

// Download a scan from the scanner and save it as a file
func DownloadFile(filepath string, url string) error {

	// Create the file
	out, err := os.Create(filepath)
	if err != nil {
		return err
	}
	defer out.Close()

	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Write the body to file
	_, err = io.Copy(out, resp.Body)
	if err != nil {
		return err
	}

	return nil
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
