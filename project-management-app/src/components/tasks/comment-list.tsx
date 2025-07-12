import { Comment } from "@prisma/client";

interface Props {
  comments: (Comment & { author: { name: string | null } })[];
}

export const CommentList = ({ comments }: Props) => {
  return (
    <div className="mt-2 space-y-2">
      <h4 className="text-sm font-semibold">Comments</h4>
      {comments.length === 0 && (
        <p className="text-sm text-gray-500">No comments yet.</p>
      )}
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="text-sm bg-gray-100 p-2 rounded border"
        >
          <div className="font-medium">{comment.author.name || "Unknown"}</div>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};
