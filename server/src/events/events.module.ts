import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MyEvent, MyEventSchema } from './schema/event.schema';
import { StudentModule } from 'src/student/student.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MyEvent.name, schema: MyEventSchema }]),
    StudentModule, 
  ],
  controllers: [EventsController],
  providers: [EventService],
  exports: [EventService],
})
export class EventsModule {}
