import { usePost } from "../contexts/PostContext";
import { useAsyncFn } from "../hooks/useAsync";
import { createComment } from "../services/comments";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const Post = () => {
  const { post, rootComments, createLocalComment } = usePost();
  const { loading, error, execute: createCommentFn } = useAsyncFn(createComment);

  function onCommentCreate(message) {
    return createCommentFn({postId: post.id,message}).then(createLocalComment)
  }
  return (
    <>
      <h1>{post.title}</h1>
      <h2>{post.body}</h2>
      <h3 className="comments-title">Comments</h3>
      <section>
        <CommentForm
          onSubmit={onCommentCreate}
          loading={loading}
          error={error}
        />
        {rootComments != null && rootComments.length > 0 && (
          <div className="mt-4">
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </>
  );
};

export default Post;
