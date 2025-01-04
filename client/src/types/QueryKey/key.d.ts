export type QueryKey =
  | readonly ["authUser"]
  | readonly ["search", string]
  | readonly ["posts",string]
  | readonly ["notifications"]
  | readonly ["users"];
