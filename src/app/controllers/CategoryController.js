
const { mutipleMongooseToObject, mongoosesToObject } = require('../../util/mongoose');
const Categories = require('../models/Categories');
const products = require('../models/Orchid');
class CategoryController {
    putApi(req, res, next) {
        try {
           
            Categories.findByIdAndUpdate(req.params.id, req.body)
                .then((data => {
                    if (data) {
                        return res.json({ data, message: 'put successfully' })
                    } else {
                        return res.status(500).json({ message: 'put error' })
                    }
                   

                }
                ))
                .catch((next) => {
                    res.status(500).json(next)
                });

        } catch (err) {
            res.status(500).json(err)
        }
    }

    deleteApi(req, res, next) {
        products.findOne({ course: req.params.id })
            .then((products) => {
                if (products) {
                    Categories.find()
                        .then((Categories) => {
                            return res.status(500).json({
                                error: `cannot be deleted because 'products' is already in use`,
                            })
                        })
                } else {
                    Categories.findByIdAndDelete(req.params.id)
                        .then((Categories => {
                            if (Categories) {
                                return res.json({ Categories, message: 'Delete successfully' })

                            } else {
                                return res.status(500).json({ error: "Not Found" })

                            }
                        }
                        ))
                        .catch((next)=>{
                            return res.status(500).json({ error: "Not Found" })
                        })
                }
            })
            .catch((e)=>{
                return res.status(500).json({ error: "Not Found" })
            })
    }

    showApi(req, res, next) {

        Categories.find()
            .then((categories) => {
                return res.json(categories)

            })

    }
    showApiByID(req, res, next){
        Categories.findById(req.params.id)
        .then((categories) => {
            return res.json(categories)

        })
        .catch((next) => {
            return res.status(500).json({ error: "Not Found" })

        });

    }
    postApi(req, res, next) {
        // đổi tên theo models 
        // req lấy dữ liệu 
        const { categoryName } = req.body

        Categories.findOne({ categoryName: categoryName })
            .then((nations => {
                if (nations) {
                    // res là trả về cho người dùng

                    res.status(500).json(
                        {
                            error: `${categoryName} name is already on the board`,
                        })
                } else {
                    const nation = new Categories(req.body);
                    nation.save()
                        .then((e) => {
                            res.json(e)
                        })
                        .catch((next) => {
                            res.status(500).json(next)

                        });
                }
            }
            ))
            .catch((next) => {
                res.status(500).json(next)
            });


    }

    put(req, res, next) {
        try {
            const { categoryName } = req.body
            Categories.findOne({ categoryName: categoryName })
                .then((players => {
                    if (players) {
                        if (players._id != req.params.id) {
                            Categories.find({})
                                .then((players => {
                                    res.render('view/categories',
                                        {
                                            Categories: mutipleMongooseToObject(players),
                                            login: true,
                                            errorPutName: `${categoryName} name is already on the board`,
                                        })
                                }
                                ))
                        } else {
                            Categories.findByIdAndUpdate(req.params.id, req.body)
                                .then((Categories => {
                                    res.redirect('/category')
                                }
                                ))
                                .catch(next)
                        }
                    } else {
                        Categories.findByIdAndUpdate(req.params.id, req.body)
                            .then((player => {
                                res.redirect('/category')
                            }
                            ))
                            .catch(next)
                    }
                }
                ))
                .catch(next)

        } catch (err) {
            res.redirect('/category')
        }
    }

    delete(req, res, next) {
        products.findOne({ course: req.params.id })
            .then((products) => {
                if (products) {
                    Categories.find()
                        .then((Categories) => {
                            return res.render('view/categories',
                                {
                                    Categories: mutipleMongooseToObject(Categories),
                                    input: req.body,
                                    errorPutName: `cannot be deleted because 'products' is already in use`,
                                    login: true,
                                })
                        })
                } else {
                    Categories.findByIdAndDelete(req.params.id)
                        .then((Categories => {
                            res.redirect('/category')
                        }
                        ))
                        .catch(next)
                }
            });
    }

    show(req, res, next) {

        Categories.find()
            .then((Categories) => {
                return res.render('view/categories',
                    {
                        Categories: mutipleMongooseToObject(Categories),
                        login: true,
                    })
            })

    }
    post(req, res, next) {
        const { categoryName } = req.body
        Categories.findOne({ categoryName: categoryName })
            .then((nations => {
                if (nations) {
                    Categories.find({})
                        .then((nations => {
                            res.render('view/categories',
                                {
                                    Categories: mutipleMongooseToObject(nations),
                                    input: req.body,
                                    errorMessage: `${categoryName} Name is already on the board`,
                                    login: true,
                                })
                        }
                        ))
                        .catch(next)
                    // res.redirect("back");
                } else {
                    const nation = new Categories(req.body);
                    nation.save()
                        .then(() => {
                            res.redirect("/category");
                        })
                        .catch(next);
                }
            }
            ))
            .catch(next)

        // const formData = req.body
        // const course = new Categories(formData)
        // course.save()
        //     .then(() => res.redirect('/category'))
        //     .catch((error) => {
        //         res.json(req.body)

        //         // res.render(`view/Categories/createCategories`)
        //     })
        // res.send(`oke`)


    }

}
module.exports = new CategoryController;
