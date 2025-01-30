import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId,io} from "../lib/socket.js";


export const getUserForSidebar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id :{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUserForSIdebar",error.message);
        res.status(500).json({error:"internal server error"});
    }
}

export const getMessages=async(req,res)=>{
    try {
        const {id: userToChatId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId},
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const sendMessage=async(req,res)=>{
    try {
        const{text,image}=req.body;
        const{id: receiverId}=req.params;
        const senderId=req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();

        //realtime functionality goes here => socket.io

        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller",error.message);
        res.status(500).json({error:"Internal Server error"});
    }
}

// Clear chat messages for a specific user
export const clearChat = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Log the userId for debugging purposes
      console.log("Clearing chats for userId:", userId);
  
      // Delete all messages where the user is either the sender or receiver
      const result = await Message.deleteMany({
        $or: [{ senderId: userId }, { receiverId: userId }],
      });
  
      // Check if any messages were deleted
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Chat cleared successfully." });
      } else {
        res.status(404).json({ message: "No messages found for the user." });
      }
    } catch (error) {
      console.error("Error clearing chat:", error);
      res.status(500).json({ message: "Failed to clear chat." });
    }
  };


  export const markMessageAsRead = async (req, res) => {
    try {
      const { messageId } = req.params; // Get the message ID from the URL
      const receiverId = req.user._id;  // Get the logged-in user's ID
  
      // Find the message by its ID and check if the logged-in user is the receiver
      const message = await Message.findOne({
        _id: messageId,
        receiverId: receiverId,
      });
  
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
  
      // If the message is already read, no need to update it
      if (message.isRead) {
        return res.status(200).json({ message: "Message is already marked as read" });
      }
  
      // Update the isRead field to true
      message.isRead = true;
      await message.save();
  
      // Optional: Emit an event via socket.io to notify the sender (optional real-time update)
      const senderSocketId = getReceiverSocketId(message.senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit("messageRead", message);
      }
  
      res.status(200).json({ message: "Message marked as read", message });
  
    } catch (error) {
      console.log("Error in markMessageAsRead controller", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
