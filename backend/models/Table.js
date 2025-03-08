const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String}
});

const TableConfigSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  columns: [ColumnSchema]
}, { timestamps: true });

module.exports = mongoose.model('Table', TableConfigSchema);
