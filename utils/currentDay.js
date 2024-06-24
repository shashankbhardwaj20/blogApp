const date = new Date();
options={
  weekday:"long",
  day:"numeric",
  month:"long",
  year:"numeric",
  time:'long'
}
var currentDay = date.toLocaleDateString("en-US",options);

module.exports = currentDay;