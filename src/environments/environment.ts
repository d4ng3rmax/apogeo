// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: {
    login: 'https://apogeo-oauth-server.cfapps.io/oauth/authorize?response_type=token&client_id=apogeo-app&redirect_uri=http://localhost:4200/login',
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
