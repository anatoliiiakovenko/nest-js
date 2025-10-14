import { Injectable } from '@nestjs/common';

@Injectable()
export class ActorService {
  // constructor(
  //   @InjectRepository(ActorEntity)
  //   private readonly actorRepository: Repository<ActorEntity>,
  // ) {}
  //
  // async create(dto: CreateActorDto): Promise<ActorEntity> {
  //   const { name } = dto;
  //   const actor = this.actorRepository.create({
  //     name,
  //   });
  //   return this.actorRepository.save(actor);
  // }
}
