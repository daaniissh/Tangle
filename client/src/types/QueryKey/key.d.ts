export type QueryKey =
  | readonly ["authUser"]
  | readonly ["search", string]
  | readonly ["posts",[string?,string?]?]
  | readonly ["story",[string?,string?]?]
  | readonly ["following"]
  | readonly ["userStory"]
  | readonly ["suggested"]
  | readonly ["profile",string]
  | readonly ["notifications",boolean?]
  | readonly ["notificationsMain",boolean?]
  | readonly ["users"];
