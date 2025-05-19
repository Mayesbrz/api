import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', required: true },
    created_at: { type: Date, default: Date.now } // Ajout de created_at au lieu de timestamps
  }
);

export default photoSchema;
