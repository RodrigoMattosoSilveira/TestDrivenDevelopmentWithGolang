package main

//what it took for this test to pass
//
// export GOPATH=/Users/rodrigosilveira/projects/TestDrivenDevelopmentWithGolang
// go test -v ./server/src

import (
	"encoding/json"
	"fmt"
	"testing"
)

func TestGetTestData(t *testing.T) {

	type Asset struct {
		Underwritter string  `json:"underwritter"`
		Quantity     float64 `json:"quantity"`
		Price        float64 `json:"price"`
		Total        float64 `json:"total"`
	}
	type TestData struct {
		Title  string  `json:"title"`
		Assets []Asset `json:"assets"`
		Total  float64 `json:"total"`
	}
	var td TestData

	tdJSONBlob := GetTestData()

	err := json.Unmarshal(tdJSONBlob, &td)
	if err != nil {
		fmt.Println("main_test/TestGetTestData/ error:", err)
	}

	// validate the title
	expected := "Money Example - Basic"
	if td.Title != expected {
		t.Errorf("TestData tile, got: %s, expected: %s.", td.Title, expected)
	}
}
