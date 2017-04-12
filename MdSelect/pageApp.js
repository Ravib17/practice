(function() {
    angular.module("pageApp", []);
    angular.module("pageApp").directive('iaPagination', function() {

        // Set the default template for this directive
    $templateCache.put(TEMPLATE_URL,
      // '<div ng-transclude>'+
      //   '<div class="angucomplete-holder" ng-class="{\'angucomplete-dropdown-visible\': showDropdown}">' +
      //   '  <input id="{{id}}_value" placeholder="{{placeholder}}" name="{{inputName}}" tabindex="{{fieldTabindex}}" ng-class="{\'angucomplete-input-not-empty\': notEmpty}" ng-model="searchStr" ng-disabled="disableInput" type="{{inputType}}" placeholder="{{placeholder}}" maxlength="{{maxlength}}" ng-focus="onFocusHandler()" class="{{inputClass}}" ng-focus="resetHideResults()" ng-blur="hideResults($event)" autocapitalize="off" autocorrect="off" autocomplete="off" ng-change="inputChangeHandler(searchStr)"/>' +
      //   '  <div id="{{id}}_dropdown" class="angucomplete-dropdown" ng-show="showDropdown">' +
      //   '    <div class="angucomplete-searching" ng-show="searching" ng-bind="textSearching"></div>' +
      //   '    <div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)" ng-bind="textNoResults"></div>' +
      //   '    <div class="angucomplete-row" ng-repeat="result in results" ng-click="selectResult(result)" ng-mouseenter="hoverRow($index)" ng-class="{\'angucomplete-selected-row\': $index == currentIndex}">' +
      //   '      <div ng-if="imageField" class="angucomplete-image-holder">' +
      //   '        <img ng-if="result.image && result.image != \'\'" ng-src="{{result.image}}" class="angucomplete-image"/>' +
      //   '        <div ng-if="!result.image && result.image != \'\'" class="angucomplete-image-default"></div>' +
      //   '      </div>' +
      //   '      <div class="angucomplete-title" ng-if="matchClass" ng-bind-html="result.title"></div>' +
      //   '      <div class="angucomplete-title" ng-if="!matchClass">{{ result.title }}</div>' +
      //   '      <div ng-if="matchClass && result.description && result.description != \'\'" class="angucomplete-description" ng-bind-html="result.description"></div>' +
      //   '      <div ng-if="!matchClass && result.description && result.description != \'\'" class="angucomplete-description">{{result.description}}</div>' +
      //   '    </div>' +
      //   '  </div>' +
      //   '</div>'+
      //   '</div>'
    );

        function link(scope, elem, attrs) {
            scope.$watch('totalCount', function(oldValue, newValue) {
                if (oldValue != newValue) {
                    scope.currentPage = 1;
                    scope.setPageArray();
                }

            })

            scope.$watch('currentPage', function(oldValue, newValue) {
                if (oldValue != newValue) {
                    console.log("here");
                    scope.setPageArray();
                }

            })


            scope.goToPreviousPage = function() {
                if (scope.currentPage > 1) {
                    scope.currentPage = scope.currentPage - 1;
                    // scope.setPageArray();
                    setTimeout(function() {
                        scope.onPageChange();

                    })
                    console.log(scope.currentPage);
                }

            }

            scope.goToNextPage = function() {
                if (scope.currentPage < scope.totalPages) {
                    scope.currentPage = scope.currentPage + 1;
                    // scope.setPageArray();
                    setTimeout(function() {
                        scope.onPageChange();

                    })
                    console.log(scope.currentPage);



                }
            }

            scope.setPage = function(pageNo) {
                scope.currentPage = pageNo;
                // scope.setPageArray();
                setTimeout(function() {
                    scope.onPageChange();

                })
                console.log(scope.currentPage);


            }

            scope.setPageArray = function() {
                scope.pageArray = [];
                scope.totalPages = Math.ceil(scope.totalCount / scope.pageLimit);
                var previousPages = scope.previousPages;
                var nextPages = scope.nextPages;
                var rangeSize = scope.nextPages + 1;

                var start = scope.currentPage;
                var end;
                if (scope.totalPages <= previousPages + rangeSize) {
                    start = 1;
                    end = scope.totalPages;
                } else if (scope.currentPage <= previousPages + 1) {
                    start = 1;
                    end = previousPages + rangeSize;
                } else if (scope.currentPage + rangeSize - 1 >= scope.totalPages) {
                    start = scope.totalPages - previousPages - nextPages;
                    end = scope.totalPages;
                } else {
                    start = scope.currentPage - scope.previousPages;
                    end = scope.currentPage + nextPages;
                }
                for (var i = start; i <= end; i++) {
                    scope.pageArray.push(i);
                }

            }
            scope.setPageArray();

        }

        return {
            restrict: "EA",
            scope: {
                totalCount: '=',
                previousPages: '=',
                nextPages: '=',
                pageLimit: '=',
                onPageChange: '&',
                currentPage: '='


            },
            templateUrl: 'pagination.html',
            replace: 'true',
            link: link
        }

    })

    angular.module("pageApp").controller('pageCtrl', function() {
        var vm = this;
        vm.prevPages = 5;
        vm.nextPages = 5;
        vm.pageLimit = 10;
        vm.currentPage = 1;
        vm.getData = getData;

        function getData() {
            console.log("you can write your data code here");
            console.log(vm.currentPage);
            // vm.totalCount+=35; 
            return "done";
        }
    })
})();
