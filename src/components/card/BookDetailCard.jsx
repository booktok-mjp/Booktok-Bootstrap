import React from 'react';

const BookDetailCard = ({ currentBook }) => {
  return (
    <div className="book-detail-container">
      <div className="book-detail-card">
        <div className="book-detail-header">
          <img
            src={currentBook.imgUrl}
            alt={`${currentBook.title} cover`}
            className="book-detail-img"
          />
          <div className="book-detail-info">
            <h1 className="book-title">{currentBook.title}</h1>
            <p className="book-description">{currentBook.description}</p>
          </div>
        </div>
        <div className="author-section">
          <img
            src={currentBook.author_imgUrl}
            alt={`${currentBook.author_name}`}
            className="author-img"
          />
          <div className="author-info">
            <h2 className="author-name">{currentBook.author_name}</h2>
            <p className="author-bio">{currentBook.author_bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailCard;
