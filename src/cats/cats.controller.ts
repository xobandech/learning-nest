import { CatsService } from './cats.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  getAll() {
    return this.catsService.findAll();
  }

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Delete(':id')
  delete(@Param() params: {id: string}) {
    try {
      return this.catsService.delete(params.id)
    } catch (error) {
      console.log(error)
    }
  }

  @Patch(':id')
  update(
    @Body() createCatDto: CreateCatDto,
    @Param() params: any,
  ) {
    try {
      return this.catsService.update({ id: params.id,...createCatDto});
    } catch (error) {
      console.log('Error updating cat by id: ', error);
    }
  }
}
