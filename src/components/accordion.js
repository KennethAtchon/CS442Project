import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Rating from 'react-rating-stars-component';

function AllCollapseExample({ faqData, reviewData }) {
  return (
    <Accordion>
      {faqData && faqData.map((faqItem) => (
        <Accordion.Item key={faqItem.faq_id} eventKey={faqItem.faq_id.toString()}>
          <Accordion.Header>{faqItem.question}</Accordion.Header>
          <Accordion.Body>{faqItem.answer}</Accordion.Body>
        </Accordion.Item>
      ))}
      {reviewData && reviewData.map((reviewItem) => (
        <Accordion.Item key={reviewItem.review_id} eventKey={reviewItem.review_id.toString()}>
          <Accordion.Header>
          {reviewItem.product_name}
                </Accordion.Header>
          <Accordion.Body
          ><Rating
                  value={reviewItem.rating}
                  edit={false}
                  isHalf={true}
                  activeColor="#FFD700"
                /> Review Date: {reviewItem.review_date}
          <br></br>
          {reviewItem.comment}
          </Accordion.Body>
        </Accordion.Item>
      ))}

    </Accordion>
  );
}

export default AllCollapseExample;
