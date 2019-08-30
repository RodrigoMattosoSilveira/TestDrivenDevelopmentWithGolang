# TestDrivenDevelopmentWithGolang
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

# Introduction
I'm learning GO. After reading the first 5 chapters of Donovan & Kernighan's excellent and highly recommended The Go Programming Language I decided to switch tack to a more hand's approach with the objective to learn GO's test capabilities and integrate GO with Angular using the back end for front end, BFF, pattern.

I decided to write the software in Kent Beck's [Test-Driven Development By Example](https://www.eecs.yorku.ca/course_archive/2003-04/W/3311/sectionM/case_studies/money/KentBeck_TDD_byexample.pdf) in GO, enabling me to learn [Golang test framework](https://golang.org/pkg/testing/) while translating a classical testing text to GO.

I'll show the examples’ output using the [Angular application framework](https://angular.io/) connected to a [simple Golang web server](https://github.com/enricofoltran/simple-go-server) server acting as our Back End for a Front End, BFF.

To make things a bit more interesting, I'll also refactor the e2e tests to use [Cucumber](https://cucumber.io/docs/guides/overview/) instead of Jasmine.

This repository captures the software I'm writing in this learning journey.

# The repository
I will use a simple Angular structure to integrate the Angular application and the BFF.
````
TestDrivenDevelopmentWithGolang
src
  app - Client source code
  server - BFF source ```
````
# The Angular client application
It will evolve with the complexity of the examples.  There will be a route per example so that we can preserve them in their original state. It will render the tables, but it will not be responsible for any calculations.

# The back end for front end, BFF
It will consist of a simple package with the web server, the examples, and the tests. It will serve a route per example, with each example living in its own file and having its own tests;

# Implementation details
## package.json
## Angular Server proxy
The BFF server listens to a port (5000) different than the Angular application (4200). Below are the changes required to make this work (they are not well documented in Angular)
### Created the proxy.conf.json file
````
{
    "/tdd": {
        "target": "http://localhost:5000",
        "secure": false
    }
}
````
### Configure it to be used when loading applications (angular.json)
````
{
  ...
  "projects": {
    "TestDrivenDevelopmentWithGolang": {
      ...
      "architect": {
        "build": {
          ...
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "TestDrivenDevelopmentWithGolang:build",
            "proxyConfig": "proxy.conf.json"
          },
        ...
}
````

### package.json
### angular.json

# Testing
## Client
We will use [Cucumber](https://cucumber.io/docs/guides/overview/) for e2e tests; see [How to Set Up Angular E2E Testing with Cucumber](https://www.amadousall.com/angular-e2e-with-cucumber/); for details of how I set it up;
## BFF
We will use [Golang test framework](https://golang.org/pkg/testing/); see for how I set it up. One additional detail related to `GOPATH`; you must set up your GOPATH and select the package you want to test:
````
export GOPATH=/Users/rodrigosilveira/projects/TestDrivenDevelopmentWithGolang
go test server/src
````

# References
- [Cucumber](https://cucumber.io/docs/guides/overview/);
- [Go By Example - JSON](https://gobyexample.com/json);
- [Golang basics - writing unit tests](https://blog.alexellis.io/golang-writing-unit-tests/);
- [How to Set Up Angular E2E Testing with Cucumber](https://www.amadousall.com/angular-e2e-with-cucumber/);
- [Init array of structs in Go](https://stackoverflow.com/questions/26159416/init-array-of-structs-in-go);
- [Marshal and unMarshal of Struct to JSON in Golang](https://www.restapiexample.com/golang-tutorial/marshal-and-unmarshal-of-struct-data-using-golang/) - I struggled with the explanation in the The Go Programming Language book, and found solace with this blog;
- [nodemon](https://nodemon.io/) - a Node utility to monitor for any changes in your source and automatically restart your server; I used to monitor to server, since I get the client monitoring for free from the Angular;  
- [npm-run-all](https://www.npmjs.com/package/npm-run-all) - A CLI tool to run multiple npm-scripts in parallel or sequential;
- [Parsing JSON files With Golang](https://tutorialedge.net/golang/parsing-json-with-golang/) - Simple examples;
- [Proxy To Backend](https://github.com/angular/angular-cli/wiki/stories-proxy) - Used to route BFF requests;
- [The Go Programming Language source code](https://github.com/adonovan/gopl.io) - with examples in The Go Programming Language book, from which I borrowed profusely;
