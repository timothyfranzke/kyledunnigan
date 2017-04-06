var kdApp = angular.module('kdApp', ['ui.router']);
kdApp.config(function ($provide) {
    $provide.decorator('$uiViewScroll', function ($delegate) {
        return function (uiViewElement) {
            // var top = uiViewElement.getBoundingClientRect().top;
            // window.scrollTo(0, (top - 30));
            // Or some other custom behaviour...
        };
    });
});