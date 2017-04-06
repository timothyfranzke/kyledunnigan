kdApp.config(function($urlRouterProvider, $stateProvider, $locationProvider){
    //$locationProvider.html5Mode({
    //    enabled: true
    //});
    $stateProvider
        .state('home',{
            url:'/',
            templateUrl:'app/home/home.html',
            controller:'homeController'
        })
        .state('bio',{
            url:'/bio',
            templateUrl:'app/bio/bio.html'
        })
        .state('contact',{
            url:'/contact',
            templateUrl:'app/contact/contact.html'
        })
        .state('listen',{
            url:'/listen',
            templateUrl:'app/listen/listen.html'
        })
        .state('live',{
            url:'/live',
            templateUrl:'app/live/live.html',
            controller:'liveController'
        })
        .state('youtube',{
            url:'/watch',
            templateUrl:'app/watch/watch.html'
        });
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

});