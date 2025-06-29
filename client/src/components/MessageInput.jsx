import { Image, Send, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useChatStore } from '../store/useChatStore';

const MessageInput = () => {
  const fileInputRef = useRef();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.log("Failed to send message : ", error);
    }
  };

  return (
    <div className="w-full px-2 py-3 bg-white/80 border-t border-green-100 shadow-lg rounded-b-2xl">
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* Image Preview */}
        {imagePreview && (
          <div className="hidden sm:block relative">
            <img
              src={imagePreview}
              alt="preview"
              className="w-16 h-16 object-cover rounded-lg border border-green-200 shadow"
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-red-100"
              onClick={() => setImagePreview(null)}
              aria-label="Remove image"
            >
              <X size={16} className="text-red-500" />
            </button>
          </div>
        )}
        {/* Input Field */}
        <div className="flex flex-1 items-center bg-gray-100 rounded-xl px-3 py-2 shadow-inner border border-gray-200 focus-within:ring-2 focus-within:ring-green-300">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-base text-gray-800 placeholder-gray-400"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="ml-2 p-3 rounded-lg hover:bg-green-200 transition"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach image"
          >
            <Image strokeWidth={1.8} size={24} className="text-green-500" />
          </button>
        </div>
        {/* Send Button */}
        <button
          type="submit"
          className={`ml-1 p-2 rounded-full bg-green-500 hover:bg-green-600 transition shadow-lg text-white disabled:bg-gray-300 disabled:cursor-not-allowed`}
          disabled={!text.trim() && !imagePreview}
          aria-label="Send message"
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;