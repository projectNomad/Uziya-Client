// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseApiUrl: 'http://localhost:8000', // For connecting to server running elsewhere update the base API URL
  apiProvider: '',
  apiVersion: '',
  serverUrl: '',
  videos: {
    minimumSize: 783504130,
    limitVideosGroup: 12
  },
  paths_api: {
    users: '/users',
    profile: '/profile',
    activation: '/users/activate',
    update_password: '/users/update_password',
    authentication: '/authentication',
    reset_password: '/reset_password',
    change_password: '/change_password',
    video: {
      create_list: '/videos/?param=auth',
      update: '/videos/',
      activateOrNot: '/videos/activate/',
    },
    images: {
      create: '/videos/images'
    },
    genre: {
      list: '/videos/genres',
      delete: '/videos/genres/delete'
    }
  },
  groups: {
    viewer: 'viewer',
    producer: 'producer'
  },
  cookiesName: {
    token: 'uziyaToken',
    profile: 'uziyaCredentials',
  },
  defaultLanguage: 'fr',
  supportedLanguages: ['en', 'fr'],
};

// Server URL
environment.serverUrl = `${environment.baseApiUrl}${environment.apiProvider}${environment.apiVersion}`;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
