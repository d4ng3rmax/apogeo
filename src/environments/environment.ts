// login: 'https://apogeo-oauth-server.cfapps.io/oauth/authorize?response_type=token&client_id=apogeo-app&redirect_uri=https://apogeo-app-dev.cfapps.io/login',
export const environment = {
  production: false,
  api: {
    login: 'https://apogeo-oauth-server.cfapps.io/oauth/authorize?response_type=token&client_id=apogeo-app-local&redirect_uri=http://localhost:4200/#/login',
    forceLogin: 'https://apogeo-oauth-server.cfapps.io/login?response_type=token&client_id=apogeo-app-local&redirect_uri=http://localhost:4200/#/login',
    user: 'https://apogeo-oauth-server.cfapps.io/api/user',
    results: 'https://apogeo-solution-svc.cfapps.io/results',
    questions: 'https://apogeo-survey-svc.cfapps.io/questions',
    pages: 'https://apogeo-survey-svc.cfapps.io/pages',
    solutions: 'https://apogeo-solution-svc.cfapps.io/solutions',
    templates: 'https://apogeo-mail-svc.cfapps.io/templates',
    surveys: 'https://apogeo-survey-svc.cfapps.io/surveys',
    jobPositions: 'https://apogeo-jobposition-svc.cfapps.io/jobpositions',
    departments: 'https://apogeo-jobposition-svc.cfapps.io/departments',
    areas: 'https://apogeo-jobposition-svc.cfapps.io/areas'
  }
};
