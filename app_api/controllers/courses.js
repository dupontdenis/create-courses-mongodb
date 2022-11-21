const mongoose = require('mongoose');
const Courses = require('../models/courses');
mongoose.connect('mongodb://localhost/my_courses', { useUnifiedTopology: true, useNewUrlParser: true });

const debug = require('debug')('app_api');


const coursesReadAll = async (req, res) => {
    debug("--- coursesReadAll ---");
    const courses = await Courses.find({});
    res.json({ courses });
}

const coursesCreateOne = async (req, res) => {
    debug("--- coursesCreateOne ---");
    const course = await Courses.create(req.body)
    res.json({ course });
}

const coursesReadOne = async (req, res) => {
    debug("--- coursesReadOne ---");
    const course = await Courses.findById(req.params.id)
    if (!course) res.status(404).send(`The course with id:${req.params.id} was not found`)
    res.send(course);
}


const coursesUpdateOne = async (req, res) => {
    debug("--- coursesUpdateOne ---");
    try {
        const doc = await Courses.findById(req.params.id)
        doc.name = req.body.name;
        doc.info = req.body.info;
        doc.save();
        res.send(doc);
        
    } catch (error) {
        debug("Houston we have a pb!", error)
    }
}



const coursesDeleteOne = async (req, res) => {
    debug("--- coursesDeleteOne ---");
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