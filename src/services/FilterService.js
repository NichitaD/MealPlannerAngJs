
(function () {
  const FilterService = function ($location, MealService, $window) {
    const filter = function (option, input) {
      switch (option) {
        case 'search': {
          MealService.getMealsBySearch(input).then(meal => {
            // $location.path('/meal/' + meal.getText().title)
            $window.location.assign('index.html#/meal/' + meal.getText().title)
          })
          break
        }
        case 'random': {
          MealService.getRandomMeal().then(meal => {
            // $location.path('/meal/' + meal.getText().title)
            $window.location.assign('index.html#/meal/' + meal.getText().title)
          })
          break
        }

        case 'byName' : {
          $window.location.assign('index.html#/meal/' + input)
        }
      }
    }

    return {
      filter: filter
    }
  }

  const module = angular.module('mainModule')
  module.factory('FilterService', FilterService)
})()
