import serverLimits from "./server-limits"

export const patterns = {
  login: new RegExp(serverLimits.user.login.pattern),
  password: new RegExp(serverLimits.user.password.pattern),
  name: new RegExp(serverLimits.user.name.pattern),
  text: new RegExp(serverLimits.message.text.pattern),
  tag: new RegExp(serverLimits.message.tag.pattern),
}