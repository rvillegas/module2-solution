var initList = [
    {
      name: "Milk",
      quantity: "2 bottles",
      bought:false
    },
    {
      name: "Donuts",
      quantity: "200",
      bought:false
    },
    {
      name: "Cookies",
      quantity: "3 bags",
      bought:false
    },
    {
      name: "Chocolate",
      quantity: "2 bags",
      bought:true
    },
    {
        name: "CocaCola",
        quantity: "12 bottles",
        bought:true
      },
      {
        name: "Beer",
        quantity: "6 bottles",
        bought:false
      },
      {
        name: "Eggs",
        quantity: "12",
        bought:false
      },

  ];

  var items = [];
  for (var item in initList)
  items.push(initList[item]);

  console.log(items.filter(item => !item.bought))