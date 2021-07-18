export const config = {
  api: {
    endpoints: {
      token: {
        root: '/token',
        new: '/token/new'
      },
      file: (fileId?: string) => resourceOfId('file', fileId),
      user: '/user',
      platform: {
        root: '/platform',
        settings: '/platform/settings',
        registrationSettings: '/platform/settings/registration'
      },
      directory: (directoryId?: string) =>
        resourceOfId('directory', directoryId)
    }
  }
};

const resourceOfId = (resourceName: string, resourceId?: string) => {
  let url = `/${resourceName}`;
  if (resourceId) {
    url += `/${resourceId}`;
  }
  return url;
};
