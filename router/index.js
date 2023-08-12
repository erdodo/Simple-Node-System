const router = require('express').Router();

router.get('/',  (req, res) => {
    let list ={
        message:"succcess"
    };
    res.json(list);
})

const routes = require('./routes');
router.use('/routes', routes);



module.exports = router;
