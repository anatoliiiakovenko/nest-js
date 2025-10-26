import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovieDto } from './dto/movie.dto';
import { Movie } from '../../generated/prisma/index';

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

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
      include: {
        actors: true,
        poster: true,
      },
    });

    if (!movie || !movie.isAvailable)
      throw new NotFoundException('Film not founded');
    return movie;
  }

  async create(dto: MovieDto): Promise<Movie> {
    const { title, releaseYear, imageUrl, actorIds } = dto;

    const actors = await this.prismaService.actor.findMany({
      where: { id: { in: actorIds } },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('One or more actors not found');

    const movie = this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({ id: actor.id })),
        },
      },
    });
    return movie;
  }

  async update(id: string, dto: MovieDto): Promise<boolean> {
    const movie = await this.findById(id);

    const actors = await this.prismaService.actor.findMany({
      where: { id: { in: dto.actorIds } },
    });

    if (!actors || !actors.length)
      throw new NotFoundException('One or more actors not found');

    await this.prismaService.movie.update({
      where: { id: movie.id },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        poster: dto.imageUrl
          ? {
              create: {
                url: dto.imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({ id: actor.id })),
        },
      },
    });
    return true;
  }

  async delete(id: string): Promise<string> {
    const movie = await this.findById(id);
    await this.prismaService.movie.delete({ where: { id: movie.id } });
    return movie.id;
  }
}
