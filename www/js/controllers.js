angular.module('starter.controllers', ['ngCordova'])

    .controller('AppCtrl', function ($scope, $http, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })
    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })


    .factory('PersonService', function ($http) {
        var BASE_URL = "http://api.randomuser.me/";
        var items = [];

        return {
            GetFeed: function () {
                return $http.get(BASE_URL + '?results=10').then(function (response) {
                    items = response.data.results;

                    return items;
                });
            },
            GetNewUsers: function () {
                return $http.get(BASE_URL + '?results=10').then(function (response) {
                    items = response.data.results;
                    return items;
                });
            }
        }
    })

    .controller('ScrollcntrL', function ($scope, $timeout, PersonService) {
        $scope.items = [];

        PersonService.GetFeed().then(function (items) {
            $scope.items = items;
        });

        $scope.loadMore = function () {
            PersonService.GetNewUsers().then(function (items) {
                $scope.items = $scope.items.concat(items);

                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

    })

    .controller('printCtrl', function ($scope ,  $cordovaPrinter) {
        
        $scope.print = function () {
            var printerAvail = $cordovaPrinter.isAvailable()
            
              var doc = "<html>  Wikipedia is a free online encyclopedia with the mission of allowing anyone to edit articles. Wikipedia is the largest and most popular general reference work on the Internet, and is ranked the fifth-most popular website. Wikipedia </html>";
              $cordovaPrinter.print(doc)
            
        };

    })

    .controller('MyCtrl', function ($scope) {
        $scope.country = {};
        $scope.state = {};
        $scope.city = {};

        var allCountries = [{
            Id: 1,
            CountryName: "USA"
        }, {
            Id: 2,
            CountryName: "India"
        }];
        var allStates = [{
            Id: 1,
            StateName: "Washington",
            CountryId: 1
        }, {
            Id: 2,
            StateName: "New York",
            CountryId: 1
        }, {
            Id: 3,
            StateName: "Maharashtra",
            CountryId: 2
        },
        {
            Id: 4,
            StateName: "Gujrat",
            CountryId: 2
        }
        ];
        var allCities = [{
            Id: 1,
            CityName: "Washington DC",
            StateId: 1
        }, {
            Id: 2,
            CityName: "New York City",
            StateId: 2
        }, {
            Id: 3,
            CityName: "Pune",
            StateId: 3
        },
        {
            Id: 4,
            CityName: "Porbandar",
            StateId: 4
        }
        ];
        $scope.countries = allCountries;
        $scope.$watch('country', function () {
            $scope.states = allStates.filter(function (s) {
                return s.CountryId == $scope.country.Id;
            });
            $scope.city = {};
            $scope.state = {};
            $scope.cities = [];
        });
        $scope.$watch('state', function () {
            $scope.cities = allCities.filter(function (c) {
                return c.StateId == $scope.state.Id;
            });
            $scope.city = {};
        });
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });
