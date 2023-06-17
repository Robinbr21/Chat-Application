const db = require('../models')
const { Op, Sequelize, QueryTypes } = require('sequelize')
const Chat = require("../models/message");
const cmpny = require("../models/company");


const path = require('path');

exports.index = async (req, res) => {
    // console.log("inside chatController");
    // // db test
    // let Query = `select * from infinite_demo_users where table_prefix = 7757`
    // const custTimeAtWork = await db.sequelize.query(Query, {
    //     type: QueryTypes.SELECT,
    //     raw: true
    // })
    // console.log("===>>>>>",custTimeAtWork[0].user_name);

    // return res.sendFile(path.join(__dirname, '../view/chat.html'));
    return res.sendFile(path.join(__dirname, '../view/chatUpdated.html'));
}

exports.getMessages = async (req, res) => {
    try {
        const { start, end, from, to } = req.body
        let chatDocs = await Chat.aggregate([
            {
                $match: {
                    "Messages": {
                        $elemMatch: {
                            $and: [
                                { "from": from },
                                { "to": to }
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    matchedMessages: {
                        $filter: {
                            input: "$Messages",
                            as: "message",
                            cond: {
                                $and: [
                                    { $eq: ["$$message.from", from] },
                                    { $eq: ["$$message.to", to] }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $unwind: "$matchedMessages"
            },
            {
                $sort: {
                    "matchedMessages.timestamp": -1
                }
            },
            {
                $group: {
                    _id: null,
                    matchedMessages: { $push: "$matchedMessages" }
                }
            },
            {
                $project: {
                    _id: 0,
                    matchedMessages: { $slice: ["$matchedMessages", start, end] }
                }
            }
        ]);

        if (chatDocs.length > 0) {
            const matchedMessages = chatDocs[0].matchedMessages.flat();
            // console.log(matchedMessages);
            return res.json({ status: true, data: matchedMessages })
        } else {
            return res.json({ status: false, Messages: "NO Data Found" })
            console.log("No matched messages found.");
        }
    } catch (error) {
        console.log("Error on ChatController getMessages :", error);
    }
}

exports.groupCreate = async (req, res) => {
    try {
        const { prefix, gname, particepents } = req.body

        //cheking company exist
        let exist = await cmpny.exists({ _id: prefix })

        if (exist) {
            //checking group exist
            let grpexist = await cmpny.exists({ _id: prefix , 'groups.groupname': gname });

            if(grpexist){
                return res.status(409).json({status:false , message:"group name already exist"})
            }else{
                let filter = { _id: prefix };
                let update = {
                    $push: {
                        groups: {
                            groupname: gname,
                            members: particepents,
                        }
                    },
                };
                let options = { new: true };
                await cmpny.findOneAndUpdate(filter, update, options);
                return res.json({ status: true, data: "group created" })
            }
        } else {
            let cmpny_data = [{
                _id: prefix,
                groups: {
                    groupname: gname,
                    members: particepents
                }
            }];
            cmpny.insertMany(cmpny_data);
        }
        return res.json({ status: true, data: "group created" })
    } catch (error) {
        console.log("Err on Chatcontroller groupCreated :", error);
    }
}
