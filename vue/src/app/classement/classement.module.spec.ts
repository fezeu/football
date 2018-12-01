import { ClassementModule } from './classement.module';

describe('ClassementModule', () => {
  let classementModule: ClassementModule;

  beforeEach(() => {
    classementModule = new ClassementModule();
  });

  it('should create an instance', () => {
    expect(classementModule).toBeTruthy();
  });
});
