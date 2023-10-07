export const PAGE_ROLE_MAP = {
  'PATH_HOME': ['p:home'],
  'PATH_LIVECHAT': ['p:livechat'],
  'PATH_LIVECHAT_ID': ['p:livechat:id'],
  'PATH_LIVECHAT_PROFILE': ['p:livechat:profile'],
  'PATH_LIVECHAT_MESSAGES': ['p:livechat:message'],
  'PATH_LIVECHAT_CONNECTION': ['p:livechat:connection'],
  'PATH_LIVECHAT_PUBLICATION': ['p:livechat:publication'],
  'PATH_LIVECHAT_OVERVIEW': ['p:livechat:overview'],
  'PATH_CHATBOT': ['p:chatbot'],
  'PATH_PERMISSION': ['p:permission']
}

export const BUTTON_ROLE_MAP = {
  /* consultant-api */
  'R_TICKET_VIEW': ['r:ticket:view'],
  'R_SMARTCARD_UPDATE': ['r:smartcard:update'],
  'R_TICKET_DELETE': ['r:ticket:delete'],
  'R_SMARTCARD_CREATE': ['r:smartcard:create'],
  'R_ADDRESS_CREATE': ['r:address:create'],
  'R_CONFIGURATION_UPDATE': ['r:configuration:update'],
  'R_CUSTOMER_CREATE': ['r:customer:create'],
  'R_SMARDCARD_FILTER': ['r:smardcard:filter'],
  'R_ADDRESS_DELETE': ['r:address:delete'],
  'R_TICKET_UPDATE': ['r:ticket:update'],
  'R_TICKET_FILTER': ['r:ticket:filter'],
  'R_CUSTOMER_SEARCH': ['r:customer:search'],
  'R_CONFIGURATION_CREATE': ['r:configuration:create'],
  'R_ASSIGN_HISTORY_CREATE': ['r:assign-history:create'],
  'R_CUSTOMER_VIEW': ['r:customer:view'],
  'R_SMARTCARD_FILTER': ['r:smartcard:filter'],
  'R_ASSIGN_HISTORY_UPDATE': ['r:assign-history:update'],
  'R_ASSIGN_HISTORY_FIND': ['r:assign-history:find'],
  'R_CONFIGURATION_FIND': ['r:configuration:find'],
  'R_ASSIGN_HISTORY_DELETE': ['r:assign-history:delete'],
  'R_CONFIGURATION_DELETE': ['r:configuration:delete'],
  'R_CUSTOMER_DELETE': ['r:customer:delete'],
  'R_TICKET_CREATE': ['r:ticket:create'],
  'R_SMARTCARD_DELETE': ['r:smartcard:delete'],
  'R_CUSTOMER_UPDATE': ['r:customer:update'],

  /* report-api */
  'R_STATISTIC_BOT_VIEW': ['r:statistic-bot:view'],
  'R_STATISTIC_AGENT_EXPORT': ['r:statistic-agent:export'],
  'R_STATISTIC_AGENT_VIEW': ['r:statistic-agent:view'],
  'R_STATISTIC_BOT_EXPORT': ['r:statistic-bot:export'],

  /* iam-api */
  'R_ROLE_CREATE': ['r:role:create'],
  'R_PERMISSION_FIND': ['r:permission:find'],
  'R_PERMISSION_DELETE': ['r:permission:delete'],
  'R_USER_UPDATE': ['r:user:update'],
  'R_ORGANIZATION_FIND': ['r:organization:find'],
  'R_ASSIGN_PERMISSION_DELETE': ['r:assign-permission:delete'],
  'R_ROLE_FIND': ['r:role:find'],
  'R_PERMISSION_UPDATE': ['r:permission:update'],
  'R_ROLE_UPDATE': ['r:role:update'],
  'R_USER_FIND': ['r:user:find'],
  'R_PERMISSION_CREATE': ['r:permission:create'],
  'R_ORGANIZATION_UPDATE': ['r:organization:update'],
  'R_USER_SYNC': ['r:user:sync'],
  'R_ASSIGN_PERMISSION_CREATE': ['r:assign-permission:create'],
  'R_ROLE_DELETE': ['r:role:delete'],
  'R_USER_CREATE': ['r:user:create'],
  'R_ORGANIZATION_CREATE': ['r:organization:create'],

  /* livechat-api */
  'R_LIVECHAT-SESSION_READ': ['r:livechat-session:read'],
  'R_CHATBOT_DELETE': ['r:chatbot:delete'],
  'R_CHATBOT_UPDATE': ['r:chatbot:update'],
  'R_LIVECHAT_READ': ['r:livechat:read'],
  'R_LIVECHAT_CREATE': ['r:livechat:create'],
  'R_LIVECHAT_UPDATE': ['r:livechat:update'],
  'R_THEME_DELETE': ['r:theme:delete'],
  'R_CHATBOT_CREATE': ['r:chatbot:create'],
  'R_THEME_READ': ['r:theme:read'],
  'R_CHATBOT_READ': ['r:chatbot:read'],
  'R_THEME_UPDATE': ['r:theme:update'],
  'R_LIVECHAT_DELETE': ['r:livechat:delete'],
  'R_THEME_CREATE': ['r:theme:create'],
  'R_STATISTIC_OVERVIEW': ['r:statistics:overview']
}

export const REALM_ROLE_MAP = {
  'REALM_ADMIN': ['REALM_ADMIN']
}
