import React, { useState, useEffect } from 'react';
import './Posts.css';
import ReadmoreButton from '../../Components/ReadmoreButton';

const Posts = ({ isLoading, fetchAllPosts, posts, totalCount }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {

  }, []);

  const totalPages = Math.ceil(totalCount / 10);

  const handlePageChange = (pageNumber) => {

    setCurrentPage(pageNumber);
  };

  return (
    <div className="schoolwebsite-post-container">
      <h2 className="schoolwebsite-post-title">All Posts</h2>
      {isLoading ? (
        <p className="schoolwebsite-post-loading">Loading posts...</p>
      ) : (
        <div className="schoolwebsite-post-list">
          {posts?.map((post) => (
            <div key={post?._id} className="schoolwebsite-post-item">
              <img
                src={post.postImageUrl[0]}
                alt={`Error while showing image.`}
                className="post-img"
              />
              <p className="post-title">{post.postTitle[0]}</p>
              <p className="post-text">{post.postContent[0]}</p>
              <ReadmoreButton post={post} />
            </div>
          ))}
        </div>
      )}

      <div className="schoolwebsite-pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`schoolwebsite-page-button ${
              currentPage === index + 1 ? 'active' : ''
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Posts;
