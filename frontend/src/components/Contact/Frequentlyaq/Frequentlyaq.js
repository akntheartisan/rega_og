import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Frequentlyaq.css';

const faqs = [
    { question: "How do I contact customer support?", answer: "You can contact us via phone or email as mentioned in the contact section." },
    { question: "What are your working hours?", answer: "We are available from MON - FRI: 8 AM to 9 PM, SAT - SUN: 10 AM to 8 PM." },
    { question: "Do you provide 24/7 support?", answer: "Yes, we provide 24/7 support via email." },
    { question: "How can I track my order?", answer: "You can track your order using the tracking ID provided in your confirmation email." },
    { question: "What is your return policy?", answer: "We accept returns within 30 days of purchase. Please check our returns page for more details." },
    { question: "Do you offer international shipping?", answer: "Yes, we offer international shipping. Shipping costs and times vary by destination." },
    { question: "Can I change my order after it's placed?", answer: "Orders can be modified within 1 hour of placement. Please contact customer support for assistance." },
    { question: "How do I apply a discount code?", answer: "You can enter your discount code at checkout. The discount will be applied to your total amount." },
    { question: "What payment methods do you accept?", answer: "We accept credit cards, debit cards, and GPay." },
    { question: "How can I unsubscribe from your newsletter?", answer: "You can unsubscribe by clicking the link at the bottom of any newsletter email." }
  ];


  
  const Frequentlyaq = () => {
    return (
      <div>
        {/* FAQ Section */}
        <div className="container">
        <div className="faq-section">
                <h3>Frequently Asked Questions (FAQ)</h3>
                {faqs.map((faq, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                    >
                      <Typography>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
        </div>
      </div>
    )
  }
  
  export default Frequentlyaq