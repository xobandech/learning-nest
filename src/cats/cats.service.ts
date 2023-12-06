
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from 'src/schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  delete(id: string) {
    return this.catModel.deleteOne({_id: id})
  }

  async update(createCatDto: CreateCatDto) {
    console.log(createCatDto)
    const cat = await this.catModel.findOneAndUpdate({ _id: createCatDto.id }, {$set: createCatDto}, { new: true})
    console.log(cat)
    return cat
  }
}
