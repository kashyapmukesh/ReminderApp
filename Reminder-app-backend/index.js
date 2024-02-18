// other begin

// require('dotenv').config()
// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")

// //APP config
// const app = express()
// app.use(express.json())
// app.use(express.urlencoded())
// //app.use(cors())
// app.use(cors({origin: true, credentials: true}));
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
  
// //const cors = require("cors")

// const io = require("express")(9000, {
//    cors: {
//      origin: 'http://127.0.0.1:3000',
//    }
//  });

//  app.options("*", cors({ origin: 'http://127.0.0.1:3000', optionsSuccessStatus: 200 }));

//   app.use(cors({ origin: "http://127.0.0.1:3000", optionsSuccessStatus: 200 }));

// //DB config
// mongoose.connect('mongodb://127.0.0.1:27017/reminderAppDBB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => console.log("DB connected"))

// // mongoose
// //   .connect('mongodb://localhost:27017/reminderAppDB')
// //   .then(() => {
// //     console.log("Connected to MongoDB");
// //   })
// //   .catch((err) => {
// //     console.log("not connected to mongodb");
// //   });
// //console.log(mongoose.connect('mongodb://localhost:27017/reminderAppDB'));

// const reminderSchema = new mongoose.Schema({
//     reminderMsg: String,
//     remindAt: String,
//     isReminded: Boolean
// })
// const Reminder = new mongoose.model("reminder", reminderSchema)


// //Whatsapp reminding functionality

// setInterval(() => {
//     Reminder.find({}, (err, reminderList) => {
//         if (err) {
//             console.log(err)
//         }
//         if (reminderList) {
//             reminderList.forEach(reminder => {
//                 if (!reminder.isReminded) {
//                     const now = new Date()
//                     if ((new Date(reminder.remindAt) - now) < 0) {
//                         Reminder.findByIdAndUpdate(reminder._id, { isReminded: true }, (err, remindObj) => {
//                             if (err) {
//                                 console.log(err)
//                             }
//                             const accountSid = process.env.ACCOUNT_SID
//                             const authToken = process.env.AUTH_TOKEN
//                             const client = require('twilio')(accountSid, authToken);
//                             client.messages
//                                 .create({
//                                     body: reminder.reminderMsg,
//                                     from: 'whatsapp:+14155238886',
//                                     to: 'whatsapp:+917486060728'
//                                 })
//                                 .then(message => console.log(message.sid))
//                                 .done()
//                                 .save()
//                         })
//                     }
//                 }
//             })
//         }
//     })
// }, 1000)
//     ;


// //API routes
// app.get("/getAllReminder", (req, res) => {
//     Reminder.find({}, (err, reminderList) => {
//         if (err) {
//             console.log(err)
//         }
//         if (reminderList) {
//             res.send(reminderList)
//         }
//     })
// })
// app.post("/addReminder", (req, res) => {
//     const { reminderMsg, remindAt } = req.body
//     const reminder = new Reminder({
//         reminderMsg,
//         remindAt,
//         isReminded: false
//     })
//     reminder.save(err => {
//         if (err) {
//             console.log(err)
//         }
//         Reminder.find({}, (err, reminderList) => {
//             if (err) {
//                 console.log(err)
//             }
//             if (reminderList) {
//                 res.send(reminderList)
//             }
//         })
//     })

// })
// app.post("/deleteReminder", (req, res) => {
//     Reminder.deleteOne({ _id: req.body.id }, () => {
//         Reminder.find({}, (err, reminderList) => {
//             if (err) {
//                 console.log(err)
//             }
//             if (reminderList) {
//                 res.send(reminderList)
//             }
//         })
//     })
// })

// app.listen(9000, () => console.log("Be started"))



// another2 started

require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

//APP config
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

//DB config

// //DB config
mongoose.connect('mongodb://127.0.0.1:27017/reminderAppDBB', {
        useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("DB connected"))
const reminderSchema = new mongoose.Schema({
    reminderMsg: String,
    remindAt: String,
    isReminded: Boolean
})
const Reminder = new mongoose.model("reminder", reminderSchema)


//Whatsapp reminding functionality

setInterval(() => {
    Reminder.find({}, (err, reminderList) => {
        if(err) {
            console.log(err)
        }
        if(reminderList){
            reminderList.forEach(reminder => {
                if(!reminder.isReminded){
                    const now = new Date()
                    if((new Date(reminder.remindAt) - now) < 0) {
                        Reminder.findByIdAndUpdate(reminder._id, {isReminded: true}, (err, remindObj)=>{
                            if(err){
                                console.log(err)
                            }
                            const accountSid = process.env.ACCOUNT_SID 
                            const authToken = process.env.AUTH_TOKEN
                            const client = require('twilio')(accountSid, authToken); 
                            client.messages 
                                .create({ 
                                    body: reminder.reminderMsg, 
                                    from: 'whatsapp:+14155238886',       
                                    to: 'whatsapp:+918888888888' //YOUR PHONE NUMBER INSTEAD OF 8888888888
                                }) 
                                .then(message => console.log(message.sid)) 
                                .done()
                        })
                    }
                }
            })
        }
    })
},1000)
;


//API routes
app.get("/getAllReminder", (req, res) => {
    Reminder.find({}, (err, reminderList) => {
        if(err){
            console.log(err)
        }
        if(reminderList){
            res.send(reminderList)
        }
    })
})
app.post("/addReminder", (req, res) => {
    const { reminderMsg, remindAt } = req.body
    const reminder = new Reminder({
        reminderMsg,
        remindAt,
        isReminded: false
    })
    reminder.save(err => {
        if(err){
            console.log(err)
        }
        Reminder.find({}, (err, reminderList) => {
            if(err){
                console.log(err)
            }
            if(reminderList){
                res.send(reminderList)
            }
        })
    })

})
app.post("/deleteReminder", (req, res) => {
    Reminder.deleteOne({_id: req.body.id}, () => {
        Reminder.find({}, (err, reminderList) => {
            if(err){
                console.log(err)
            }
            if(reminderList){
                res.send(reminderList)
            }
        })
    })
})

app.listen(9000, () => console.log("Be started"))