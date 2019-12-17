
(function () {
  const app = angular.module('mainModule')

  const ContentController = function ($scope, $routeParams, MealService, $sce) {
    MealService.getMealsByName($routeParams.name).then(res => displayMeal(res))
    $scope.show = false
    var ctrl = this
    const displayMeal = function (meal) {
      $scope.recipeTitle = meal.title
      $scope.recipeCategory = meal.category
      $scope.recipeTags = meal.tags
      $scope.recipeInstructions = meal.instructions
      $scope.ingredients = meal.ingredients
      $scope.imageSource = meal.image
      $scope.videoSource = meal.video
      ctrl.imageSource = {
        source: meal.image
      }
      ctrl.videoSource = {
        source: meal.video
      }
      $scope.show = true
      $scope.$apply()
    }
  }

  app.controller('ContentController', ContentController)
})()
