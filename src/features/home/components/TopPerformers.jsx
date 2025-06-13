import UserAvatar from '../../../components/UserAvatar';
import { Award, Heart, Repeat, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const TopPerformers = ({ 
  mostLikedPost,
  mostSharedPost,
  isLoading = false,
  colors = {
    mainBlue: '#0E7C86',
    mainYellow: '#D8E84E',
    mainGreen: '#6B732A',
    blueLight: '#D8F3F5',
    yellowLight: '#F5F9D5',
    blueDark: '#0A535A'
  }
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.section 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
        <div className="p-3 rounded-lg shadow-xs" style={{ background: `linear-gradient(135deg, ${colors.mainYellow} 0%, #ECF87E 100%)` }}>
          <Award className="text-black" size={20} />
        </div>
        <h3 className="text-xl font-bold" style={{ color: colors.blueDark }}>Top Performers</h3>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {/* Most Liked Post */}
        <PostCard 
          title="Most Liked Post"
          icon={<Heart className="text-red-500" size={18} />}
          post={mostLikedPost}
          isLoading={isLoading}
          colors={colors}
        />

        {/* Most Shared Post */}
        <PostCard 
          title="Most Shared Post"
          icon={<Repeat className="text-blue-500" size={18} />}
          post={mostSharedPost}
          isLoading={isLoading}
          colors={colors}
          borderColor={colors.mainBlue}
        />
      </div>
    </motion.section>
  );
};

const PostCard = ({ title, icon, post, isLoading, colors, borderColor }) => {
  return (
    <motion.div 
      className="rounded-xl p-4 shadow-sm border bg-white flex flex-col h-full"
      style={{ borderColor }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.4 }
        }
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full shadow-xs" style={{ backgroundColor: colors.blueLight }}>
          {icon}
        </div>
        <h4 className="font-bold text-md" style={{ color: colors.blueDark }}>{title}</h4>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-10 flex-grow">
          <LoadingSpinner size="medium" />
        </div>
      ) : post ? (
        <PostContent post={post} colors={colors} />
      ) : (
        <EmptyPostState />
      )}
    </motion.div>
  );
};

const PostContent = ({ post }) => (
  <>
    <div className="flex items-center gap-3">
      <UserAvatar user={post?.user} size="sm" />
      <div>
        <span className="font-bold text-gray-900">{post?.user?.name}</span>
      </div>
    </div>
    
    <p className="text-gray-800 mt-3 line-clamp-3 text-xs flex-grow">
      {post?.content}
    </p>
    
    {post?.imageUrls?.length > 0 && (
      <div className="mt-3 grid grid-cols-2 gap-2">
        {post.imageUrls.slice(0, 2).map((img, index) => (
          <img 
            key={index}
            src={img} 
            alt={`Post content ${index}`}
            className="rounded-lg h-24 w-full object-cover"
          />
        ))}
      </div>
    )}
    
    <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
      <span className="flex items-center gap-1">
        <Heart className="text-red-500" /> {post?.likes?.length || 0}
      </span>
      <span className="flex items-center gap-1">
        <Repeat className="text-blue-500" /> {post?.shares || 0}
      </span>
      <span className="flex items-center gap-1">
        <MessageSquare className="text-green-500" /> {post?.comments?.length || 0} comments
      </span>
    </div>
    
    {post?.createdAt && (
      <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
        <Clock size={12} />
        <time dateTime={post.createdAt}>
          {new Date(post.createdAt).toLocaleString()}
        </time>
      </div>
    )}
  </>
);

const EmptyPostState = () => (
  <div className="py-8 text-center rounded-lg flex-grow flex flex-col items-center justify-center gap-2 bg-gray-50">
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p className="text-gray-500 text-sm">No post data available</p>
  </div>
);

export default TopPerformers;