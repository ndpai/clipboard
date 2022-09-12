const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const sqlite3 = require('sqlite3').verbose();
const auth = require("../middleware/auth");

let db = new sqlite3.Database("./dev.sqlite");

router.post("/add", auth, (req, res) => {
    try {
        Employee.create(req.body).then((r) => {
            let query = `SELECT * FROM employees`;
            db.all(query, (err, employees) => {
                err && res.status(400).json('Please try again later');
                employees && res.status(200).json(employees);
            });
        }).catch((e) => {
            e && res.status(400).json('Please check all fields');
        });
    } catch {
        res.status(500).json('Something ain\'t working');
    }
});

router.get("/get-all", auth, (req, res) => {
    try {
        let query = `SELECT * FROM employees`;
        db.all(query, (err, employees) => {
            err && res.status(401).json('Please try again later');
            employees && res.status(200).json(employees);
        });
        // Employee.findAll().then((employees) => {
        //     res.status(200).json(employees);
        // });
    } catch {
        res.status(500).json('Internal Server Error');
    }
});

router.get("/get-summary-stats", auth, (req, res) => {
    try {
        let summaryStatsQuery =
            `SELECT MAX(salary) AS maximum, MIN(salary) AS minimum, AVG(salary) AS average 
            FROM employees
            ${req.query.on_contract && 'WHERE on_contract=1'}`;

        db.each(summaryStatsQuery, (err, summaryStats) => {
            err && res.status(401).json('Please try again later');
            summaryStats && res.status(200).json(summaryStats);
        });
    } catch {
        res.status(500).json('Internal Server Error');
    }
});

router.get("/get-summary-stats-dept", auth, (req, res) => {
    try {
        let departmentSummaryStatsQuery =
            `SELECT department AS Dept, min(salary) AS Minimum, max(salary) AS Maximum, avg(salary) AS Average FROM employees GROUP BY department`;

        db.all(departmentSummaryStatsQuery, (err, summaryStats) => {
            if (err) {
                res.status(401).json('Please try again later');
            }
            summaryStats && res.status(200).json(summaryStats);
        })

    } catch {
        res.status(500).json('Internal Server Error');
    }
});

router.get("/get-summary-stats-dept-sub", auth, (req, res) => {
    try {
        let departmentSummaryStatsQuery =
            `SELECT department AS Dept, sub_department AS SubDept, min(salary) AS Minimum, max(salary) AS Maximum, avg(salary) AS Average
            FROM employees  
            GROUP BY department, sub_department`;

        db.all(departmentSummaryStatsQuery, (err, summaryStats) => {
            if (err) {
                console.log(err);
                res.status(401).json('Please try again later');
            }
            summaryStats && res.status(200).json(summaryStats);
        })

    } catch {
        res.status(500).json('Internal Server Error');
    }
});

router.delete("/delete", auth, (req, res) => {
    try {
        let deleteQuery =
            `DELETE FROM employees WHERE id=(${req.body.id})`;
        db.run(deleteQuery, (err) => {
            if (err) res.status(401).json('Please try again later');
            else {
                let query = `SELECT * FROM employees`;
                db.all(query, (err, employees) => {
                    err && res.status(401).json('Please try again later');
                    employees && res.status(200).json(employees);
                });
            }
        });
    } catch {
        res.status(500).json('Internal Server Error');
    }
});


module.exports = router;
