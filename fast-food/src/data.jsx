import img1 from './assets/p1-600x600.gif';
import img2 from './assets/p2-600x600.gif';
import img3 from './assets/p3-600x600.gif';
import img4 from './assets/p4-600x600.gif';
import img5 from './assets/p5-600x600.gif';
import img6 from './assets/p6-600x600.gif';
import img7 from './assets/p7-600x600.gif';
import img8 from './assets/p8-600x600.gif';
import img9 from './assets/p9-600x600.gif';
import img10 from './assets/p10-600x600.gif';
import img11 from './assets/p11-600x600.gif';
import img12 from './assets/p12-600x600.gif';
import b1 from './assets/b1-600x600.png';
import b2 from './assets/b2-600x600.png';
import b3 from './assets/b3-600x600.png';
import b4 from './assets/b4-600x600.png';
import b5 from './assets/b5-600x600.png';
import b6 from './assets/b6-600x600.png';
import b7 from './assets/b7-600x600.png';
import b8 from './assets/b8-600x600.png';
import b9 from './assets/b9-600x600.png';
import b10 from './assets/b10-600x600.png';
import b11 from './assets/b11-600x600.png';
import b12 from './assets/b12-600x600.png';
import d1 from './assets/d1-600x600.png';
import d2 from './assets/d2-600x600.png';
import d3 from './assets/d3-600x600.png';
import d4 from './assets/d4-600x600.png';
import d5 from './assets/d5-600x600.png';
import d6 from './assets/d6-600x600.png';
import d7 from './assets/d7-600x600.png';
import d8 from './assets/d8-600x600.png';
import d9 from './assets/d9-600x600.png';
import d10 from './assets/d10-600x600.png';
import d11 from './assets/d11-600x600.png';
import d12 from './assets/d12-600x600.png';
import pice1 from './assets/coca-cola.png';
import pice2 from './assets/pepsi.png'
import pice3 from './assets/fanta.png'
import pice4 from './assets/spite.png'
import pice5 from './assets/cappuccino.png'
import pice6 from './assets/ice-coffe.png'
import pice7 from './assets/turska.png'
import pice8 from './assets/espresso.png'
import pice9 from './assets/beer.png'
import pice10 from './assets/vine.png'
import pice11 from './assets/viskey.png'
import pice12 from './assets/martini.png'

const menuItems = [
  {
    category: "Burgers",
    items: [
      { amount: 1, id: 1, name: "Classic Burger", description: "Juicy beef patty with lettuce, tomato, and cheese", image: b1, price: 3.20 },
      { amount: 1, id: 2, name: "Double Stack", description: "Double beef patties with melted cheddar and pickles", image: b2, price: 3.50 },
      { amount: 1, id: 3, name: "Spicy Inferno", description: "Spicy jalapeños, pepper jack cheese, and chipotle mayo", image: b3, price: 3.90 },
      { amount: 1, id: 4, name: "Texas BBQ", description: "Smoky barbecue sauce, crispy bacon, and cheddar cheese", image: b4, price: 4.00 },
      { amount: 1, id: 5, name: "Western Bacon", description: "Crispy onion rings, bacon, and smoky BBQ sauce", image: b5, price: 3.80 },
      { amount: 1, id: 6, name: "New York Deli", description: "Swiss cheese, pastrami, and mustard on a brioche bun", image: b6, price: 3.70 },
      { amount: 1, id: 7, name: "Chicago Classic", description: "Angus beef, grilled onions, and American cheese", image: b7, price: 3.60 },
      { amount: 1, id: 8, name: "Philly Melt", description: "Sautéed mushrooms, provolone cheese, and garlic aioli", image: b8, price: 3.40 },
      { amount: 1, id: 9, name: "Firehouse Burger", description: "Spicy habanero sauce, pepper jack cheese, and jalapeños", image: b9, price: 3.90 },
      { amount: 1, id: 10, name: "Route 66", description: "Classic burger with lettuce, tomato, pickles, and mayo", image: b10, price: 3.10 },
      { amount: 1, id: 11, name: "The Patriot", description: "Thick-cut bacon, American cheese, and secret sauce", image: b11, price: 3.30 },
      { amount: 1, id: 12, name: "Grand Slam", description: "Triple beef patties, cheddar, and crispy bacon", image: b12, price: 4.00 }
    ]
  },
  {
    category: "Pizzas",
    items: [
      { amount: 1, id: 13, name: "Vincent", description: "Classic marinara sauce, authentic old-world pepperoni", image: img1, price: 3.20 },
      { amount: 1, id: 14, name: "Margherita", description: "Fresh mozzarella, tomatoes, and basil", image: img2, price: 2.90 },
      { amount: 1, id: 15, name: "Diablo", description: "Spicy sausage, jalapeños, and hot sauce", image: img3, price: 3.50 },
      { amount: 1, id: 16, name: "Pepperoni", description: "Rich tomato sauce, mozzarella, and spicy pepperoni", image: img4, price: 3.40 },
      { amount: 1, id: 17, name: "Carbonara", description: "Creamy sauce, pancetta, and parmesan", image: img5, price: 3.30 },
      { amount: 1, id: 18, name: "Capricciosa", description: "Tomato sauce, ham, mushrooms, and artichokes", image: img6, price: 3.60 },
      { amount: 1, id: 19, name: "Prosciutto", description: "Mozzarella, arugula, and thinly sliced prosciutto", image: img7, price: 3.70 },
      { amount: 1, id: 20, name: "Saporita", description: "Sun-dried tomatoes, gorgonzola, and walnuts", image: img8, price: 3.90 },
      { amount: 1, id: 21, name: "Calzone", description: "Folded pizza with ricotta, mozzarella, and ham", image: img9, price:4.00 },
      { amount: 1, id: 22, name: "Neapolitano", description: "San Marzano tomatoes, fresh basil, and buffalo mozzarella", image: img10, price: 3.80 },
      { amount: 1, id: 23, name: "Tarantella", description: "Spicy salami, roasted red peppers, and black olives", image: img11, price: 3.50 },
      { amount: 1, id: 24, name: "Fortezza", description: "Four cheeses blend, garlic, and oregano", image: img12, price: 3.20 },
    ]

  },
  {
    category: "Desserts",
    items: [
      { amount: 1, id: 25, name: "Chocolate Cake", description: "Rich chocolate cake with cream", image: d1, price: 3.50 },
      { amount: 1, id: 26, name: "Cheesecake", description: "Creamy cheesecake with strawberry topping", image: d3, price: 3.80 },
      { amount: 1, id: 27, name: "Strawberry Shortcake", description: "Fluffy vanilla sponge cake layered with fresh strawberries and whipped cream", image: d2, price: 2.80 },
      { amount: 1, id: 28, name: "Caramel Flan", description: "Silky smooth custard topped with a rich caramel sauce", image: d4, price: 2.20 },
      { amount: 1, id: 29, name: "Ricotta Cheesecake", description: "Delicate and creamy cheesecake made with ricotta and a hint of lemon", image: d5, price: 3.20 },
      { amount: 1, id: 30, name: "Oatmeal Chocolate Cookies", description: "Crunchy oatmeal cookies with chunks of rich chocolate", image: d6, price: 3.40 },
      { amount: 1, id: 31, name: "Mocha Mousse", description: "Light and airy chocolate mousse with a hint of espresso", image: d7, price: 2.40 },
      { amount: 1, id: 32, name: "Honey Ricotta Pastry", description: "Golden-brown pastry filled with sweet ricotta and drizzled with honey", image: d8, price: 3.40 },
      { amount: 1, id: 33, name: "Traditional Sponge Cake", description: "Soft and fluffy sponge cake, a perfect base for any dessert", image: d9, price: 2.40 },
      { amount: 1, id: 34, name: "Holiday Fruit Loaf", description: "Sweet and fluffy bread loaded with candied fruits and nuts", image: d10, price: 2.60 },
      { amount: 1, id: 35, name: "Cinnamon Sugar Donuts", description: "Warm, fluffy donuts coated in cinnamon sugar", image: d11, price: 3.60 },
      { amount: 1, id: 36, name: "Affogato", description: "A scoop of vanilla ice cream drowned in a shot of hot espresso", image: d12, price: 3.10 },
      

    ],

  },
  {
    category: "Drinks",
    items: [
      { amount: 1, id: 37, name: "Coca-Cola", description: "Refreshing carbonated soft drink with a classic cola taste", image: pice1, price: 0.99 },
      { amount: 1, id: 38, name: "Pepsi", description: "Sweet and smooth cola with a bold taste", image: pice2, price: 0.99 },
      { amount: 1, id: 39, name: "Fanta", description: "Fizzy orange-flavored soda with a fruity twist", image: pice3, price: 0.89 },
      { amount: 1, id: 40, name: "Sprite", description: "Crisp and refreshing lemon-lime soda", image: pice4, price: 0.89 },
      { amount: 1, id: 41, name: "Cappuccino", description: "Rich espresso with steamed milk and a foamy top", image: pice5, price: 2.10 },
      { amount: 1, id: 42, name: "Ice Coffee", description: "Chilled coffee served over ice, smooth and refreshing", image: pice6, price: 2.00 },
      { amount: 1, id: 43, name: "Turkish Coffee", description: "Strong and aromatic coffee brewed in a traditional way", image: pice7, price: 1.20 },
      { amount: 1, id: 44, name: "Espresso", description: "Bold and intense shot of pure coffee", image: pice8, price: 1.80 },
      { amount: 1, id: 45, name: "Beer", description: "Cold and crisp brewed beverage with a smooth finish", image: pice9, price: 2.20 },
      { amount: 1, id: 46, name: "Wine", description: "Fine selection of red and white wines", image: pice10, price: 2.20 },
      { amount: 1, id: 47, name: "Whiskey", description: "Aged and refined, smooth with a rich aroma", image: pice11, price: 3.20 },
      { amount: 1, id: 48, name: "Martini", description: "Classic cocktail with a mix of gin and vermouth", image: pice12, price: 3.40 },
    ],
  }
];
export default menuItems;