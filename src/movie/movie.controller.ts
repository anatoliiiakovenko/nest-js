import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieEntity } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get()
  findAll(): Promise<MovieEntity[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<MovieEntity> {
    return this.movieService.findById(id);
  }

  @Post()
  create(@Body() dto: MovieDto): Promise<MovieEntity> {
    return this.movieService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.movieService.delete(id);
  }
}
