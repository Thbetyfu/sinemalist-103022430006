import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller.js';
import { FilmsService } from './films.service.js';

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET /films mengembalikan enam film', () => {
    expect(controller.findAll()).toHaveLength(6);
  });
});
