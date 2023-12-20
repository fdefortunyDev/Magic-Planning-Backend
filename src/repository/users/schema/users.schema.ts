import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ name: 1, email: 1 });
export { UserSchema };
