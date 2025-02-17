import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../teacher/teacher-jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseService } from './course.service';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('pdf', {
      storage: diskStorage({
        destination: './uploads', 
        filename: (req, file, callback) => {
          const fileName = `${Date.now()}.pdf`;
          callback(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(pdf)$/)) {
          return callback(new Error('Only PDF files are allowed'), false);
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @Request() req,
    @Body() courseData: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const teacherId = req.user.id;
    const course = {
      ...courseData,
      teacher: teacherId,
      pdf: file ? `http://localhost:3000/uploads/${file.filename}` : null, 
    };
    return this.courseService.create(course);
  }

  @UseGuards(JwtAuthGuard)
  @Get('count')
  async getCourseCountByTeacher(@Request() req): Promise<{ count: number }> {
    const teacherId = req.user.id;
    const count = await this.courseService.countByTeacher(teacherId);
    return { count };
  }

  @UseGuards(JwtAuthGuard)
  @Get('available-courses')
  async getAvailableCourses(@Request() req) {
    const studentId = req.user.id;
    return this.courseService.getCoursesForStudent(studentId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-teacher')
  async getCoursesByTeacher(@Request() req) {
    const teacherId = req.user.id;
    return this.courseService.findByTeacher(teacherId);
  }

  @Get()
  async getAllCourses() {
    return this.courseService.allcourses();
  }

  @Get('total-count')
  async getTotalCourseCount(): Promise<{ count: number }> {
    const count = await this.courseService.countAllCourses();
    return { count };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCourse(@Param('id') id: string): Promise<void> {
    return this.courseService.deleteCourse(id);
  }
}
