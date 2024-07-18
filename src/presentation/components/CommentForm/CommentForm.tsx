import React, { useState } from "react";
import { BookState, useBookStore } from "@application/store/bookStore";

interface CommentFormProps {
  bookId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ bookId }) => {
  const [comment, setComment] = useState("");
  const { addComment } = useBookStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addComment(bookId, comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="px-7 rounded-[12px] bg-white p-4 shadow-md border">
        <p className="text-xl font-semibold text-blue-900 cursor-pointer transition-all hover:text-black">
          Add Comment
        </p>
        <textarea
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="px-3 text-sm py-1 mt-2 outline-none border-gray-300 w-full resize-none border rounded-lg placeholder:text-sm"
        />
        <div className="flex justify-between mt-2 items-center">
          <p className="text-sm text-blue-900 ">Enter at least 15 characters</p>
          <button
            type="submit"
            className="h-12 w-[150px] bg-blue-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-blue-600"
          >
            Submit comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
