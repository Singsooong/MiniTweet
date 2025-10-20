import Header from "../components/Header";
import TweetComposer from "../components/TweetComposer";
import PostCard from "../components/PostCard";

const mockPosts = [
  {
    id: 1,
    username: "Hazel Brook",
    time: "2h ago",
    content:
      "Just tried the new Gelato shop on Bleecker - Pistachio is a must! 🍦 #nycfoodie",
    likes: 164,
    avatarSrc: "https://via.placeholder.com/150/0000FF/FFFFFF?text=HB",
  },
  {
    id: 2,
    username: "Jamie F.",
    time: "3h ago",
    content:
      "Don't miss the new exhibit at the Met! So inspiring! ✨ #artlover",
    likes: 27,
    avatarSrc: "https://via.placeholder.com/150/FF0000/FFFFFF?text=JF",
  },
  // The image shows a duplicate post, so we include it here
  {
    id: 3,
    username: "Jamie F.",
    time: "3h ago",
    content:
      "Don't miss the new exhibit at the Met! So inspiring! ✨ #artlover",
    likes: 27,
    avatarSrc: "https://via.placeholder.com/150/FF0000/FFFFFF?text=JF",
  },
];

const TweetFeed = () => {
  return (
    <div className="min-h-screen">
      <Header />
      {/* Main Feed Container */}
      <main className="flex flex-col max-w-2xl mx-auto mt-6  w-full">
        {/* Tweet Composer Section */}
        <TweetComposer />

        {/* Feed Posts */}
        <div className="space-y-4">
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default TweetFeed;
