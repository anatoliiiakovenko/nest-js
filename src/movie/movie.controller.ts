import { Controller, Get } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  @Get()
  findAll() {
    return [
      { id: 1, title: 'Inception' },
      { id: 2, title: 'The Dark Knight' },
      { id: 3, title: 'Interstellar' },
    ];
  }
}
