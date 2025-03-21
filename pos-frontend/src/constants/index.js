import butterChicken from '../assets/images/butter-chicken-4.jpg';
import palakPaneer from '../assets/images/Saag-Paneer-1.jpg';
import biryani from '../assets/images/hyderabadibiryani.jpg';
import masalaDosa from '../assets/images/masala-dosa.jpg';
import choleBhature from '../assets/images/chole-bhature.jpg';
import rajmaChawal from '../assets/images/rajma-chawal-1.jpg';
import paneerTikka from '../assets/images/paneer-tika.webp';
import gulabJamun from '../assets/images/gulab-jamun.webp';
import pooriSabji from '../assets/images/poori-sabji.webp';
import roganJosh from '../assets/images/rogan-josh.jpg';
//import { color } from 'framer-motion';
import { MdTableBar, MdCategory } from 'react-icons/md';
import { BiSolidDish } from 'react-icons/bi';

import img2 from '../assets/images/p2-600x600.gif';
import img4 from '../assets/images/p4-600x600.gif';
import img8 from '../assets/images/p8-600x600.gif';
import d2 from '../assets/images/d2-600x600.png';
import d6 from '../assets/images/d6-600x600.png';
import b7 from '../assets/images/b7-600x600.png';
import pice5 from '../assets/images/cappuccino.png';
import pice9 from '../assets/images/beer.png';


export const popularDishes = [
  {
    id: 1,
    image: img4,
    name: "Texas BBQ",
    numberOfOrders: 220,
  },
  {
    id: 2,
    image: img2,
    name: "Margherita Pizza",
    numberOfOrders: 190,
  },
  {
    id: 3,
    image: d6,
    name: "Oatmeal Chocolate Cookies",
    numberOfOrders: 250,
  },
  {
    id: 4,
    image: pice5,
    name: "Cappuccino",
    numberOfOrders: 300,
  },
  {
    id: 5,
    image: b7,
    name: "Chicago Classic Burger",
    numberOfOrders: 270,
  },
  {
    id: 6,
    image: d2,
    name: "Strawberry Shortcake",
    numberOfOrders: 180,
  },
  {
    id: 7,
    image: img8,
    name: "Saporita Pizza",
    numberOfOrders: 210,
  },
  {
    id: 8,
    image: pice9,
    name: "Beer",
    numberOfOrders: 310,
  },
];


export const tables = [
    { id: 1, name: "Table 1", status: "Booked", initial: "AM", seats: 4 },
    { id: 2, name: "Table 2", status: "Available", initial: "MB", seats: 6 },
    { id: 3, name: "Table 3", status: "Booked", initial: "JS", seats: 2 },
    { id: 4, name: "Table 4", status: "Available", initial: "HR", seats: 4 },
    { id: 5, name: "Table 5", status: "Booked", initial: "PL", seats: 3 },
    { id: 6, name: "Table 6", status: "Available", initial: "RT", seats: 4 },
    { id: 7, name: "Table 7", status: "Booked", initial: "LC", seats: 5 },
    { id: 8, name: "Table 8", status: "Available", initial: "DP", seats: 5 },
    { id: 9, name: "Table 9", status: "Booked", initial: "NK", seats: 6 },
    { id: 10, name: "Table 10", status: "Available", initial: "SB", seats: 6 },
    { id: 11, name: "Table 11", status: "Booked", initial: "GT", seats: 4 },
    { id: 12, name: "Table 12", status: "Available", initial: "JS", seats: 6 },
    { id: 13, name: "Table 13", status: "Booked", initial: "EK", seats: 2 },
    { id: 14, name: "Table 14", status: "Available", initial: "QN", seats: 6 },
    { id: 15, name: "Table 15", status: "Booked", initial: "TW", seats: 3 }
];
export const burgers = [
  { id: 1, name: "Classic Burger", price: 3.20, category: "Burgers" },
  { id: 2, name: "Double Stack", price: 3.50, category: "Burgers" },
  { id: 3, name: "Spicy Inferno", price: 3.90, category: "Burgers" },
  { id: 4, name: "Texas BBQ", price: 4.00, category: "Burgers" },
  { id: 5, name: "Western Bacon", price: 3.80, category: "Burgers" },
  { id: 6, name: "New York Deli", price: 3.70, category: "Burgers" },
  { id: 7, name: "Chicago Classic", price: 3.60, category: "Burgers" },
  { id: 8, name: "Philly Melt", price: 3.40, category: "Burgers" },
  { id: 9, name: "Firehouse Burger", price: 3.90, category: "Burgers" },
  { id: 10, name: "Route 66", price: 3.10, category: "Burgers" },
  { id: 11, name: "The Patriot", price: 3.30, category: "Burgers" },
  { id: 12, name: "Grand Slam", price: 4.00, category: "Burgers" }
];

export const pizzas = [
  { id: 13, name: "Vincent", price: 3.20, category: "Pizzas" },
  { id: 14, name: "Margherita", price: 2.90, category: "Pizzas" },
  { id: 15, name: "Diablo", price: 3.50, category: "Pizzas" },
  { id: 16, name: "Pepperoni", price: 3.40, category: "Pizzas" },
  { id: 17, name: "Carbonara", price: 3.30, category: "Pizzas" },
  { id: 18, name: "Capricciosa", price: 3.60, category: "Pizzas" },
  { id: 19, name: "Prosciutto", price: 3.70, category: "Pizzas" },
  { id: 20, name: "Saporita", price: 3.90, category: "Pizzas" },
  { id: 21, name: "Calzone", price: 4.00, category: "Pizzas" },
  { id: 22, name: "Neapolitano", price: 3.80, category: "Pizzas" },
  { id: 23, name: "Tarantella", price: 3.50, category: "Pizzas" },
  { id: 24, name: "Fortezza", price: 3.20, category: "Pizzas" }
];

export const desserts = [
  { id: 25, name: "Chocolate Cake", price: 3.50, category: "Desserts" },
  { id: 26, name: "Cheesecake", price: 3.80, category: "Desserts" },
  { id: 27, name: "Strawberry Shortcake", price: 2.80, category: "Desserts" },
  { id: 28, name: "Caramel Flan", price: 2.20, category: "Desserts" },
  { id: 29, name: "Ricotta Cheesecake", price: 3.20, category: "Desserts" },
  { id: 30, name: "Oatmeal Chocolate Cookies", price: 3.40, category: "Desserts" },
  { id: 31, name: "Mocha Mousse", price: 2.40, category: "Desserts" },
  { id: 32, name: "Honey Ricotta Pastry", price: 3.40, category: "Desserts" },
  { id: 33, name: "Traditional Sponge Cake", price: 2.40, category: "Desserts" },
  { id: 34, name: "Holiday Fruit Loaf", price: 2.60, category: "Desserts" },
  { id: 35, name: "Cinnamon Sugar Donuts", price: 3.60, category: "Desserts" },
  { id: 36, name: "Affogato", price: 3.10, category: "Desserts" }
];

export const drinks = [
  { id: 37, name: "Coca-Cola", price: 0.99, category: "Drinks" },
  { id: 38, name: "Pepsi", price: 0.99, category: "Drinks" },
  { id: 39, name: "Fanta", price: 0.89, category: "Drinks" },
  { id: 40, name: "Sprite", price: 0.89, category: "Drinks" },
  { id: 41, name: "Cappuccino", price: 2.10, category: "Drinks" },
  { id: 42, name: "Ice Coffee", price: 2.00, category: "Drinks" },
  { id: 43, name: "Turkish Coffee", price: 1.20, category: "Drinks" },
  { id: 44, name: "Espresso", price: 1.80, category: "Drinks" },
  { id: 45, name: "Beer", price: 2.20, category: "Drinks" },
  { id: 46, name: "Wine", price: 2.20, category: "Drinks" },
  { id: 47, name: "Whiskey", price: 3.20, category: "Drinks" },
  { id: 48, name: "Martini", price: 3.40, category: "Drinks" }
];
export const menus = [
  { id: 1, name: "Burgers", bgColor: "#b73e3e", icon: "🍔", items: burgers },
  { id: 2, name: "Pizzas", bgColor: "#5b45b0", icon: "🍕", items: pizzas },
  { id: 3, name: "Desserts", bgColor: "#1d2569", icon: "🍰", items: desserts },
  { id: 4, name: "Drinks", bgColor: "#7f167f", icon: "🍹", items: drinks }
];

export const metricsData = [
  { title: "Revenue", value: "$50,846.90", percentage: "12%", color: "#025cca", isIncrease: false },
  { title: "Outbound Clicks", value: "10,342", percentage: "16%", color: "#02ca3a", isIncrease: true },
  { title: "Total Customer", value: "19,720", percentage: "10%", color: "#f6b100", isIncrease: true },
  { title: "Event Count", value: "20,000", percentage: "10%", color: "#be3e3f", isIncrease: false },
];

export const itemsData = [
  { title: "Total Categories", value: "8", percentage: "12%", color: "#5b45b0", isIncrease: false },
  { title: "Total Dishes", value: "50", percentage: "12%", color: "#285430", isIncrease: true },
  { title: "Active Orders", value: "12", percentage: "12%", color: "#735f32", isIncrease: true },
  { title: "Total Tables", value: "10", color: "#7f167f", percentage: "0%", isIncrease: false }
];

export const orders = [
  {
    id: "101",
    customer: "Amrit Raj",
    status: "Ready",
    dateTime: "January 18, 2025 08:32 PM",
    items: 8,
    tableNo: 3,
    total: 250.0,
  },
  {
    id: "102",
    customer: "John Doe",
    status: "In Progress",
    dateTime: "January 18, 2025 08:45 PM",
    items: 5,
    tableNo: 4,
    total: 180.0,
  },
  {
    id: "103",
    customer: "Emma Smith",
    status: "Ready",
    dateTime: "January 18, 2025 09:00 PM",
    items: 3,
    tableNo: 5,
    total: 120.0,
  },
  {
    id: "104",
    customer: "Chris Brown",
    status: "In Progress",
    dateTime: "January 18, 2025 09:15 PM",
    items: 6,
    tableNo: 6,
    total: 220.0,
  },
];

const buttons = [
  { label: "Add Table", icon: MdTableBar, action: "table" },
  { label: "Add Category", icon: MdCategory, action: "category" },
  { label: "Add Dishes", icon: BiSolidDish, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payments"];