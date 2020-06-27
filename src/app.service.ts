import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './image/image.entity';
import { PhotoRO } from './image/image.model';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Photo)
    private imageRepository: Repository<Photo>,
  ) { }

  findAll(): Promise<PhotoRO[]> {
    let images: PhotoRO[];
    return this.imageRepository.find();
  }

  async save(image: PhotoRO): Promise<void> {
    await this.imageRepository.save(image);
  }

  async remove(id: string): Promise<void> {
    await this.imageRepository.delete(id);
  }


  getHello(): string {
    return 'Hello World!';
  }
}
