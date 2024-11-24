export type Comment = {
  username: string;
  content: string;
  timeAgo: string;
  profileImg: string;
};

export type Story = {
  id: number;
  url: string;
  progress: number;
};

export type Post = {
  id: number;
  username: string;
  profileImg: string;
  postImg: string;
  comments: Comment[];
  stories?: Story[];
  content: string;
  likesCount: number;
  isSaved: boolean;
  isLiked: boolean;
  isStory: boolean;
  timeAgo: string;
};

export const PostData: Post[] = [
  {
    id: 1,
    username: "zendaya_official",
    profileImg: "https://i.pinimg.com/736x/58/80/af/5880af58cd0c33853d3e9a0dd04dc061.jpg",
    postImg: "https://i.pinimg.com/736x/86/91/97/86919782f8e1f2a7e987fc8ab94925f2.jpg",
    comments: [
      { 
        username: "chloe_brown", 
        content: "Love this look!", 
        timeAgo: "2 hours ago",
        profileImg: "https://i.pinimg.com/736x/58/80/af/5880af58cd0c33853d3e9a0dd04dc061.jpg"
      },
      { 
        username: "ava_smith", 
        content: "Amazing post!", 
        timeAgo: "3 hours ago",
        profileImg: "https://i.pinimg.com/736x/58/80/af/5880af58cd0c33853d3e9a0dd04dc061.jpg"
      }
    ],
    stories: [
      {
        id: 1,
        url: "https://i.pinimg.com/736x/d4/ad/92/d4ad923ec9d76bde34a891fcf991946c.jpg",
        progress: 50,
      },
      {
        id: 2,
        url: "https://i.pinimg.com/736x/71/27/f0/7127f06bbdcc5cf0bec04142008dfac4.jpg",
        progress: 30,
      }
    ],
    content: "Zendaya looking fabulous!",
    likesCount: 1200,
    isSaved: true,
    isLiked: false,
    isStory: true,
    timeAgo: "5 minutes ago",
  },
  {
    id: 2,
    username: "emmawatson",
    profileImg: "https://i.pinimg.com/736x/18/b8/1b/18b81b00c8f1e30ba1b1fb7f069af168.jpg",
    postImg: "https://i.pinimg.com/736x/e1/97/ba/e197ba0f572460179e3035c35966d3cf.jpg",
    comments: [
      { 
        username: "emily_rose", 
        content: "Such an inspiration!", 
        timeAgo: "1 hour ago",
        profileImg: "https://i.pinimg.com/736x/18/b8/1b/18b81b00c8f1e30ba1b1fb7f069af168.jpg"
      },
      { 
        username: "honeymoon", 
        content: "I love your posts, Emma!", 
        timeAgo: "30 minutes ago",
        profileImg: "https://i.pinimg.com/736x/18/b8/1b/18b81b00c8f1e30ba1b1fb7f069af168.jpg"
      }
    ],
    stories: [
      {
        id: 1,
        url: "https://i.pinimg.com/736x/38/f0/40/38f040465ebfde0773f858fd97d68bf4.jpg",
        progress: 20,
      }
    ],
    content: "Empowering women around the world!",
    likesCount: 850,
    isSaved: false,
    isLiked: true,
    isStory: true,
    timeAgo: "10 minutes ago",
  },
  {
    id: 3,
    username: "billieilish",
    profileImg: "https://i.pinimg.com/736x/13/3c/95/133c9560ec5b940f16b9c4d6954e0965.jpg",
    postImg: "https://i.pinimg.com/736x/d9/24/b4/d924b44b26e1c8b0ca2ab6fa46cf6694.jpg",
    comments: [
      { 
        username: "sophia_rain", 
        content: "Billie, you're a legend!", 
        timeAgo: "4 hours ago",
        profileImg: "https://i.pinimg.com/736x/13/3c/95/133c9560ec5b940f16b9c4d6954e0965.jpg"
      },
      { 
        username: "ava_smith", 
        content: "Love this vibe!", 
        timeAgo: "2 hours ago",
        profileImg: "https://i.pinimg.com/736x/13/3c/95/133c9560ec5b940f16b9c4d6954e0965.jpg"
      }
    ],
    stories: [
      {
        id: 1,
        url: "https://i.pinimg.com/736x/f2/c8/76/f2c8767306647eaa8905ae4ba9fcdd04.jpg",
        progress: 60,
      },
      {
        id: 2,
        url: "https://i.pinimg.com/736x/e0/9d/66/e09d6648231e33fa4d34cb2a0bbc4548.jpg",
        progress: 40,
      }
    ],
    content: "Let's change the world together.",
    likesCount: 2300,
    isSaved: true,
    isLiked: true,
    isStory: true,
    timeAgo: "2 hours ago",
  },
  {
    id: 4,
    username: "scarlettj",
    profileImg: "https://i.pinimg.com/736x/8a/cc/09/8acc09aa48d973a93f494fb36ae33323.jpg",
    postImg: "https://i.pinimg.com/736x/55/79/df/5579df5b4c10d90c5413f4c40043f1b7.jpg",
    comments: [
      { 
        username: "chloe_brown", 
        content: "Scarlett, you're stunning!", 
        timeAgo: "1 hour ago",
        profileImg: "https://i.pinimg.com/736x/8a/cc/09/8acc09aa48d973a93f494fb36ae33323.jpg"
      }
    ],
    content: "Acting is not just a career, it's a passion.",
    likesCount: 540,
    isSaved: false,
    isLiked: true,
    isStory: false,
    timeAgo: "3 hours ago",
  },
  {
    id: 5,
    username: "natalieportman",
    profileImg: "https://i.pinimg.com/736x/8a/cc/09/8acc09aa48d973a93f494fb36ae33323.jpg",
    postImg: "https://i.pinimg.com/736x/58/d5/c8/58d5c80e892aaefd332bc4a24f0cdaac.jpg",
    comments: [
      { 
        username: "emily_rose", 
        content: "You are incredible!", 
        timeAgo: "5 hours ago",
        profileImg: "https://i.pinimg.com/736x/8a/cc/09/8acc09aa48d973a93f494fb36ae33323.jpg"
      },
      { 
        username: "ava_smith", 
        content: "Stunning as always!", 
        timeAgo: "2 hours ago",
        profileImg: "https://i.pinimg.com/736x/8a/cc/09/8acc09aa48d973a93f494fb36ae33323.jpg"
      }
    ],
    stories: [
      {
        id: 1,
        url: "https://i.pinimg.com/564x/cf/34/50/cf34507b6b03442f4c682c742c43ea9e.jpg",
        progress: 40,
      },
      {
        id: 2,
        url: "https://i.pinimg.com/736x/cd/1a/8e/cd1a8e3b6b5e348679e34c01e5f9ad34.jpg",
        progress: 70,
      }
    ],
    content: "Grateful for everything in life.",
    likesCount: 1900,
    isSaved: true,
    isLiked: false,
    isStory: false,
    timeAgo: "1 hour ago",
  },
  {
    id: 6,
    username: "chloe_brown",
    profileImg: "https://i.pinimg.com/736x/a4/9b/c9/a49bc946bfc0bb1b5b6cc07b58027047.jpg",
    postImg: "https://i.pinimg.com/736x/a3/71/a2/a371a22acf416f756eec13c7d2d8ba15.jpg",
    comments: [
      { 
        username: "zendaya_official", 
        content: "You are glowing, girl!", 
        timeAgo: "3 hours ago",
        profileImg: "https://i.pinimg.com/736x/a4/9b/c9/a49bc946bfc0bb1b5b6cc07b58027047.jpg"
      }
    ],
    content: "Living life with joy and peace.",
    likesCount: 400,
    isSaved: false,
    isLiked: false,
    isStory: false,
    timeAgo: "6 hours ago",
  }
];
