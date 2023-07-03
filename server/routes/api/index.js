const router = require('express').Router();
const searchRoutes = require('./search-routes');

router.use('/search', searchRoutes);

module.exports = router;