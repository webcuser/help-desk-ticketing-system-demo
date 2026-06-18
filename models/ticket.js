const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['open', 'in progress', 'closed'], default: 'open' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Middleware to update the time before saving
ticketSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
