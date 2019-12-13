
(function () {
  const app = angular.module('mainModule')

  const ContentController = function ($scope, $routeParams, MealService, $sce) {
    document.getElementsByTagName('main')[0].style.display = 'none'
    MealService.getMealsByName($routeParams.name).then(res => displayMeal(res))

    const displayMeal = function (meal) {
      $scope.recipeTitle = meal.getText().title
      $scope.recipeCategory = meal.getText().category
      $scope.recipeTags = meal.getText().tags
      $scope.recipeInstructions = meal.getText().instructions
      $scope.imageSource = meal.getImage()
      $scope.videoSource = meal.getVideo()
      $scope.ingredients = meal.getText().ingredients
      $scope.$apply()
      document.getElementsByTagName('main')[0].style.display = 'inline-flex'
    }

    $scope.trustSrc = function (src) {
      return $sce.trustAsResourceUrl(src)
    }

    $scope.playVideo = function () {
      const video = document.getElementById('video_window')
      video.classList.add('showWindow')
    }

    $scope.closeVideo = function () {
      const video = document.getElementById('video_window')
      document.getElementById('video_window').classList.add('hideWindow')
      video.classList.remove('showWindow')
      var iframes = document.getElementsByTagName('iframe')
      if (iframes != null) { // Reseting video by reasigning the source
        const videoSource = iframes[0].src
        iframes[0].src = videoSource
      }
    }
  }

  app.controller('ContentController', ContentController)
})()
