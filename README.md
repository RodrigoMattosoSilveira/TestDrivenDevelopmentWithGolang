# TestDrivenDevelopmentWithGolang
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

# Introduction
My objective is to write the examples in Kent Beck [Test-Driven Development By Example](https://www.eecs.yorku.ca/course_archive/2003-04/W/3311/sectionM/case_studies/money/KentBeck_TDD_byexample.pdf) using [Golang](https://golang.org/project/) to learn how to use the [Golang test framework](https://golang.org/pkg/testing/). The examples’ output will be shown by an an Angular application connected to a [simple Golang web server](https://github.com/enricofoltran/simple-go-server); my objective  is to learn Golang networking capabilities and grow this web server into a Golang Back End for a Front End, BFF.

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

# References
- [Marshal and unMarshal of Struct to JSON in Golang](https://www.restapiexample.com/golang-tutorial/marshal-and-unmarshal-of-struct-data-using-golang/) - I struggled with the explanation in the The Go Programming Language book, and found solace with this blog;
- [nodemon](https://nodemon.io/) - a Node utility to monitor for any changes in your source and automatically restart your server; I used to monitor to server, since I get the client monitoring for free from the Angular;  
- [npm-run-all](https://www.npmjs.com/package/npm-run-all) - A CLI tool to run multiple npm-scripts in parallel or sequential.
- [Proxy To Backend](https://github.com/angular/angular-cli/wiki/stories-proxy) - Used to route BFF requests;
- [The Go Programming Language source code](https://github.com/adonovan/gopl.io) - with examples in The Go Programming Language book, from which I borrowed profusely.
