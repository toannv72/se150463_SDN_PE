
const { mutipleMongooseToObject, mongoosesToObject } = require('../../util/mongoose');
const Categories = require('../models/Categories');
const Orchid = require('../models/Orchid');
const Token = require('../../config/db/config');
var jwt = require("jsonwebtoken");
const User = require('../models/User');

class OrchidController {
    search(req, res, next) {
        function escapeRegExp(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        }
        const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là trang 1
        const limit = parseInt(req.query.limit) || 10; // Số lượng phần tử trên mỗi trang, mặc định là 10
        const formData = req.query.name
        const escapedSearchTerm = escapeRegExp(formData);

        const options = {
            page: page,
            limit: 500000,

            // tùy chọn xác định cách sắp xếp và so sánh trong truy vấn.
            collation: {
                locale: 'en',
            },
        };
        if (formData === "") {

            Orchid.find({})
                .then((Orchids) => {
                    res.redirect('/orchid')
                })
                .catch(next)
        } else {

            Orchid.paginate({ name: { $regex: escapedSearchTerm } }, options, function (err, result) {
                // result.docs
                // result.totalDocs = 100
                // result.limit = 10
                // result.page = 1
                // result.totalPages = 10
                // result.hasNextPage = true
                // result.nextPage = 2
                // result.hasPrevPage = false
                // result.prevPage = null
                // result.pagingCounter = 1
                if (result.totalPages < result.page) {
                    const options1 = {
                        page: result.totalPages,
                        limit: 5,

                        // tùy chọn xác định cách sắp xếp và so sánh trong truy vấn.
                        collation: {
                            locale: 'en',
                        },
                    };
                    Orchid.paginate({ name: { $regex: escapedSearchTerm } }, options1, function (err, data) {


                        return res.render('view/orchid',
                            {
                                Orchid: mutipleMongooseToObject(data.docs),
                                login: true,
                                totalPages: data.totalPages,
                                page: result.totalPages,
                                prevPage: data.prevPage,
                                nextPage: data.nextPage,
                                totalDocs: data.totalDocs,
                                search: formData
                            })

                    })

                } else {

                    return res.render('view/orchid',
                        {
                            Orchid: mutipleMongooseToObject(result.docs),
                            login: true,
                            totalPages: result.totalPages,
                            page: result.page,
                            prevPage: result.prevPage,
                            nextPage: result.nextPage,
                            totalDocs: result.totalDocs,
                            search: formData
                        })
                }
            });
        }


    }

    getOneApi(req, res, next) {
        Orchid.findById(req.params.id)
            .then((orchid) => {
                if (orchid) {
                    return res.json({ orchid });
                } else {
                    return res.status(404).json({ error: 'Not Found' });
                }
            })
            .catch((next) => {
                return res.status(500).json({ error: next });
            });
    }

    putApi(req, res, next) {
        try {
            Orchid.findByIdAndUpdate(req.params.id, req.body)
                .then((Orchids => {
                    return res.json({ Orchids, message: 'put successfully' })
                }
                ))
                .catch((next) => {
                    res.status(500).json(next)
                });
        } catch (err) {
            res.status(500).json(err)
        }
    }

    put(req, res, next) {
        try {
            const { productName } = req.body
            Orchid.findOne({ productName: productName })
                .then((players => {
                    if (players) {
                        if (players._id != req.params.id) {
                            Orchid.find({})
                                .then((players => {
                                    Categories.find()
                                        .then((categories) => {
                                            res.render('view/orchid',
                                                {
                                                    Orchid: mutipleMongooseToObject(players),
                                                    login: true,
                                                    errorPutName: `${productName} name is already on the board`,
                                                    Categories: mutipleMongooseToObject(categories)
                                                })
                                        })

                                }
                                ))
                        } else {
                            Orchid.findByIdAndUpdate(req.params.id, req.body)
                                .then((Orchids => {
                                    res.redirect('/products')
                                }
                                ))
                                .catch(next)
                        }
                    } else {
                        Orchid.findByIdAndUpdate(req.params.id, req.body)
                            .then((player => {
                                res.redirect('/products')
                            }
                            ))
                            .catch(next)
                    }
                }
                ))
                .catch(next)

        } catch (err) {
            res.render('view/home')

        }
    }
    delete(req, res, next) {
        Orchid.findByIdAndDelete(req.params.id)
            .then((Orchids => {
                res.redirect('/products')
            }
            ))
            .catch(next)
    }

    deleteApi(req, res, next) {
        Orchid.findByIdAndDelete(req.params.id)
            .then((Orchids => {
                if (Orchids) {
                    return res.json({ Orchids, message: 'Delete successfully' })

                } else {
                    return res.status(500).json({ error: "Not Found" })

                }
            }
            ))
            .catch((err) => {
                res.status(500).json(err)
            })
            
        
    }

    deleteComments(req, res, next) {
        Orchid.findById(req.params.orchidID)
            .then((Orchids => {
                Orchids.comments.id(req.params.commentId).remove()
                Orchids.save();
                res.redirect(`/orchid/${req.params.orchidID}`)
            }
            ))
            .catch(next)
    }

    showApi(req, res, next) {
        Categories.find()
            .then((categories) => {
                return res.json(categories)

            })
    }
    show(req, res, next) {
        Categories.find()
            .then((categories) => {
                Orchid.find()
                    .then((Orchids) => {
                        console.log(Orchids);
                        return res.render('view/orchid',
                            {
                                Orchid: mutipleMongooseToObject(Orchids),
                                login: true,
                                Categories: mutipleMongooseToObject(categories)
                            })
                    })
            })
    }
    post(req, res, next) {
        const { productName } = req.body
        Categories.find()
            .then((categories) => {
                Orchid.findOne({ productName: productName })
                    .then((nations => {
                        if (nations) {
                            Orchid.find({})
                                .then((nations => {
                                    res.render('view/orchid',
                                        {
                                            Orchid: mutipleMongooseToObject(nations),
                                            input: req.body,
                                            errorMessageName: `${productName} name is already on the board`,
                                            login: true,
                                            Categories: mutipleMongooseToObject(categories)
                                        })
                                }
                                ))
                                .catch(next)
                        } else {
                            const nation = new Orchid(req.body);
                            nation.save()
                                .then(() => {
                                    res.redirect("/products");
                                })
                                .catch(next);
                        }
                    }
                    ))
                    .catch(next)
            })
    }

    postApi(req, res, next) {
        const { name } = req.body

        Orchid.findOne({ name: name })
            .then((nations => {
                if (nations) {
                    res.status(500).json(
                        {
                            error: `${name} name is already on the board`,
                        })
                } else {
                    const nation = new Orchid(req.body);
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

}
module.exports = new OrchidController;
