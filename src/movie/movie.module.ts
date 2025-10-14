import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
// import { MovieEntity } from './entities/movie.entity';
// import { ActorEntity } from '../actor/entities/actor.entity';
// import { MoviePosterEntity } from './entities/poster.entity';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
