import mongoose from 'mongoose';

const userdetail = mongoose.Schema(
	{
		_id: Number,
		users:[{
			_id:false,
			userId: {
				type: Number,
				require: true,
			},
			socketId: {
				type: String,
				require: true,
			}
		}]
		

	}, {versionKey: false }
);

var users = mongoose.model('ConnectedUser', userdetail);
module.exports = users;
