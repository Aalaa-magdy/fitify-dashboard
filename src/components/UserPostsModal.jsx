import React from "react";
import { Dialog } from "@headlessui/react";
import { X, User as UserIcon, ThumbsUp, Repeat, MessageCircle } from "lucide-react";
import moment from "moment";
import { renderProfilePic } from "../utils/ProfilePic";


const UserPostsModal = ({ isOpen, onClose, posts = [] }) => {
  if (!isOpen) return null;


  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <Dialog.Panel className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
          <Dialog.Title className="text-2xl font-bold text-gray-800 mb-4">
            User's Posts
          </Dialog.Title>

          <div className="space-y-6">
            {posts.length === 0 ? (
              <p className="text-gray-500">No posts to show.</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-3">
                    {renderProfilePic(post.user)}
                    <div>
                      <p className="font-semibold text-gray-900">{post.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {moment(post.createdAt).format("LLL")}
                      </p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-800 whitespace-pre-line mb-3">
                    {post.content || "No content"}
                  </p>

                  {/* Images */}
                  {post.imageUrls && post.imageUrls.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      {post.imageUrls.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt={`Post Image ${i + 1}`}
                          className="w-[60%] rounded-md object-contain max-h-[400px]"
                        />
                      ))}
                    </div>
                  )}

                  {/* Videos */}
                  {post.videoUrls && post.videoUrls.length > 0 && (
                    <div className="mb-3">
                      {post.videoUrls.map((url, i) => (
                        <video
                          key={i}
                          src={url}
                          controls
                          className="w-full rounded-md max-h-[400px]"
                        />
                      ))}
                    </div>
                  )}

                  {/* Likes, Comments, Shares */}
                  <div className="flex gap-6 text-gray-600 items-center mt-2">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      <span>{post.likes?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} />
                      <span>{post.comments?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Repeat size={16} />
                      <span>{post.shares || 0}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UserPostsModal;
