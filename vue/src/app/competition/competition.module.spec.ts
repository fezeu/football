import { CompetitionModule } from './competition.module';

describe('CompetitionModule', () => {
  let competitionModule: CompetitionModule;

  beforeEach(() => {
    competitionModule = new CompetitionModule();
  });

  it('should create an instance', () => {
    expect(competitionModule).toBeTruthy();
  });
});
