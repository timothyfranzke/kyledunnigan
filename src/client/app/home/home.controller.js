kdApp.controller('homeController', function($scope, eventService){
    $scope.events = [];
    eventService.GET().then(function(data){
        console.log(data);
        $scope.events = data;
    });
});