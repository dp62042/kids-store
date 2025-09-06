const mongoose = require('mongoose')
const Item = require('../models/Item')
const dotenv = require('dotenv')
dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('seed data connected'))
  .catch((err) => console.error('seed data connection error', err))

const items = [
  {
    title: 'Lego Classic Box',
    description: 'Creative building toy set for kids.',
    price: 1200,
    category: 'Toys',
    image:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT5MC4byZjcU--012Et6dR5U1AJOxTca1MOIpAZO7obuTJVEekoOXcNe0snleTgmAkuikLkbY9nbiCEPp9bXhY5Bt4NIvmeVfhwrRpq7w8MpTTQlKQOgXf6GQ',
  },
  {
    title: 'Barbie Doll',
    description: 'Fashion doll with accessories.',
    price: 800,
    category: 'Toys',
    image:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSgSjg6nMys53wOoO-aTZ6BBx5BZFL4y045JjMF6WF72YswoHLHpUG1VTVtG_icMA7r5FCo-QfRdK-YyeTnU0L94r9QUMHHjnSTBgWUNfNTyHrYtVWlxc-s',
  },
  {
    title: 'Hot Wheels Car Set',
    description: 'Pack of 5 die-cast cars.',
    price: 500,
    category: 'Toys',
    image:
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTHU6XXKo3ault1znArxs2PKRQiwC9AMaC6JokoHs3x0oLHnHFugwplJejZ_5SawoYT-mL6bI7xh5gA0PexnSCCoM5N6APH_Q_DvLMLSCz-ug3tBLbXMcJb7A',
  },
  {
    title: 'Spider-Man T-Shirt',
    description: 'Superhero merchandise for kids.',
    price: 600,
    category: 'Merchandise',
    image:
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTyjwu0mvYiYLO9PP_bxVMC3lrPjw7crOCFP3ZfDKnu5BFiNu-kfwuRNXAkxA3Iy4CRINinI4ndOEXz-ulpkDRjMWEX0aTpv2-Csh9c3JKx52R26aAH0bTH',
  },
  {
    title: 'Avengers School Bag',
    description: 'Stylish and durable school bag.',
    price: 1500,
    category: 'Merchandise',
    image:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ1KVNsLOwjjY7e2NyoGXYuxDHTy7k8lrtvKy85DMK47Q8l7gKByHFEyCcZDinxmgmEq5jKxvOlV2hjHgIcEOCEUhoj3mWrwia8p-OwVikyz1esjfDLNaxw',
  },
  {
    title: 'Mickey Mouse Cap',
    description: 'Cartoon-themed cap for kids.',
    price: 300,
    category: 'Merchandise',
    image:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRkEmsSCiJnoQu_arFI9JPduZHXPX6e-oZerJ_Ij7Aqz4p22rvccnRo91MJpbvYPxVahXFCIawmyIb9o-TcFaVuFmKHOvXMDMWIGY6B0eVhnNUFFmCA9dD0kQ',
  },
]

async function seedDB() {
  try {
    await Item.deleteMany({})
    console.log('Old items removed.')

    await Item.insertMany(items)
    console.log('Items seeded successfully.')
  } catch (error) {
    console.error('Seeding error:', error)
  } finally {
    mongoose.connection.close()
  }
}

seedDB()
