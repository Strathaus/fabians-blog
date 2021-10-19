import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';

describe('AuthenticationController', () => {
  let appController: AuthenticationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [],
    }).compile();

    appController = app.get<AuthenticationController>(AuthenticationController);
  });
});
