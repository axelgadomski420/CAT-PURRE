import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Anna K.',
      location: 'Warszawa',
      rating: 5,
      text: 'Kupiłam British Shorthair przez CAT PURRE. Wszystko przebiegło idealnie! Hodowca był super pomocny.',
      avatar: '👩'
    },
    {
      name: 'Piotr M.',
      location: 'Kraków',
      rating: 5,
      text: 'AI asystent pomógł mi wybrać idealną rasę. Maine Coon to najlepszy wybór jaki mogłem zrobić!',
      avatar: '👨'
    },
    {
      name: 'Karolina S.',
      location: 'Gdańsk',
      rating: 5,
      text: 'Platforma przejrzysta, hodowcy zweryfikowani. Czuję się bezpiecznie kupując tu kota.',
      avatar: '👩‍🦰'
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="text-center">Co mówią nasi klienci?</h2>
        <div className="reviews-grid">
          {reviews.map((review, idx) => (
            <div key={idx} className="review-card">
              <div className="stars">{'⭐'.repeat(review.rating)}</div>
              <p className="review-text">"{review.text}"</p>
              <div className="reviewer">
                <span className="avatar">{review.avatar}</span>
                <div>
                  <div className="name">{review.name}</div>
                  <div className="location">📍 {review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials {
          padding: 80px 0;
          background: #f9fafb;
        }
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 50px;
        }
        .review-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .stars {
          font-size: 20px;
          margin-bottom: 16px;
        }
        .review-text {
          font-size: 16px;
          line-height: 1.6;
          color: #333;
          margin-bottom: 20px;
          font-style: italic;
        }
        .reviewer {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .avatar {
          font-size: 40px;
        }
        .name {
          font-weight: 600;
          margin-bottom: 4px;
        }
        .location {
          font-size: 14px;
          color: #666;
        }
        @media (max-width: 768px) {
          .reviews-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
