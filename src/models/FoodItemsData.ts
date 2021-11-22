import { v4 as uuidv4 } from "uuid";

export default [
  {
    id: uuidv4(),
    name: "Berry Smoothie",
    description:
      "Smoothie with coconut milk, banana, blueberries and strawberries.",
    type: "Breakfast",
    price: "7.00",
    image: "images/smoothie.jpg",
    glutenFree: true,
    vegan: true,
  },
  {
    id: uuidv4(),
    name: "Acai Bowl",
    description:
      "Acai base topped with coconut flakes, mixed nuts and dried fruit.",
    type: "Breakfast",
    price: "8.50",
    image: "images/acai-bowl.jpg",
    glutenFree: false,
    vegan: true,
  },
  {
    id: uuidv4(),
    name: "Green Smoothie",
    description: "Smoothie with coconut milk, kiwi, spinach and banana.",
    type: "Breakfast",
    price: "7.00",
    image: "images/green-smoothie.jpg",
    glutenFree: true,
    vegan: true,
  },
  {
    id: uuidv4(),
    name: "Yogurt Parfait",
    description: "Greek yogurt with gluten free granola and fresh berries.",
    type: "Breakfast",
    price: "5.00",
    image: "images/granola.jpg",
    glutenFree: true,
    vegan: false,
  },
  {
    id: uuidv4(),
    name: "Spinach Salad",
    description:
      "Spinach salad with chicken, pomegranate and balsamic dressing.",
    type: "Dinner",
    price: "12.00",
    image: "images/salad.jpg",
    glutenFree: true,
    vegan: false,
  },
  {
    id: uuidv4(),
    name: "Avocado Toast",
    description: "Avocado toast topped with scrambled eggs and garnish.",
    type: "Breakfast",
    price: "7.50",
    image: "images/avocado.jpg",
    glutenFree: false,
    vegan: false,
  },
  {
    id: uuidv4(),
    name: "Vegetable Soup",
    description:
      "Tomato based vegetable soup with spinach, carrots and potatoes served with gluten free bread.",
    type: "Dinner",
    price: "11.00",
    image: "images/soup.jpg",
    glutenFree: true,
    vegan: true,
  },
  {
    id: uuidv4(),
    name: "Hummus Plate",
    description:
      "Hummus plate served with fresh pita bread and sliced cucumbers and tomatoes.",
    type: "Lunch",
    price: "8.50",
    image: "images/hummus.jpg",
    glutenFree: false,
    vegan: true,
  },
];
