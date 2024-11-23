type Story = {
  url: string;
  progress: number;
};

type User = {
  id: number;
  name: string;
  username: string; // Added username field
  profileImg: string;
  stories: Story[];
};

export const stories: User[] = [
  {
    id: 1,
    name: "Zendaya",
    username: "zendaya_official", // Added username
    profileImg: "https://i.pinimg.com/736x/58/80/af/5880af58cd0c33853d3e9a0dd04dc061.jpg",
    stories: [
      {
        url: "https://i.pinimg.com/736x/d4/ad/92/d4ad923ec9d76bde34a891fcf991946c.jpg",
        progress: 0,
      },
      {
        url: "https://i.pinimg.com/736x/71/27/f0/7127f06bbdcc5cf0bec04142008dfac4.jpg",
        progress: 0,
      },
    ],
  },
  {
    id: 2,
    name: "Emma Watson",
    username: "emmawatson", // Added username
    profileImg: "https://i.pinimg.com/736x/18/b8/1b/18b81b00c8f1e30ba1b1fb7f069af168.jpg",
    stories: [
      {
        url: "https://i.pinimg.com/736x/38/f0/40/38f040465ebfde0773f858fd97d68bf4.jpg",
        progress: 0,
      }
    ],
  },
  {
    id: 3,
    name: "Billi",
    username: "billieilish", // Added username
    profileImg: "https://i.pinimg.com/736x/13/3c/95/133c9560ec5b940f16b9c4d6954e0965.jpg",
    stories: [
      {
        url: "https://i.pinimg.com/736x/f2/c8/76/f2c8767306647eaa8905ae4ba9fcdd04.jpg",
        progress: 0,
      },
      {
        url: "https://i.pinimg.com/736x/e0/9d/66/e09d6648231e33fa4d34cb2a0bbc4548.jpg",
        progress: 0,
      },
    ],
  },
  {
    id: 4,
    name: "Emma",
    username: "emma_official", // Added username
    profileImg: "https://i.pinimg.com/736x/2a/79/ad/2a79adb62813f80d34165c3a21b52c4e.jpg",
    stories: [
      {
        url: "https://i.pinimg.com/736x/c2/7d/3b/c27d3bd074ec14668bce731cea40bf7c.jpg",
        progress: 0,
      },
      {
        url: "https://i.pinimg.com/736x/48/f2/c5/48f2c5221dbe8d2a168f4a9b7236c4d5.jpg",
        progress: 0,
      },
    ],
  },
  {
    id: 5,
    name: "Scarlett Johansson",
    username: "scarlettj", // Added username
    profileImg: "",
    stories: [
      {
        url: "https://i.pinimg.com/564x/cf/5d/cc/cf5dcc3a4ad11e340cbb1e22577bcd1f.jpg",
        progress: 0,
      },
      {
        url: "https://i.pinimg.com/736x/a6/7e/96/a67e96acb5e2b6b4510e7e4ecfef67f6.jpg",
        progress: 0,
      },
    ],
  },
  {
    id: 6,
    name: "Natalie Portman",
    username: "natalieportman", // Added username
    profileImg: "",
    stories: [
      {
        url: "https://i.pinimg.com/564x/cf/34/50/cf34507b6b03442f4c682c742c43ea9e.jpg",
        progress: 0,
      },
      {
        url: "https://i.pinimg.com/736x/cd/1a/8e/cd1a8e3b6b5e348679e34c01e5f9ad34.jpg",
        progress: 0,
      },
    ],
  },
];
