export const APP_NAME = 'Drocsid23';

export const SERVER_POLICY = {
  MANAGE_SERVER: 1,
  MANAGE_ROLE: 2,
  INVITE: 3,
  MANAGE_CHANNEL: 4,
};

export const SERVER_POLICY_NAMES = {
  [SERVER_POLICY.MANAGE_SERVER]: {
    title: 'Manage Server',
    description: 'Manage server settings, roles, and channels',
  },
  [SERVER_POLICY.MANAGE_ROLE]: {
    title: 'Manage Roles',
    description: 'Create, edit, and delete roles',
  },
  [SERVER_POLICY.INVITE]: {
    title: 'Invite Members',
    description: 'Invite new members to the server',
  },
  [SERVER_POLICY.MANAGE_CHANNEL]: {
    title: 'Manage Channels',
    description: 'Create, edit, and delete channels',
  },
};
