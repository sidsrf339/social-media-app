import axios from "axios";
import { useState } from "react";
import useUserInfo from "../hooks/useUserInfo";
import Avatar from "./Avatar";
import Upload from "./Upload";

const PostForm = ({ onPost, compact, parent }) => {
  const { userInfo, userInfoStatus } = useUserInfo();
  const [text, setText] = useState("");
  if (userInfoStatus === "loading") {
    return "";
  }
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/posts", { text, parent });
    setText("");
    if (onPost) {
      onPost();
    }
  };

  return (
    <form action="" className="mx-5" onSubmit={handlePostSubmit}>
      <div className={(compact ? "items-center" : "") + " flex"}>
        <div>
          <Avatar src={userInfo?.image} />
        </div>
        <div className="grow pl-2">
          <Upload>
            <textarea
              className={
                (compact ? "h-10 mt-1" : "h-20") + " w-full p-2 bg-transparent text-twitterWhite"
              }
              placeholder={compact ? "Tweet Your Reply" : "What's Happening"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Upload>
          {!compact && (
            <div className="text-right border-t border-twitterBorder pt-2 pb-2 ">
              <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">Tweet</button>
            </div>
          )}
        </div>
        {compact && (
          <div className="pl-2">
            <button className="bg-twitterBlue text-white px-5 py-1 rounded-full">Tweet</button>
          </div>
        )}
      </div>
    </form>
  );
};

export default PostForm;
