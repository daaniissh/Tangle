export const formatPostDate = (createdAt: string | Date): string => {
  const currentDate = new Date();
  const createdAtDate = new Date(createdAt);

  const timeDifferenceInSeconds = Math.floor((currentDate.getTime() - createdAtDate.getTime()) / 1000);
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

  if (timeDifferenceInDays > 1) {
    return createdAtDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } else if (timeDifferenceInDays === 1) {
    return "1d ago";
  } else if (timeDifferenceInHours >= 1) {
    return `${timeDifferenceInHours} hours ago`;
  } else if (timeDifferenceInMinutes >= 1) {
    return `${timeDifferenceInMinutes} m ago`;
  } else {
    return "Just now";
  }
};

export const formatMemberSinceDate = (createdAt: string | Date): string => {
  const date = new Date(createdAt);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `Joined ${month} ${year}`;
};
export const formatSmallPostData = (createdAt: string | Date): string => {
  const currentDate = new Date();
  const createdAtDate = new Date(createdAt);

  const timeDifferenceInSeconds = Math.floor((currentDate.getTime() - createdAtDate.getTime()) / 1000);
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

  if (timeDifferenceInDays > 1) {
    return createdAtDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } else if (timeDifferenceInDays === 1) {
    return "1d";
  } else if (timeDifferenceInHours >= 1) {
    return `${timeDifferenceInHours}h`;
  } else if (timeDifferenceInMinutes >= 1) {
    return `${timeDifferenceInMinutes}m`;
  } else {
    return "Just now";
  }
};


