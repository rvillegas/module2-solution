(function () {
  'use strict';
  var initList = [
    {
      name: "Milk",
      quantity: "2 bottles",
      bought: false
    },
    {
      name: "Donuts",
      quantity: "200",
      bought: false
    },
    {
      name: "Cookies",
      quantity: "3 bags",
      bought: false
    },
    {
      name: "Chocolate",
      quantity: "2 bags",
      bought: false
    },
    {
      name: "CocaCola",
      quantity: "12 bottles",
      bought: false
    },
    {
      name: "Beer",
      quantity: "6 bottles",
      bought: false
    },
    {
      name: "Eggs",
      quantity: "12",
      bought: false
    },

  ];
  angular.module('CheckOffApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .controller('BoughtListController', BoughtListController)
    .provider('ShoppingList', ShoppingListProvider)
    .config(Config);


  Config.$inject = ['ShoppingListProvider'];
  function Config(ShoppingListProvider) {
    ShoppingListProvider.defaults = { initItems: initList };
  }


  // LIST #1 - controller
  ShoppingListController.$inject = ['ShoppingList'];

  function ShoppingListController(ShoppingList) {
    var list1 = this;
    list1.items = ShoppingList.getItems();
    list1.itemsToBuy = ShoppingList.getItemsToBuy();
    console.log(list1.items);
    list1.itemName = "";
    list1.itemQuantity = "";
    list1.bought = false;
    list1.LengthToBuy = function() {
      return ShoppingList.getItemsToBuy().length
    }
    list1.addItem = function () {
      ShoppingList.addItem(list1.itemName, list1.itemQuantity);
    }

    list1.removeItem = function (itemIndex) {
      ShoppingList.removeItem(itemIndex);
    }


    list1.checkboxClick = function (idx) {
      ShoppingList.toggle(idx);
    }

    list1.verxcomprar = function () {
      ShoppingList.verxcomprar()
    }
  }
    // LIST #2 - controller
    BoughtListController.$inject = ['ShoppingList'];

    function BoughtListController(ShoppingList) {
      var list2 = this;

      // Use factory to create new shopping list service
      list2.items = ShoppingList.getItems();
      list2.itemsBought = ShoppingList.getItemsBought();
      console.log(list2.items);

      list2.LengthBought = function() {
        console.log('ShoppingList.getItemsBought().length:'+ShoppingList.getItemsBought().length)
        return ShoppingList.getItemsBought().length
      }

      list2.removeItem = function (itemIndex) {
        ShoppingList.removeItem(itemIndex);
      };
    }


    // If not specified, maxItems assumed unlimited
    function ShoppingListService(initItems) {
      var service = this;


      // List of shopping items
      var items = [];
      for (var item in initItems)
        items.push(initItems[item]);


       service.toggle = function(idx) {
        items[idx].bought = true;  
        //items[idx].bought = !items[idx].bought;
        console.log('idx:' + idx);
        console.log(items[idx].bought);
      }

      service.addItem = function (itemName, quantity) {
        var item = {
          name: itemName,
          quantity: quantity,
          bought: false
        };
        items.push(item);
      };


      service.removeItem = function (itemIndex) {
        items.splice(itemIndex, 1);
      };

      service.getItems = function () {
        return items;
      };


      service.getItemsBought = function () {
        return items.filter(item => item.bought);
      };

      service.getItemsToBuy = function () {
        return items.filter(item => !item.bought);
      };

      service.verxcomprar = function () {
        console.log('Items');
        console.log(items);
      }

    }

    function ShoppingListProvider() {
      var provider = this;
      provider.defaults = {
        initItems: initList
      };
      //console.log(provider.defaults.initItems);
      provider.$get = function () {
        var shoppingList = new ShoppingListService(provider.defaults.initItems);

        return shoppingList;
      };
    }


  }) ();
