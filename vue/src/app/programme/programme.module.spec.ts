import { ProgrammeModule } from './programme.module';

describe('ProgrammeModule', () => {
  let programmeModule: ProgrammeModule;

  beforeEach(() => {
    programmeModule = new ProgrammeModule();
  });

  it('should create an instance', () => {
    expect(programmeModule).toBeTruthy();
  });
});
