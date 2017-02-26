angular.module('crewmanagement',  ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('home',{
          url:'/home',
          templateUrl: "./JS/templates/home.html",
          controller: "mainController"
      })



        /*$urlRouterProvider
        .when('/', '/home')
            .otherwise('/');*/
    });
