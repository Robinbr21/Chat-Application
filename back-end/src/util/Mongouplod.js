const Chat = require("../models/message");
const Users = require("../models/users");
const DB = require("../config/config")
const credential = require("../models/credential")
let DocID = 0
// let MessageCount = 1
let sizeInMB = 0

exports.MongoUp = async (prefix, msg, usr1, usr2) => {
    try {
        //code to find number of document in collectrion
        let DocCount = await Chat.countDocuments();

        if (DocCount != 0) {
            // code to find the last mofified document in the collection
            let count = await Chat.find({}, { _id: 1 })
            DocID = parseInt(count[count.length - 1]._id.match(/\d+/)[0])

            //counting number of messages in a document
            // let result = await Chat.findOne({ _id: 'msg_doc_' + DocID }, { total_message: 1 })
            // MessageCount = result.total_message

            //Calculating size of the Document
            let chatDoc = await Chat.findOne({ _id: "msg_doc_" + DocID });
            sizeInMB = Buffer.byteLength(JSON.stringify(chatDoc), 'utf8') / (1024 * 1024);
            // console.log(`----->>Size of the Chat document: ${sizeInMB} MB <<-----`);
        }

        // console.log("==============>", DocCount > 0, MessageCount < 6, sizeInMB < 1, "<<<============================");

        //here it check the document count and check thath document size is < 15 MB
        if (DocCount > 0 && sizeInMB < 15) {

            // for (let index = 0; index < 10000; index++) {
            //     await sleep(1500);
            await updateMsg(prefix, msg, usr1, usr2)
            // }

        } else {
            ++DocID
            let chat_data = [{
                _id: "msg_doc_" + (DocID),
                Messages: {
                    prefix: prefix,
                    message: msg,
                    from: usr1,
                    to: usr2,
                    timestamp: new Date().getTime()
                },
                total_message: 1,
                size: 0
            }];
            await Chat.insertMany(chat_data);
        }
        console.log("=============================================");
    } catch (error) {
        DB.connectToDB()
        console.log(error);
    }
}

exports.UserDetails = async (data, socketId, condition) => {
    try {
        if (data == null) {
            await Users.updateOne({}, { $pull: { users: { socketId: socketId } } })
            console.log(`Socket id ${socketId} Deleted from Users`);
            return
        }
        const { prefix, senderId, receiverId } = data
        // console.log(prefix, senderId);
        if (condition == "adduser") {
            //cheking prefix exist
            let exist = await Users.exists({ _id: prefix })
            // console.log("prefix exist :", exist);
            if (exist) {
                let idExist = await Users.exists({ _id: prefix, 'users.userId': senderId });
                if (!idExist) {
                    let filter = { _id: prefix };
                    let update = {
                        $push: {
                            users: {
                                userId: senderId,
                                socketId: socketId
                            }
                        },
                    };
                    let options = { new: true };
                    await Users.findOneAndUpdate(filter, update, options);
                    console.log("user details added");
                } else {
                    console.log(senderId, socketId);
                    let SocExist = await Users.exists({ _id: prefix, 'users.userId': senderId, 'users.socketId': socketId });
                    if (!SocExist) {
                        await Users.updateOne({ "_id": prefix, "users.userId": senderId }, { $set: { "users.$.socketId": socketId } });
                        console.log("----- user details socketId updated -----");
                    }
                }
            } else {
                let user_data = [{
                    _id: prefix,
                    users: {
                        userId: senderId,
                        socketId: socketId
                    }
                }];
                await Users.insertMany(user_data);
            }
        } else if (condition == "findSocket") {
            let id = await Users.findOne({ "users.userId": receiverId }, { "users.$": 1 })
            if (id && id.users && id.users.length > 0) {
                return id.users[0].socketId;
            } else {
                console.log("Unable to find socket for receiverId:", receiverId);
                return null; // Return null or handle the case when socketId is not found
            }
            // return id.users[0].socketId
        }
    } catch (error) {
        console.log("Errror on Chat Controllern Usser Details:", error);
    }
}

exports.Create = async (userID, password) => {
    try {
        let idExist = await credential.exists({ _id: userID });
        if (!idExist) {
            const document = {
                _id: userID,
                password: password
            }
            await credential.create(document);
            return true
        }else{
            return false
        }
    } catch (error) {

    }
}

exports.Sign = async (userID,password) =>{
    try {
        let idExist = await credential.exists({ _id: userID , password:password });
        if (!idExist) {
            return false
        }else{
            return true
        }
    } catch (error) {
        
    }
}

//------------------sub-------------------------

async function updateMsg(prefix, msg, usr1, usr2) {
    try {
        let filter = { _id: "msg_doc_" + DocID };
        let update = {
            $push: {
                Messages: {
                    prefix: prefix,
                    message: msg,
                    from: usr1,
                    to: usr2,
                    timestamp: new Date().getTime()
                }
            },
            $inc: { total_message: 1 },
            size: sizeInMB
        };
        let options = { new: true };
        await Chat.findOneAndUpdate(filter, update, options);
        console.log("Chat  updated....");
    } catch (error) {
        console.error(error);
    }
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
