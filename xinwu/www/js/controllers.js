/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, CurrentUserService) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $scope.posting = function() {
	    $scope.userId = CurrentUserService.firstname;
	    if ($scope.userId === 'undefined') {
	        $state.go('app.login');
	    }else{
	    	$state.go('app.posting')
	    }
	}

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('NewsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('pickNewsTypeCtrl', function ($scope, $ionicHistory, PickTransactionServices) {

    $scope.isExpanded = false;
    $scope.NewsTypeList = [
        { text: 'News', value: 'News' },
        { text: 'Tutorial', value: 'Tutorial' },
        { text: 'Tips', value: 'Tips' }];
    $scope.currentItem = { typedisplay: PickTransactionServices.typeDisplaySelected };
    $scope.itemchanged = function (item) {
        PickTransactionServices.updateType(item.value, item.value);
        $ionicHistory.goBack();
    };
})

.controller('PostingCtrl', function ($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $state, $ionicHistory, AccountsFactory, PickTransactionServices, PayeesService, myCache, CurrentUserService) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.userId = CurrentUserService.firstname;;

    if ($scope.userId === 'undefined') {
        $state.go('app.login');
    }else {

	    // Set Motion
	    $timeout(function() {
	        ionicMaterialMotion.slideUp({
	            selector: '.slide-up'
	        });
	    }, 300);

	    $timeout(function() {
	        ionicMaterialMotion.fadeSlideInRight({
	            startVelocity: 3000
	        });
	    }, 700);

	    // Set Ink
	    ionicMaterialInk.displayEffect();


	    $scope.hideValidationMessage = true;
	    $scope.loadedClass = 'hidden';
	    $scope.news = [];
	    $scope.AccountTitle = '';
	    $scope.inEditMode = false;
	    $scope.isTransfer = false;
	    $scope.ItemFrom = {};
	    $scope.ItemTo = {};
	    $scope.ItemOriginal = {};
	    $scope.DisplayDate = '';
	    $scope.currentItem = {
	        'accountFrom': '',
	        'accountFromId': '',
	        'accountTo': '',
	        'accountToId': '',
	        'amount': '',
	        'category': '',
	        'categoryid': '',
	        'date': '',
	        'iscleared': false,
	        'isrecurring': false,
	        'istransfer': false,
	        'isphoto': false,
	        'notes': '',
	        'payee': '',
	        'photo': '',
	        'runningbal': '',
	        'type': '',
	        'typedisplay': ''
	    };

	    $scope.firstname = CurrentUserService.firstname;
	    $scope.surename = CurrentUserService.surename;
	    $scope.fullname = function (){
	        return $scope.firstname +" "+ $scope.surename;
	    };

	    $scope.$on('$ionicView.beforeEnter', function () {
	        $scope.hideValidationMessage = true;
	        $scope.userId = myCache.get('thisUserId');
	        $scope.currentItem.typedisplay = PickTransactionServices.typeDisplaySelected;
	        $scope.currentItem.type = PickTransactionServices.typeInternalSelected;
	        $scope.currentItem.payee = PickTransactionServices.payeeSelected;
	        $scope.currentItem.payeeid = PickTransactionServices.payeeid;
	        $scope.currentItem.category = PickTransactionServices.categorySelected;
	        $scope.currentItem.categoryid = PickTransactionServices.categoryid;
	        $scope.currentItem.amount = PickTransactionServices.amountSelected;
	        $scope.currentItem.account = PickTransactionServices.accountSelected;
	        $scope.currentItem.accountId = PickTransactionServices.accountId;
	        $scope.currentItem.accountFrom = PickTransactionServices.accountFromSelected;
	        $scope.currentItem.accountFromId = PickTransactionServices.accountFromId;
	        $scope.currentItem.accountTo = PickTransactionServices.accountToSelected;
	        $scope.currentItem.accountToId = PickTransactionServices.accountToId;
	        $scope.currentItem.photo = PickTransactionServices.photoSelected;
	        if ($scope.currentItem.photo === '') {
	            $scope.currentItem.photo = 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
	        }
	        $scope.currentItem.note = PickTransactionServices.noteSelected;
	        $scope.isTransfer = ($scope.currentItem.typedisplay === "Transfer") ? true : false;
	        // Handle transaction date
	        if (typeof PickTransactionServices.dateSelected !== 'undefined' && PickTransactionServices.dateSelected !== '') {
	            $scope.DisplayDate = PickTransactionServices.dateSelected;
	        }
	        // Handle transaction type
	        if ($scope.currentItem.typedisplay === "Transfer" && $scope.currentItem.accountFromId === $scope.currentItem.accountToId) {
	            PickTransactionServices.typeInternalSelected = 'Income';
	        } else if ($scope.currentItem.typedisplay === "Transfer" && $scope.currentItem.accountFromId !== $scope.currentItem.accountToId) {
	            PickTransactionServices.typeInternalSelected = 'Expense';
	        }
	        // Handle Two Ways Binding
	        if ($scope.currentItem.typedisplay === "Transfer"){
	            $scope.type = function (){ return "transfer ";};
	        } else if ($scope.currentItem.typedisplay === "Income"){
	            $scope.type = function (){ return "get ";};
	        } else if ($scope.currentItem.typedisplay === "Expense"){
	            $scope.type = function (){ return "spend ";};
	        }
	        if ($scope.currentItem.category !== ''){
	            $scope.category = function (){ return " for " + $scope.currentItem.category;};
	        }
	        if ($scope.currentItem.payee !== ''){
	            $scope.location = function (){ return " at " + $scope.currentItem.payee;};
	        }
	        if ($scope.currentItem.amount !== ''){
	            $scope.amount = function (){ return " " + $scope.currentItem.amount;};
	        }
	    });

	    

	    // PICK TRANSACTION TYPE
	    // Don't let users change the transaction type. If needed, a user can delete the transaction and add a new one
	    $scope.pickNewsType = function () {
	            $state.go('app.picknewstype');
	    }

	    // GET PAYEE
	    // Make sure the transaction type (Expense, Income, Transfer) has been selected first
	    $scope.getPayee = function () {
	        if (typeof $scope.currentItem.typedisplay === 'undefined' || $scope.currentItem.typedisplay === '') {
	            $scope.hideValidationMessage = false;
	            $scope.validationMessage = "Please select Transaction Type"
	            return;
	        } else {
	            $state.go('tabsController.pickposttransactionpayee');
	        }
	    }

	    // SAVE
	    $scope.saveTransaction = function () {

	        // Validate form data
	        if (typeof $scope.currentItem.typedisplay === 'undefined' || $scope.currentItem.typedisplay === '') {
	            $scope.hideValidationMessage = false;
	            $scope.validationMessage = "Please select Transaction Type"
	            return;
	        }
	        if (typeof $scope.currentItem.category === 'undefined' || $scope.currentItem.category === '') {
	            $scope.hideValidationMessage = false;
	            $scope.validationMessage = "Please select a Category"
	            return;
	        }
	        if (typeof $scope.currentItem.payee === 'undefined' || $scope.currentItem.payee === '') {
	            $scope.hideValidationMessage = false;
	            $scope.validationMessage = "Please select a Payee"
	            return;
	        }
	        if (typeof $scope.currentItem.amount === 'undefined' || $scope.currentItem.amount === '') {
	            $scope.hideValidationMessage = false;
	            $scope.validationMessage = "Please enter an amount for this transaction"
	            return;
	        }
	        if (typeof $scope.currentItem.accountFrom === $scope.currentItem.accountTo) {
	            $scope.hideValidationMessage = false;
	            $scope.validationMessage = "Transfer Account Cannot Same"
	            return;
	        }

	        // Format date
	        $scope.currentItem.date = Date.now();
	        if (typeof $scope.currentItem.date === 'undefined' || $scope.currentItem.date === '') {
	            $scope.hideValidationMessage = false;
	            $scope.validationMessage = "Please select a date for this transaction"
	            return;
	        }

	        //
	        // Handle transaction type for Transfers
	        //
	        if ($scope.currentItem.typedisplay === "Transfer") {
	            $scope.currentItem.type = 'Expense';
	            $scope.currentItem.istransfer = true;
	        } else {
	            $scope.currentItem.accountFrom = '';
	            $scope.currentItem.accountFromId = '';
	            $scope.currentItem.accountTo = '';
	            $scope.currentItem.accountToId = '';
	            $scope.currentItem.type = $scope.currentItem.typedisplay;
	            $scope.currentItem.istransfer = false;
	        }

	        // Handle default blank photo
	        if ($scope.currentItem.photo === 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==') {
	            $scope.currentItem.photo = '';
	            $scope.currentItem.isphoto = false;
	        } else {
	            $scope.currentItem.isphoto = true;
	        }

	        if ($scope.inEditMode) {
	            //
	            // Update Existing Transaction
	            //
	            var onComplete = function (error) {
	                if (error) {
	                    //console.log('Synchronization failed');
	                }
	            };
	            AccountsFactory.saveTransaction($scope.currentItem);


	            ////
	            //// Update transaction under category
	            ////
	            //var categoryTransactionRef = AccountsFactory.getTransactionByCategoryRef($scope.currentItem.categoryid, $stateParams.transactionId);
	            //var categoryTransaction = {
	            //    payee: $scope.currentItem.payee,
	            //    amount: $scope.currentItem.amount,
	            //    date: $scope.currentItem.date,
	            //    type: $scope.currentItem.type,
	            //    iscleared: $scope.currentItem.iscleared
	            //};
	            //categoryTransactionRef.update(categoryTransaction, onComplete);
	            ////
	            //// Update transaction under payee
	            ////
	            //var payeeTransactionRef = AccountsFactory.getTransactionByPayeeRef($scope.currentItem.payeeid, $stateParams.transactionId);
	            //var payeeTransaction = {
	            //    payee: $scope.currentItem.payee,
	            //    amount: $scope.currentItem.amount,
	            //    date: $scope.currentItem.date,
	            //    type: $scope.currentItem.type,
	            //    iscleared: $scope.currentItem.iscleared
	            //};
	            //payeeTransactionRef.update(payeeTransaction, onComplete);


	            //
	            // Update payee-category relationship
	            //
	            var payee = {};
	            var payeeRef = PayeesService.getPayeeRef($scope.currentItem.payeeid);
	            if ($scope.currentItem.type === "Income") {
	                payee = {
	                    lastamountincome: $scope.currentItem.amount,
	                    lastcategoryincome: $scope.currentItem.category,
	                    lastcategoryidincome: $scope.currentItem.categoryid
	                };
	            } else if ($scope.currentItem.type === "Expense") {
	                payee = {
	                    lastamount: $scope.currentItem.amount,
	                    lastcategory: $scope.currentItem.category,
	                    lastcategoryid: $scope.currentItem.categoryid
	                };
	            }
	            payeeRef.update(payee);

	            //
	            // Update transfer relationship
	            //
	            var accountId = '';
	            var otherAccountId = '';
	            var OtherTransaction = {};
	            if ($scope.ItemOriginal.istransfer) {
	                if ($stateParams.accountId === $scope.currentItem.accountToId) {
	                    // Transfer is coming into the current account --> income
	                    $scope.currentItem.type = 'Income';
	                    accountId = $scope.currentItem.accountToId;
	                    otherAccountId = $scope.currentItem.accountFromId;
	                    OtherTransaction.type = 'Expense';
	                    OtherTransaction.amount = $scope.currentItem.amount;
	                } else {
	                    // Transfer is moving into the other account --> expense
	                    $scope.currentItem.type = 'Expense';
	                    accountId = $scope.currentItem.accountFromId;
	                    otherAccountId = $scope.currentItem.accountToId;
	                    OtherTransaction.type = 'Income';
	                    OtherTransaction.amount = $scope.currentItem.amount;
	                }

	                console.log(OtherTransaction);

	                var transferRef = AccountsFactory.getTransactionRef(otherAccountId, $scope.ItemOriginal.linkedtransactionid);
	                transferRef.update(OtherTransaction);
	            }

	            $scope.inEditMode = false;
	            //
	        } else {
	            //
	            // Create New Transaction
	            //
	            if (isNaN($scope.currentItem.notes)) {
	                $scope.currentItem.notes = "";
	            }
	            if (isNaN($scope.currentItem.photo)) {
	                $scope.currentItem.photo = "";
	            }
	            // Set current house member
	            $scope.currentItem.addedby = myCache.get('thisUserName');
	            $scope.currentItem.userid = myCache.get('thisMemberId');
	            //
	            AccountsFactory.createTransaction($scope.currentItem.accountId, $scope.currentItem);
	        }
	        $scope.currentItem = {};
	        $ionicHistory.goBack();
	    }
	}
})

;
