const mongoose = require('mongoose');
const Courses = require('../models/courses');
mongoose.connect('mongodb://localhost/my_courses', { useUnifiedTopology: true, useNewUrlParser: true });

const debug = require('debug')('app_api');

// const coursesReadAll = (req, res) => {
//     res.json({ courses: courses });
// };

const coursesReadAll = async (req, res) => {
    debug("API--- coursesReadAll ---");
    const courses = await Courses.find({});
    res.json({ courses: courses });
}

// const coursesCreateOne = (req, res) => {
//     debug("API--- coursesCreateOne ---");
//     const course = {
//         id: Math.ceil(Math.random() * 1000),
//         name: req.body.name,
//         info: req.body.info,
//     }
//     courses.push(course);
//     res.json(course);
// }

const coursesCreateOne = async (req, res) => {
    debug("API--- coursesCreateOne ---");
    await Courses.create(req.body, (error, course) => {
        res.json(course);
    })
}

// const coursesReadOne = (req, res) => {
//     debug("API--- coursesReadOne ---");
//     let course = find(courses, { 'id': Number(req.params.id) });
//     if (!course) res.status(404).send(`The course with id:${req.params.id} was not found`)
//     res.send(course);
// }
const coursesReadOne = async (req, res) => {
    debug("API--- coursesReadOne ---");
    const course = await Courses.findById(req.params.id)
    if (!course) res.status(404).send(`The course with id:${req.params.id} was not found`)
    res.send(course);
}


const coursesUpdateOne = async (req, res) => {
    debug("API--- coursesUpdateOne ---");
    Courses.findById(req.params.id, function (err, doc) {
        if (err) debug("Houston we have a pb!")
        doc.name = req.body.name;
        doc.info = req.body.info;
        doc.save();
        res.send(doc);
      });
}

// const coursesDeleteOne = (req, res) => {
//     debug("API--- coursesDeleteOne ---");
//     pullAllBy(courses, [{ 'id': Number(req.params.id) }], 'id');
//     res.json(courses);
// }

const coursesDeleteOne = async (req, res) => {
    debug("API--- coursesDeleteOne ---");
    const course = await Courses.findByIdAndDelete(req.params.id)
    if (!course) res.status(404).send(`The course with id:${req.params.id} was not found`)
    res.send(null);
}

module.exports = {
    coursesReadAll,
    coursesCreateOne,
    coursesReadOne,
    coursesUpdateOne,
    coursesDeleteOne
};