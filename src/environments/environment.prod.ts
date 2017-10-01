export const environment = {
  production: true,
  api: {
    login: 'https://apogeo-oauth-server.cfapps.io/oauth/authorize?response_type=token&client_id=apogeo-app&redirect_uri=https://apogeo-app-dev.cfapps.io/#/login',
    forceLogin: 'https://apogeo-oauth-server.cfapps.io/login?response_type=token&client_id=apogeo-app-local&redirect_uri=https://apogeo-app-dev.cfapps.io/#/login',
    user: 'https://apogeo-oauth-server.cfapps.io/api/user',
    results: 'https://apogeo-solution-svc.cfapps.io/results',
    questions: 'https://apogeo-survey-svc.cfapps.io/questions',
    pages: 'https://apogeo-survey-svc.cfapps.io/pages',
    solutions: 'https://apogeo-solution-svc.cfapps.io/solutions',
    templates: 'https://apogeo-mail-svc.cfapps.io/templates',
    surveys: 'https://apogeo-survey-svc.cfapps.io/surveys',
    jobPositions: 'https://apogeo-survey-svc.cfapps.io/jobPositions'
  }
};
