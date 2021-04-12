export const config = {
  api: {
    endpoints: {
      token: {
        root: '/token',
        new: '/token/new'
      },
      fileUpload: '/file',
      user: '/user',
      platform: {
        root: '/platform',
        settings: '/platform/settings',
        registrationSettings: '/platform/settings/registration'
      }
    }
  }
};