import mongoose from 'mongoose';

const details = mongoose.Schema(
	{
		_id: Number,
		groups: [{
			_id: false,
			groupname: String,
			members: [Number],
		}],

	}, {versionKey: false }
);

var company = mongoose.model('company', details);
module.exports = company;
