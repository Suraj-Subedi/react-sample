import React, { useEffect } from 'react';
import './Postdetails.css';
import { useParams } from 'react-router-dom';

const PostDetails = ({ post, isLoading, fetchPost }) => {
  const { id } = useParams();

  useEffect(() => {

  }, [id]);

  if (!post) {
    return <div className="glowing-oasis-loader">Loading...</div>;
  }
  const createdAt = post?.createdAt?.toString().split('T');
  const updatedAt = post?.updatedAt?.toString().split('T');

  return (
    <div className="glowing-oasis-container">
      <h1 className="glowing-oasis-title">{post?.postTitle?.[0]}</h1>

      <img
        src={post?.postImageUrl?.[0]}
        alt="preview"
        className="glowing-oasis-image"
      />
      <p className="glowing-oasis-content">{post?.postContent?.[0]}</p>
      <div className="glowing-oasis-footer">
        <p className="glowing-oasis-date">Created on: {createdAt?.[0]}</p>
        <p className="glowing-oasis-date">Updated on: {updatedAt?.[0]}</p>
      </div>
    </div>
  );
};

export default PostDetails;
