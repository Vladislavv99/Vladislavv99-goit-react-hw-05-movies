import { Loader } from 'components/Loader/Loader';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from 'services/moviesAPI';
import s from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoader(true);
      try {
        const { data } = await fetchReviews(movieId);
        setReviews(data.results);
        
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoader(false);
      }
    })();
  }, [movieId]);

  return (
    <div className={s.container}>
      {isLoader && <Loader />}
      {(!reviews || reviews.length === 0) && (
        <p className={s.err}>There aren't any reviews for this movie</p>
      )}
      {reviews && (
        <ul className={s.list}>
          {reviews.map(review => (
            <li key={review.id} className={s.item}>
              <h2 className={s.author}>Author: {review.author}</h2>
              <p className={s.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;