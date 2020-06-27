import { Module, HttpStatus, HttpException } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
// import { PokemonModule } from './pokemon/pokemon.module';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { Connection } from 'typeorm';
import { Photo } from './image/image.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "root",
      "database": "images",
      "entities": [Photo],
      "synchronize": true,
      "logging": true
    }),
    // PokemonModule,
    MulterModule.register({
      dest: './images',
    }),
    TypeOrmModule.forFeature([Photo])
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {
}
