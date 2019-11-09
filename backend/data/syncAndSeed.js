const connection = require('./connection');
const {
  Brand,
  Tag,
  User,
} = require('./models/');

const syncAndSeed = async () => {
  await connection.sync({ force: true });

  const tagNames = [
    'Women',
    'Men',
    'Clothing',
    'Accessories',
    'Shoes',
    'Bag',
    'Beauty',
    'Digital',
  ];

  const [
    women,
    men,
    clothing,
    accessories,
    shoes,
    bag,
    beauty,
    digital,
  ] = await Promise.all(tagNames.map((name) => Tag.create({ name })));

  const [
    zara,
    acne,
    everlane,
    rains,
  ] = await Promise.all(
    [
      {
        name: 'Zara',
        image:
          'https://static.zara.net/mstatic/1572966813976//images/zara_webmobile_icon_1024x1024.png',
        description:
          'Zara is one of the biggest international fashion companies, and it belongs to Inditex, one of the world’s largest distribution groups.The customer is at the heart of our unique business model, which includes design, production, distribution, and sales, through our extensive retail network.',
        priceRange: 3,
      },
      {
        name: 'Acne Studio',
        image: 'https://www.acnestudios.com/on/demandware.static/Sites-acne_other_eu-Site/-/default/dwec2bc737/images/apple-icon-180x180-precomposed.png',
        description:
          'Acne Studios is a Stockholm-based fashion house with a multidisciplinary approach. Through founder and Creative Director Jonny Johansson’s interest in photography, art, architecture and contemporary culture, an alternative path has been found, turning Acne Studios into a well-respected creator of ready-to-wear, magazines, furniture, books and exhibitions.The collections are defined by Jonny Johansson’s signature juxtaposing design and attention to detail, with an emphasis on tailoring and an eclectic use of materials and custom-developed fabrics. The collections cover men’s and women’s ready-to-wear, footwear, accessories and denim.',
        priceRange: 4,
      },
      {
        name: 'Everlane',
        image:
          'https://user-images.githubusercontent.com/4413445/67622314-5a89d800-f7e7-11e9-9162-4b9190978f70.png',
        description:
          'At Everlane, we want the right choice to be as easy as putting on a great T-shirt. That’s why we partner with the best, ethical factories around the world. Source only the finest materials. And share those stories with you—down to the true cost of every product we make. It’s a new way of doing things. We call it Radical Transparency.',
        priceRange: 2,
      },
      {
        name: 'Rains',
        image:
          'https://user-images.githubusercontent.com/4413445/67622317-5a89d800-f7e7-11e9-89f5-75faea33bc65.png',
        description:
          'Rains is a contemporary rainwear lifestyle brand creating waterproof designs for the global citizen. Influenced by its Scandinavian heritage, Rains practices an uncompromising approach to simplicity that is as equally rooted in functionality as it is in relevance. Rains is of the opinion that proper rainwear need not come at the cost of considered design. Rather, Rains apparel, bags, and accessories are designed to withstand the stormiest of weather, all while speaking to the current tendencies of today.',
        priceRange: 3,
      },
    ].map((brand) => Brand.create(brand)),
  );

  const users = await Promise.all(
    [
      {
        firstName: 'Effy',
        lastName: 'Zhang',
        email: 'yifei0730@gmail.com',
        password: 'password',
      },
      {
        firstName: 'Brian',
        lastName: 'Lovin',
        email: 'briandlovin@gmail.com',
        password: 'password',
      },
    ].map((user) => User.create(user)),
  );
};

module.exports = syncAndSeed;
