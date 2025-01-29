import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseService } from './course.service';
import { Course, CourseSchema } from './course.schema';
import { Student, StudentSchema } from '../student/schema/student.schema';
import { CourseController } from './course.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}


 
