db.clothes.insertMany([
   {  userId:"5b871f44627da2c6d760dcf0", image: "https://tse3.mm.bing.net/th?id=OIP.yCnkuSTpU2UC_dDnTsRYAQHaHa&pid=15.1&P=0&w=300&h=300", type:"Jacket", color:"Gray"},
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://s-media-cache-ak0.pinimg.com/originals/43/74/60/43746052adaa6ca9417064416df8d785.jpg", type:"Accessories", color:"Black"},
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/81Dzp955GmL._SL150_.jpg", type:"Bottom", color:"Black" },
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-na.ssl-images-amazon.com/images/I/81SIpVB3w4L._UY879_.jpg", type:"Bottom", color:"Wine" },
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-na.ssl-images-amazon.com/images/I/81nBFh3LXaL._UY879_.jpg", type:"Bottom", color:"Green" },
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-na.ssl-images-amazon.com/images/I/91L4%2BGPmt8L._UY879_.jpg", type:"Bottom", color:"Pink" },
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/81OE9gF43uL._SL150_.jpg", type:"Bottom", color:"Maroon" },
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/41k-oNe0GmL._AC_UL520_SR400,520_FMwebp_QL65_.jpg", type:"Top", color:"Coral" },
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/51YrUVh9aTL._AC_UL500_SR385,500_FMwebp_QL65_.jpg", type:"Top", color:"Blue" },
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/31C757boeKL._AC_UL500_SR385,500_QL65_.jpg", type:"Top", color:"White" },
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-na.ssl-images-amazon.com/images/I/81hCLvyOSSL._AC_UL480_SR378,480_.jpg", type:"Top", color:"Yellow" },
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/81sAXcv99fL._SL150_.jpg", type:"Top", color:"Black" },
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-na.ssl-images-amazon.com/images/I/61%2B4bW3J3qL._AC_UL480_SR384,480_.jpg", type:"Top", color:"Green" },
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/41WuerS-4WL._AC_UL520_SR400,520_FMwebp_QL65_.jpg", type:"Footwear", color:"Black" },
   {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/41iWrVhQSbL._AC_UL520_SR400,520_FMwebp_QL65_.jpg", type:"Top", color:"Tan" },
    {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/41iWrVhQSbL._AC_UL520_SR400,520_FMwebp_QL65_.jpg", type:"Top", color:"Tan" },
     {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/41iWrVhQSbL._AC_UL520_SR400,520_FMwebp_QL65_.jpg", type:"Top", color:"Tan" },
      {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/41iWrVhQSbL._AC_UL520_SR400,520_FMwebp_QL65_.jpg", type:"Top", color:"Tan" },
       {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/41iWrVhQSbL._AC_UL520_SR400,520_FMwebp_QL65_.jpg", type:"Top", color:"Tan" },
        {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/41iWrVhQSbL._AC_UL520_SR400,520_FMwebp_QL65_.jpg", type:"Top", color:"Tan" },
         {  userId:"5b871f44627da2c6d760dcf0",image: "https://images-eu.ssl-images-amazon.com/images/I/41iWrVhQSbL._AC_UL520_SR400,520_FMwebp_QL65_.jpg", type:"Top", color:"Tan" },

])


db.outfits.insertMany([
   { userId:"5b78af03d65744eeecb2d530", clothesId:["5b7e2870a49a3ee8922cbab0", "5b7e2870a49a3ee8922cbab1"], weather:"winter", occassion:"office"},
   {  userId:"5b78af03d65744eeecb2d530", clothesId:["5b7e2870a49a3ee8922cbab1", "5b7e2870a49a3ee8922cbab2"],  weather:"summer", occassion:"party"}
  ])


db.recommendations.insertMany([
     { userId:"5b78af03d65744eeecb2d530", outfitsId:"5b7e49711d633803623e2423", occassion:"office", lastWornDate: "Nov 03 2018"},
     {  userId:"5b78af03d65744eeecb2d530",  outfitsId:"5b7e49711d633803623e2424", occassion:"party", lastWornDate: "Nov 23 2018"}
    ])

    db.clothes.insertMany([
       { _id: ObjectId("5b7e2870a49a3ee8922cbab0"), userId:"5b78af03d65744eeecb2d530", image: "https://tse3.mm.bing.net/th?id=OIP.yCnkuSTpU2UC_dDnTsRYAQHaHa&pid=15.1&P=0&w=300&h=300", type:"Jacket", color:"Gray"},
       { _id: ObjectId("5b7e2870a49a3ee8922cbab1"),  userId:"5b78af03d65744eeecb2d530",image: "https://s-media-cache-ak0.pinimg.com/originals/43/74/60/43746052adaa6ca9417064416df8d785.jpg", type:"Accessories", color:"Black"},
       { _id: ObjectId("5b7e2870a49a3ee8922cbab2"),  userId:"5b78af03d65744eeecb2d530",image: "https://images-eu.ssl-images-amazon.com/images/I/81Dzp955GmL._SL150_.jpg", type:"Top", color:"Blue" }
    ])

    db.clothes.insertMany([
       {  userId:"5b78af03d65744eeecb2d530", image: "https://tse3.mm.bing.net/th?id=OIP.yCnkuSTpU2UC_dDnTsRYAQHaHa&pid=15.1&P=0&w=300&h=300", type:"Jacket", color:"Gray"},
       {  userId:"5b78af03d65744eeecb2d530",image: "https://s-media-cache-ak0.pinimg.com/originals/43/74/60/43746052adaa6ca9417064416df8d785.jpg", type:"Accessories", color:"Black"},
       {  userId:"5b78af03d65744eeecb2d530",image: "https://images-eu.ssl-images-amazon.com/images/I/81Dzp955GmL._SL150_.jpg", type:"Top", color:"Blue" }
    ])
