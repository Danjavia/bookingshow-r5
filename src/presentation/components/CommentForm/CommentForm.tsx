import React, { useState } from "react";
import { BookState, useBookStore } from "@application/store/bookStore";

interface CommentFormProps {
  bookId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ bookId }) => {
  const [comment, setComment] = useState("");
  const addComment = useBookStore((state: BookState) => state.addComment);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addComment(bookId, comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
