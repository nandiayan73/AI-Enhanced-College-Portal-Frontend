

import React, { useState } from "react";

const user = {
  name: "Mohammad Shamsuzzaman",
  bio: "Software Developer | Tech Enthusiast",
  profilePic: "https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=",
  coverPic: "https://marketplace.canva.com/EAECJXaRRew/3/0/1600w/canva-do-what-is-right-starry-sky-facebook-cover-4SpKW5MtQl4.jpg",
};

const Post = ({ content, time, image }) => (
  <div className="bg-white shadow rounded-lg p-4 mb-4">
    {image && <img src={image} alt="User upload" className="w-full rounded mb-2" />}
    <p className="text-gray-800 text-sm sm:text-base">{content}</p>
    <div className="text-xs text-gray-400 mt-2">{time}</div>
  </div>
);

function ScrollableFeed() {
  const [posts, setPosts] = useState([
    // {
    //   // id: 1,
    //   // content: "Just deployed my portfolio!",
    //   // time: "1 hour ago",
    // },
  ]);

  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  const handlePost = () => {
    if (!caption && !imageFile) return;

    const newPost = {
      id: posts.length + 1,
      content: caption,
      image: imagePreview,
      time: "Just now",
    };

    setPosts([newPost, ...posts]);
    setCaption("");
    setImageFile(null);
    setImagePreview("");
  };

  return (
    <div className="bg-gray-100  min-h-screen">
      {/* Profile Section */}
      <div className="top-sectionp-4 sm:p-2 max-w-xl md:max-w-4xl mx-auto mt-4">
        <div className="relative">
          <img src={user.coverPic} alt="Cover" className="w-full h-48 object-cover" />
          <div className="absolute top-32 left-4 sm:left-8">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-20 h-20 mt-5 sm:w-24 sm:h-24 rounded-full border-4 border-white"
            />
          </div>
        </div>

        <div className="pt-12 px-4 sm:px-8 pb-4 bg-white shadow">
          <h2 className="text-xl sm:text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600 text-sm sm:text-base">{user.bio}</p>
        </div>
      </div>
      {/* Upload Section */}
      <div className="p-4 sm:p-6 max-w-xl md:max-w-2xl mx-auto mt-4 bg-white rounded-lg shadow">
        <textarea
          placeholder="What's on your mind?"
          className="w-full border border-gray-300 rounded p-2 mb-2 text-sm sm:text-base"
          rows="3"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="file:cursor-pointer ml-4 p-1 w-65 text-slate-500 text-sm rounded-full leading-6 hover:file:bg-violet-200 file:text-violet-700 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 file:rounded-full file:bg-violet-100 border border-gray-300 "
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-auto max-h-64 object-cover rounded mb-2"
          />
        )}
        <button
          onClick={handlePost}
          className="mx-10 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
        >
          Post
        </button>
      </div>

      {/* Post Feed */}
      <div className="p-4 sm:p-6 max-w-xl md:max-w-2xl mx-auto mt-4">
        {posts.map((post) => (
          <Post
            key={post.id}
            content={post.content}
            time={post.time}
            image={post.image}
          />
        ))}
      </div>
    </div>
  );
}

export default ScrollableFeed;
