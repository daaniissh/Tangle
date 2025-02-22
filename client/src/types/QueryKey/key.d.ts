export type QueryKey =
  | readonly ["authUser"]
  | readonly ["search", string]
  | readonly ["posts",string]
  | readonly ["following"]
  | readonly ["notifications"]
  | readonly ["users"];
