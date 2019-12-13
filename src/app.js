
const app = angular.module('mainModule', ['ngRoute'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/meal/:name', {
      templateUrl: './content/content.html',
      controller: 'ContentController'
    })
    .otherwise({ redirectTo: '/index.html' })
})
