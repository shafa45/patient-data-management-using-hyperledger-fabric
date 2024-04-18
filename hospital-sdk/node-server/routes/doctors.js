const express = require("express");
const { authenticateJWT } = require("../middleware/verifyJwtToken");
const {
  updatePatientMedicalDetails,
  getDoctorById,
  getPatientMedicalReport,
} = require("../controllers/doctors");

const router = express.Router();

// Doctor Routes //

router.patch(
  "/patients/:patientId/details/medical",
  authenticateJWT,
  updatePatientMedicalDetails
);

//medical report routes for doctor
router.get(
  "/patients/:patientId/details/medical/report/:reportId",
  // authenticateJWT,
  getPatientMedicalReport
);

router.get("/hello", (req, res) => {
  res.send("Hello from doctors");
});

router.get(
  // "/:hospitalId([0-9]+)/:doctorId(HOSP[0-9]+-DOC[0-9]+)",
  "/:hospitalId/:doctorId",
  authenticateJWT,
  getDoctorById
);

module.exports = router;
