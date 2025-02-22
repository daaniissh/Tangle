import Notification from "../models/notification.model.js";

export const getNotification = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ to: userId })
      .populate({
        path: "from",
        select: "username profileImg is_story",
      })
      .populate({
        path: "post",
				select:"_id img user is_story",
				populate: {
					path: 'user', // Nested populate for post.user
					select: 'username profileImg is_story',
				},
      })

    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotifications function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotifications function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
