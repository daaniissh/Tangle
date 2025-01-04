export type QueryKey =
  | readonly ["authUser"]
  | readonly ["search", string]
  | readonly ["posts"]
  | readonly ["notifications"]
  | readonly ["users"];
