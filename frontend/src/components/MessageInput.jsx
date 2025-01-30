import React, { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, X, Send } from "lucide-react";

function MessageInput({ socket }) {
  const [text, setText] = useState(""); // Input text state
  const [imagePreview, setImagePreview] = useState(null); // Image preview state
  const { sendMessage } = useChatStore();

  const fileInputRef = useRef(null); // File input ref

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Remove image preview
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle message submission
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return; // Don't send if there's no text or image

    try {
      // Send message
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText(""); // Clear text input
      setImagePreview(null); // Remove image preview
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="w-full p-4 bg-[#121212] rounded-lg shadow-xl">
      {/* Image Preview Section */}
      {imagePreview && (
        <div className="flex items-center gap-2 mb-4">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-600"
            />
            <button
              onClick={removeImage}
              className="absolute top-0 right-0 w-6 h-6 rounded-full bg-[#1a1a2e] flex items-center justify-center text-white hover:bg-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Message Input Form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-3">
          {/* Text Input */}
          <input
            type="text"
            className="w-full bg-transparent text-white border-b-2 border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Image Upload Button */}
          <button
            type="button"
            className={`btn text-gray-400 ${imagePreview ? "text-emerald-500" : ""} p-2 rounded-lg`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>

        {/* Send Message Button */}
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className={`btn rounded-full p-2 ${text.trim() || imagePreview ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
