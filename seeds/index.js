const Campground = require('../model/campground')
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => {
        console.log("DataBase Connected")
    })
    .catch(err => {
        console.log('oh My God')
        console.log(err);

    });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {

});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64abde99f4294318ee051b33',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]

            },

            images: [
                {
                    url: 'https://res.cloudinary.com/dju1p624n/image/upload/v1689054555/YelpCamp/z9hpxjlhfuvwimxmpfjq.jpg',
                    filename: 'YelpCamp/z9hpxjlhfuvwimxmpfjq',

                },
                {
                    url: 'https://res.cloudinary.com/dju1p624n/image/upload/v1689054555/YelpCamp/ghlqao37gqel9jqtlooe.jpg',
                    filename: 'YelpCamp/ghlqao37gqel9jqtlooe',

                },
                {
                    url: 'https://res.cloudinary.com/dju1p624n/image/upload/v1689054555/YelpCamp/onilczrlwaarqiytgr1g.jpg',
                    filename: 'YelpCamp/onilczrlwaarqiytgr1g',

                }

            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})