import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, authorName }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-light-card dark:bg-dark-card rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">
          {title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          By {authorName || "Unknown User"}
        </p>
      </div>
    </Link>
  );
}

export default PostCard;
