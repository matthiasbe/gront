grontApp.controller('MainCtrl', function ($scope, $ionicActionSheet, $state) {

   $scope.triggerActionSheet = function() {

      // Show the action sheet
      var showActionSheet = $ionicActionSheet.show({
         buttons: [
            { text: 'Concept' },
            { text: 'Traiteur événement' },
            { text: 'Contact'}
         ],
			
         cancelText: 'Cancel',
			
         cancel: function() {
            // add cancel code...
         },
			
         buttonClicked: function(index) {
         	
            if(index === 0) {
               // add edit 1 code
               $state.go('concept')
               
            }
				
            if(index === 1) {
               // add edit 2 code
               $state.go('traiteur')
            }

            if(index === 2) {
            	$state.go('contact')
            }
         },
			
         destructiveButtonClicked: function() {
            // add delete code..
         }
      });
   };

})