const Char = require('../model/movie.model.js');

exports.create = (req, res) => {
    if(!req.body.id) {
        return res.status(400).send({
            message: "id can not be empty"
        });
    }

    const char = new Char({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        organization: req.body.organization || "Marvel"
        });

    char.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.findAll = (req, res) => {
    Char.find()
    .then(chars => {
        res.send(chars);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

};

exports.findOne = (req, res) => {
    Char.find({ "id" :  req.params.charId })
    .then(char => {
        if(!char) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.charId
            });            
        }
        res.send(char);
    }).catch(err => {
        console.log(err)
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.charId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.charId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({
            message: "Body cannot be empty"
        });
    }
    Char.findOneAndUpdate({ "id" :  req.params.charId },{
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        organization: req.body.organization || "Marvel"
    }).then(char=>{
        if(!char){
            return res.status(404).send({

                message : "character not found!!"
            });
        }
        res.send(char)
    }).catch(err => {          
        console.log(err)
        return res.status(500).send({
            message: "error updating the character"
        }) 
    })

};

exports.delete = (req, res) => {
    Char.findOneAndDelete({ 
        "id" :  req.params.charId 
    }).then(char => {
        if(!char){
            return res.status(404).send({
                message : "Char with id not found"
            })
        }
        res.send({
            message: "Char deleted successfully"
        }).catch(err => {
            console.log(err)
            return res.send({
                message : "something went wrong"
            })
        })
    })
};


exports.findAllSort = (req, res) => {
    // I tried aggregation here It didn't quite work out, I still can implement
    Char.find({organization : "Marvel" }).sort({id : 1})
    .then(chars => {
        let newArray = []; 
        let uniqueObject = {}; 

        for (let i in chars) { 
      
            // Extract the title 
            lastN = chars[i]['lastName']; 
  
            // Use the title as the index 
            uniqueObject[lastN] = chars[i]; 
        } 
          
        // Loop to push unique object into array 
        for (i in uniqueObject) { 
            newArray.push(uniqueObject[i]); 
        } 
        res.send(newArray);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

};