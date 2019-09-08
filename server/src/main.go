package main

import (
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync/atomic"
	"time"
)

type key int

const (
	requestIDKey key = 0
)

var (
	Version      string = ""
	GitTag       string = ""
	GitCommit    string = ""
	GitTreeState string = ""
	listenAddr   string
	healthy      int32
)

func main() {
	flag.StringVar(&listenAddr, "listen-addr", ":5000", "server listen address")
	flag.Parse()

	logger := log.New(os.Stdout, "http: ", log.LstdFlags)

	logger.Println("Simple go server")
	logger.Println("Version:", Version)
	logger.Println("GitTag:", GitTag)
	logger.Println("GitCommit:", GitCommit)
	logger.Println("GitTreeState:", GitTreeState)

	logger.Println("Server is starting...")

	router := http.NewServeMux()
	router.Handle("/", index())
	router.Handle("/healthz", healthz())
	router.Handle("/tdd/moneyExampleBasic", moneyExampleBasic())

	nextRequestID := func() string {
		return fmt.Sprintf("%d", time.Now().UnixNano())
	}

	server := &http.Server{
		Addr:         listenAddr,
		Handler:      tracing(nextRequestID)(logging(logger)(router)),
		ErrorLog:     logger,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  15 * time.Second,
	}

	done := make(chan bool)
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)

	go func() {
		<-quit
		logger.Println("Server is shutting down...")
		atomic.StoreInt32(&healthy, 0)

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()

		server.SetKeepAlivesEnabled(false)
		if err := server.Shutdown(ctx); err != nil {
			logger.Fatalf("Could not gracefully shutdown the server: %v\n", err)
		}
		close(done)
	}()

	logger.Println("Server is ready to handle requests at", listenAddr)
	atomic.StoreInt32(&healthy, 1)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		logger.Fatalf("Could not listen on %s: %v\n", listenAddr, err)
	}

	<-done
	logger.Println("Server stopped")
}

func index() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Hello, World!")
	})
}

func healthz() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if atomic.LoadInt32(&healthy) == 1 {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		w.WriteHeader(http.StatusServiceUnavailable)
	})
}

// ..
func moneyExampleBasic() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logger := log.New(os.Stdout, "http: ", log.LstdFlags)

		if r.URL.Path != "/tdd/moneyExampleBasic" {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			return
		}

		td := GetTestData()
		logger.Println("main.moneyExampleBasic.data: ", string(td))

		w.Header().Set("Content-Type", "text/plain; charset=utf-8")
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, string(td))
	})
}

func logging(logger *log.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				requestID, ok := r.Context().Value(requestIDKey).(string)
				if !ok {
					requestID = "unknown"
				}
				logger.Println(requestID, r.Method, r.URL.Path, r.RemoteAddr, r.UserAgent())
			}()
			next.ServeHTTP(w, r)
		})
	}
}

func tracing(nextRequestID func() string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			requestID := r.Header.Get("X-Request-Id")
			if requestID == "" {
				requestID = nextRequestID()
			}
			ctx := context.WithValue(r.Context(), requestIDKey, requestID)
			w.Header().Set("X-Request-Id", requestID)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

// GetTestData returns the JSON encoding of out test data, td.
func GetTestData() []byte {

	type Asset struct {
		Underwritter string  `json:"underwriter"`
		Quantity     float64 `json:"quantity"`
		Price        float64 `json:"price"`
		Total        float64 `json:"total"`
	}
	type TestData struct {
		Title  string  `json:"title"`
		Assets []Asset `json:"assets"`
		Total  float64 `json:"total"`
	}

	// https://www.restapiexample.com/golang-tutorial/marshal-and-unmarshal-of-struct-data-using-golang/
	logger := log.New(os.Stdout, "http: ", log.LstdFlags)

	var td = TestData{
		Title: "Money Example - Basic",
		Assets: []Asset{
			Asset{
				Underwritter: "IBM",
				Quantity:     1000,
				Price:        25.00,
				Total:        25000.00,
			},
			Asset{
				Underwritter: "GE",
				Quantity:     400,
				Price:        100.00,
				Total:        40000.00,
			},
		},
		Total: 65000.00,
	}
	logger.Println("basic.GetTestData.td: ", td)

	tdJSON, err := json.Marshal(td)
	if err != nil {
		log.Fatal("Cannot encode to JSON ", err)
	}
	logger.Println("main.GetTestData.tdJSON: ", string(tdJSON))

	return tdJSON
}
