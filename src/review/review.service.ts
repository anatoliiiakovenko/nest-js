import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '../../generated/prisma/index';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const { text, rating, movieId } = dto;

    const review = this.prismaService.review.create({
      data: {
        text,
        rating,
        movie: {
          connect: { id: movieId },
        },
      },
    });

    return review;
  }
}
