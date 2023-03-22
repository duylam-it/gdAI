import mongoose from 'mongoose';
import mongooseAutopopulate from 'mongoose-autopopulate';

export const MongooseAutopopulatePlugin = {
  name: 'MongooseAutopopulatePlugin',
  async register(schema: mongoose.Schema): Promise<void> {
    schema.plugin(mongooseAutopopulate);
  },
};
