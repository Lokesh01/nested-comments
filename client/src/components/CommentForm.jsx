import { useState } from "react";

const CommentForm = ({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = "",
}) => {
  const [message, setmessage] = useState(initialValue);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(message).then(() => setmessage(""));
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          autoFocus={autoFocus}
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          className="message-input"
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Post"}
        </button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  );
};

export default CommentForm;
