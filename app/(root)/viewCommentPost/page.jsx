import React from 'react';
import ContentPanel from './contentPanel';
import CommentSidebar from './commentSidebar';

const ViewCommentPostPage = () => {
  return (
    <div className="flex h-screen overflow-hidden">

        {/* Left Side */}
        <ContentPanel />

        {/* Right Side */}
        <CommentSidebar />

    </div>
  );
};

export default ViewCommentPostPage;
