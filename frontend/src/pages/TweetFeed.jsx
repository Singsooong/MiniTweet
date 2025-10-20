import Header from "../components/Header";
import TweetComposer from "../components/TweetComposer";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import { tweetAPI } from "../services/authServices";

const TweetFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await tweetAPI.getAllTweets();

        if (response.data.success && Array.isArray(response.data.tweets)) {
          setPosts(response.data.tweets);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tweets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen">
      <Header />
      {/* Main Feed Container */}
      <main className="flex flex-col max-w-2xl mx-auto mt-6  w-full">
        {/* Tweet Composer Section */}
        <TweetComposer onPost={handleNewPost} />

        {/* Feed Posts */}
        {loading ? (
          <p className="text-center text-gray-500 mt-4">Loading tweets...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No tweets yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                likedByUser={post.liked_by_user}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TweetFeed;
