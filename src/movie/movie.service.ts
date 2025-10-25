import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovieDto } from './dto/movie.dto';
import { Movie, MoviePoster } from '../../generated/prisma/index';

// import { ActorEntity } from '../actor/entities/actor.entity';
// import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.movie.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // async findById(id: string): Promise<MovieEntity> {
  //   const movie = await this.movieRepository.findOne({
  //     where: { id },
  //     relations: ['actors'],
  //   });
  //
  //   if (!movie) throw new NotFoundException('Film not founded');
  //   return movie;
  // }
  //
  async create(dto: MovieDto): Promise<Movie> {
    const { title, releaseYear, imageUrl, actorIds } = dto;

    const actors = await this.prismaService.actor.findMany({
      where: { id: { in: actorIds } },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('One or more actors not found');

    const movie = this.movieRepository.create({
      title,
      releaseYear,
      poster,
      actors,
    });
    return await this.movieRepository.save(movie);
  }
  //
  // async update(id: string, dto: MovieDto): Promise<boolean> {
  //   const movie = await this.findById(id);
  //
  //   Object.assign(movie, dto);
  //   await this.movieRepository.save(movie);
  //
  //   return true;
  // }
  //
  // async delete(id: string): Promise<string> {
  //   const movie = await this.findById(id);
  //   await this.movieRepository.remove(movie);
  //   return movie.id;
  // }
}
