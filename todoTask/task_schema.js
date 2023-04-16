var mongoose = require('mongoose'); // imports mongoose as dependecy

var TaskSchema = new mongoose.Schema({ //creates a schema (Mongoose only)
    TaskId: Number,                    //HEre's is the schema that will be stored in our collections.
    Name: String,
    Deadline: Date,            //Deadline = date
});

module.exports = mongoose.model(
    'task', TaskSchema, 'Tasks');

    //Exports thise model, the Id, our schema, finally our Collection Name