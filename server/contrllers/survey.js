let express = require('express');
let reouter = express.Router();
let mongoose = require('mongoose');

// let jwt = require('jsonwebtoken');   // implement jwt if we are going to convert to ANGULAR

// create reference to the model
let Survey = require('../models/survey');
let userSurvey = require('../models/user');

module.exports.displaySurveyPage = (req, res, next) => {

    /*
    if(req.user.username){
        Survey.find({Name: req.user.username}, (err, surveyList) => {
            if (err) {
                return console.error(err);
            }
            else {
                //console.log(SurveyList);
                res.render('survey/list',
                    {
                        title: 'Survey',
                        surveyList: surveyList,
                        displayName: req.user ? req.user.displayName : ''
                    });
            }
        });
    } 
    else{
        */
        Survey.find((err, surveyList) => {
            if (err) {
                return console.error(err);
            }
            else {
                //console.log(SurveyList);
                res.render('survey/list',
                    {
                        title: 'Survey',
                        surveyList: surveyList,
                        username: req.user ? req.user.username: '',
                        displayName: req.user ? req.user.displayName : ''
                    });
            }
        });
    }
/*
let name = req.user.username;

Survey.find({Name: name}, (err, surveyList) => {
    if(err)
    {
        return console.error(err);
    }
    else
    {
        //console.log(SurveyList);
        res.render('survey/list', 
        {title: 'Survey', 
        surveyList: surveyList,
        displayName: req.user ? req.user.displayName : ''});
    }
});*/

module.exports.displayUserSurveyPage = (req, res, next) => {

    Survey.find((err, surveyList) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(SurveyList);
            res.render('survey/userSurvey',
                {
                    title: 'Survey',
                    surveyList: surveyList,
                    username: req.user ? req.user.username: '',
                    displayName: req.user ? req.user.displayName : ''
                });
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add',
        {
            title: 'Add Survey',
            username: req.user ? req.user.username: '',
            displayName: req.user ? req.user.displayName : ''
        });
};


module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "Name": req.user.username,
        "Gender": req.body.Gender,
        "Answer1": req.body.Answer1,
        "Answer2": req.body.Answer2,
        "Answer3": req.body.Answer3,
        "choice": req.body.choice
    });

    Survey.create(newSurvey, (err, Survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
};


module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('survey/edit',
                {
                    title: 'Edit Survey',
                    survey: surveyToEdit,
                    username: req.user ? req.user.username: '',
                    displayName: req.user ? req.user.displayName : ''
                })
        }
    });
};


module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "Name": req.body.Name,
        "Gender": req.body.Gender,
        "Answer1": req.body.Answer1,
        "Answer2": req.body.Answer2,
        "Answer3": req.body.Answer3,
        "choice": req.body.choice
    });

    Survey.updateOne({ _id: id }, updatedSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
};


module.exports.performDeletion = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
};