import mongoose from 'mongoose';

const messages = mongoose.Schema(
	{
		_id: String,
		Messages: [{
			_id: false,
			prefix:Number,
			message: String,
			from: Number,
			to: Number,
			timestamp: Number
		}],
		total_message: {
			type: Number,
			require: true,
		},
		size: {
			type: Number,
			require: true,
		}

	}, { timestamps: true, versionKey: false }
);

var Chat = mongoose.model('Chat', messages);
module.exports = Chat;
