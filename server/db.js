﻿const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/micro-vir', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err));