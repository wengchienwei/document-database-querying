// initial exploration
db.products.find().count()
db.products.find({nutriments: {$exists: true}}, {nutriments:1})


// 1.1 exercise
// total documents
var total = db.products.count()
// product_name = 94.94%
var product_name = db.products.find({"product_name": {$exists: true}}).count()
print(product_name/total*100 + "%")
// check not empty
db.products.find({
    "traces": {$nin: [null, "", []]}
}, {traces: 1})


// 1.2 exercise
//query01
db.products.count()
// sample01
db.products.findOne({}, {product_name: 1})

//query02
db.products.find({product_name: "Sharon's, sorbet, dutch chocolate"}, {product_name:1})

//query03
db.products.find({_id: "0009073102079"}, {rev:1, product_name:1})

//query04
db.products.find({"nutriments.sodium": {$exists: true}}).count()
//sample04
db.products.findOne({"nutriments.sodium": {$exists: true}}, {"nutriments.sodium":1})

//query05
db.products.find({nutriscore_grade: "c"}).count()
//sample05
db.products.findOne({nutriscore_grade: "c"}, {nutriscore_grade:1})

//query06
db.products.distinct("creator").length
//sample06
db.products.findOne({creator: {$exists: true}}, {creator:1})

//query07
db.products.aggregate([
    {$group: {_id: "$creator", count: {$sum: 1}}},
    {$match: {count: {$gt: 1}}},
    {$count: "total"}
])
//sample07
db.products.aggregate([
    {$group: {_id: "$creator", count: {$sum:1}}},
    {$match: {count: {$gt:1}}},
    {$sort: {count:-1}},
    {$limit:1}
])

//query08
db.products.find({last_modified_t: {$exists: true}}, {last_modified_t:1})
           .sort({last_modified_t:-1})
           .limit(1)

//query09
db.products.find({ingredients_tags: {$size:1}}, {ingredients_tags:1}).count()
//sample09
db.products.findOne({ingredients_tags: {$size:1}}, {ingredients_tags:1})

//query10
db.products.find(
    {
     ingredients_tags: {$exists: true},
     $expr: {$gte: [{$size: "$ingredients_tags"}, 20]}
     },
    {ingredients_tags:1}
).count()
//sample10
db.products.findOne(
    {
     ingredients_tags: {$exists: true},
     $expr: {$gte: [{$size: "$ingredients_tags"}, 20]}
     },
    {ingredients_tags:1}
)

//query11
db.products.find({_keywords: {$in: ["dessert"]}}, {_keywords:1}).count()
//sample11
db.products.findOne({_keywords: {$in: ["dessert"]}}, {_keywords:1})

//query12
db.products.find({_keywords: {$in: ["chocolate"]}}, {_keywords:1}).count()
//sample12
db.products.findOne({_keywords: {$in: ["chocolate"]}}, {_keywords:1})

//query13
db.products.find({_keywords: {$all: ["chocolate", "dessert"]}}, {_keywords:1}).count()
//sample13
db.products.findOne({_keywords: {$all: ["chocolate", "dessert"]}}, {_keywords:1})

//query14
db.products.find({_keywords: {$in: ["chocolate", "dessert"]}}, {_keywords:1}).count()
//sample14
db.products.findOne({_keywords: {$in: ["chocolate", "dessert"]}}, {_keywords:1})

//query15
db.products.updateMany(
       {categories: {$type: "string"}},
       [{
           $set: {
               new_att_category: {$split: ["$categories", ","]}
           }
       }]
)
//sample15
db.products.findOne({new_att_category: {$exists: true}}, {new_att_category:1})

//query16
db.products.distinct("nutriscore_grade")
//sample16
db.products.find({nutriscore_grade: "f"}, {nutriscore_grade:1}).count()
db.products.find({ingredients_tags: "en:palm-oil"}, {ingredients_tags:1}).count()
