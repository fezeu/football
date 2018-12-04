import { ResultatModule } from './resultat.module';

describe('ResultatModule', () => {
  let resultatModule: ResultatModule;

  beforeEach(() => {
    resultatModule = new ResultatModule();
  });

  it('should create an instance', () => {
    expect(resultatModule).toBeTruthy();
  });
});
