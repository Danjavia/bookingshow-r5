import React from "react";
import { Comment } from "@domain/entities/Comment";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="comment-list bg-white p-4 rounded-lg shadow-md my-4">
        <h2 className="text-md font-semibold font-semibold">
          No comments yet!
        </h2>
      </div>
    );
  }

  return (
    <div className="comment-list bg-white p-4 rounded-lg shadow-md my-4">
      <h2 className="text-xl font-semibold">Comentarios</h2>
      {comments.map((comment) => (
        <div
          className="my-4 py-2 border-l-purple-950 border-l-2 px-4"
          key={comment.id}
        >
          <p className="text-gray-700 text-sm mb-2 font-semibold">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-700">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
