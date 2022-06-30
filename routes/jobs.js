const express = require('express')
const router = express.Router()
const jobController = require('../controllers/jobs')

router.route('/').get(jobController.getAllJob).post(jobController.createJob)

router.route('/:id')
.get(jobController.getJob)
.patch(jobController.updateJob)
.delete(jobController.deleteJob)


module.exports = router