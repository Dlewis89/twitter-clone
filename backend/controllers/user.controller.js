import notificationModel from '../models/notification.model.js';
import User from '../models/user.model.js';

const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({username}).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
        console.error('Error in getUserProfile', error.message);
    }
}

const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) return res.status(400).json({ message: 'You can not follow/unfollow yourself' });

        if (!userToModify || !currentUser) return res.status(404).json({ message: 'User not found!' });

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id }});
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id }});
            //Todo: return the id of the auser as a response

            res.status(200).json({ message: 'User unfollowed successfully' });
        } else {
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id }});
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id }});
             
            const notification = new notificationModel({
                type: "follow",
                from: req.user._id,
                to: userToModify._id
            });

            await notification.save();

            //Todo: return the id of the auser as a response
            res.status(200).json({ message: 'User followed successfully' });
        }
       
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
        console.error('Error in followUnfollowUser', error.message);
    }
}

export {
    getUserProfile,
    followUnfollowUser
}