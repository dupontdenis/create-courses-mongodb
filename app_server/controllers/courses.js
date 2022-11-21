const axios = require('axios');
const debug = require('debug')('app_server');

const coursesReadAll = async (req, res) => {
    debug('-------------- READ ALL-------------------------------')
    // axios.get('http://localhost:3000/api/courses')
    //     .then(function (response) {
    //         res.render('courses-list', {
    //             courses: response.data.courses
    //         });
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         debug(error);
    //     })
    try {
        // const response = await axios.get('http://localhost:3000/api/courses');
        // res.render('courses-list', {courses: response.data.courses});
        const {data: {courses}} = await axios.get('http://localhost:3000/api/courses');
        res.render('courses-list', {courses});
        
    } catch (error) {
        // handle error
            debug(error);
    }
};

const coursesReadOne = (req, res) => {
    debug('------------ READ ONE-------------------------------')

    axios.get(`http://localhost:3000/api/courses/${req.params.id}`)
        .then(function (response) {
            res.render('course-info', {
                course: response.data
            });
        })
        .catch(function (error) {
            // handle error
            debug(error);
        })
};

const coursesDeleteOne = (req, res) => {
   // debug('------------ DELETE ONE-------------------------------')
    axios.delete(`http://localhost:3000/api/courses/${req.params.id}`)
        .then(function (response) {
            res.redirect(`/courses/`);
        })
        .catch(function (error) {
            // handle error
            debug(error);
        })
};

// rempli le form !
const coursesUpdateOne = (req, res) => {
    debug('------------ coursesUpdateOne -------------------------------')
    axios.get(`http://localhost:3000/api/courses/${req.params.id}`)
        .then(function (response) {
            res.render('course-update-form', {
                course: response.data
            });
        })
        .catch(function (error) {
            // handle error
            debug(error);
        })
};

const renderForm = (req, res) => {
    res.render('course-form',
        {
            title: `New Course`,
            error: req.query.err
        }
    );
};

const coursesForm = (req, res) => {
    debug('--------------   FORM  -----------------------')
    renderForm(req, res);
};

const coursesAddOne = (req, res) => {
    debug('--------------   ADD ONE  -----------------------')
    if (!req.body.info || !req.body.name) {
        res.redirect(`/courses/new?err=val`);
    }
    else {
        axios.post('http://localhost:3000/api/courses/', req.body)
            .then(function (response) {
                res.redirect("/courses")
            })
            .catch(function (error) {
                debug(error);
            });
    }
};

const coursesAddUpdate = (req, res) => {
    debug('server---------------   ADD UPDATE  -----------------------')
    if (!req.body.info || !req.body.name) {
        res.redirect(`/courses/update/${req.params.id}?err=val`);
    }
    else {
        axios.put(`http://localhost:3000/api/courses/${req.params.id}`, req.body)
        .then(function (response) {
            res.redirect("/courses");
        })
        .catch(function (error) {
            debug(error);
        });
    }
};

module.exports = {
    coursesReadAll,
    coursesReadOne,
    coursesAddOne,
    coursesDeleteOne,
    coursesForm,
    coursesUpdateOne,
    coursesAddUpdate
};