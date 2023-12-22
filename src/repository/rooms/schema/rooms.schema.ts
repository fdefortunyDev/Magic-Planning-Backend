import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

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
export class Room {
  @Prop()
  name: string;

  @Prop()
  password: string;
}

const RoomSchema = SchemaFactory.createForClass(Room);
RoomSchema.index({ name: 1 });
export { RoomSchema };
