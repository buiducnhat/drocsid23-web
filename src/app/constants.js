export const APP_NAME = 'Droisid23';

export const SERVER_POLICY = {
  // Only owner can delete server
  OWNER: 0,
  // can modify description, kick user, change typeofserver, change name of server
  MANAGE_SERVER: 1,
  // allow default members see channel(not private channel)
  READ_CHANNEL: 5,
  // allow members CRUD channel
  MANAGE_CHANNEL: 6,
  // create role group, add policy
  MANAGE_ROLE: 2,
  MANAGE_INVITE: 3,
  // user can create channel
  CREATE_CHANNEL: 4,
};

export const CHANNEL_POLICY = {
  //User can view message in channel
  READ: 0,

  //User can modify channel's name, description, setting, delete channel
  MANAGE_CHANNEL: 1,

  //User can modify role of channel
  MANAGE_ROLE: 2,

  //User can create invite
  CREATE_INVITE: 3,

  //User can send message
  CREATE_MESSAGE: 4,

  //User can modify their message
  MANAGE_MESSAGE: 5,
  VIEW_CHANNEL: 6,
};
