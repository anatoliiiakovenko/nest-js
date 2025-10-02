import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [MovieModule, UserModule],
})
export class AppModule {}
