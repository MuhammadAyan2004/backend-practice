use('airbnb');
db.getCollection('homes').insertMany([
  {
    "username": "Muhammad Ayan",
    "location": "DHA, Karachi.pk",
    "rating": 5,
    "description": "Hello there, this is one of the best villas in the list."
  },
  {
    "username": "Ali Raza",
    "location": "Gulshan, Karachi.pk",
    "rating": 4,
    "description": "Spacious villa with a beautiful garden and modern design."
  },
  {
    "username": "Hassan Khan",
    "location": "Nazimabad, Karachi.pk",
    "rating": 5,
    "description": "Luxury villa with swimming pool and stylish interior."
  },
  {
    "username": "Ahmed Bilal",
    "location": "Clifton, Karachi.pk",
    "rating": 3,
    "description": "Affordable villa with all basic facilities included."
  },
  {
    "username": "Sara Ahmed",
    "location": "PECHS, Karachi.pk",
    "rating": 4,
    "description": "Modern villa located in a prime area with easy access."
  },
  {
    "username": "Usman Ali",
    "location": "Malir, Karachi.pk",
    "rating": 5,
    "description": "A family-friendly villa with spacious rooms and parking."
  },
  {
    "username": "Zainab Fatima",
    "location": "Korangi, Karachi.pk",
    "rating": 2,
    "description": "Budget-friendly villa, needs some renovation work."
  },
  {
    "username": "Farhan Siddiqui",
    "location": "Johar, Karachi.pk",
    "rating": 4,
    "description": "Stylish villa with rooftop space and great ventilation."
  },
  {
    "username": "Ayesha Noor",
    "location": "Garden, Karachi.pk",
    "rating": 5,
    "description": "Beautifully furnished villa, perfect for small families."
  },
  {
    "username": "Hamza Yousuf",
    "location": "Lyari, Karachi.pk",
    "rating": 3,
    "description": "Simple villa with basic facilities at an affordable price."
  }
]
)
console.log('done inserting data');