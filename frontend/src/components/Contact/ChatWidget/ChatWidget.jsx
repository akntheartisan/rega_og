import React, { useState, useEffect } from 'react';
import './ChatWidget.css'; 
import scooterImage from '../../../assets/images/scooter4.png';

const ChatWidget = () => {
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(true);
  const [lastUserInput, setLastUserInput] = useState('');

  

  const toggleChat = () => {
    setChatVisible(prevState => !prevState);
    setNotificationVisible(false); 
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponse = (input) => {
    const lowerInput = input.toLowerCase();

    const responses = {
      greeting: [
        "Hey there! 😊 How can I assist you today?",
        "Hello! 👋 What can I do for you?",
        "Hi! How's it going? 😊"
      ],
      wrongDetails: [
        "No worries at all! Just let us know the correct details, and we’ll get it sorted out for you in a jiffy! ✨",
        "Mistakes happen! Please provide the correct details, and we'll fix it right away! 👍"
      ],
      features: [
        "Our scooters come with features like LED headlights, anti-lock brakes, and smartphone connectivity for tracking! 🚀",
        "You’ll love the LED lights and the smartphone connectivity features in our scooters! 🛵"
      ],
      maintenance: [
        "Regular check-ups and keeping it clean go a long way! Don’t forget to charge it properly, too! ⚙️",
        "Make sure to maintain it regularly for a longer lifespan! 🛠️"
      ],
      testRide: [
        "Absolutely! We encourage test rides to find your perfect scooter! Just swing by our store, and we’ll set it up! 🏍️",
        "Yes! Come in for a test ride anytime! We’d love to help you out! 🚦"
      ],
      pricing: [
        "Our scooters start at competitive prices, and we often have promotions! Feel free to ask for details! 💰",
        "You can find our pricing on the website, or just ask here for any specific model! 🛒"
      ],
      warranty: [
        "All our scooters come with a 2-year warranty for parts and labor! 🛡️",
        "We provide a comprehensive warranty for all our products! Let us know if you have any questions about it! 📜"
      ],
      paymentOptions: [
        "We accept various payment options including credit cards, debit cards, and online payments! 💳",
        "You can pay through multiple channels, including cash on delivery! 🏦"
      ],
      delivery: [
        "Delivery typically takes 3-5 business days! We’ll keep you updated with tracking information! 🚚",
        "We offer fast delivery, and you can expect your scooter at your doorstep shortly! 📦"
      ],
      returnPolicy: [
        "You can return the scooter within 30 days if you’re not satisfied! Just keep the receipt! 🔄",
        "Our return policy allows for returns within 30 days of purchase! 📅"
      ],
      support: [
        "You can reach out to our customer support anytime via email or phone! We're here to help! 📞",
        "If you have any issues, feel free to contact our support team! We're available 24/7! 🕒"
      ],
      spareParts: [
        "Yes! We offer spare parts for all our scooters! Just let us know what you need! 🛠️",
        "You can find spare parts on our website, or contact us for assistance! 🧩"
      ],
      upgrades: [
        "We offer upgrade options for batteries and accessories! Ask us for details! ⚡",
        "You can upgrade your scooter for better performance! Let us know what you need! 🔧"
      ],
      accessories: [
        "We have a range of accessories including helmets, covers, and more! 🧢",
        "Check out our accessories section for must-have items for your scooter! 🛡️"
      ],
      troubleshooting: [
        "If you're facing any issues, please describe them, and we'll help you troubleshoot! 🛠️",
        "We're here to assist you with any problems! Just let us know! 🔍"
      ],
      feedback: [
        "We love hearing from our customers! Your feedback helps us improve! 📝",
        "Please share your thoughts! We’re always looking to enhance our services! 🌟"
      ],
      safety: [
        "Safety is our priority! Always wear a helmet and follow traffic rules! 🚦",
        "We recommend following all safety guidelines when riding! Stay safe! 🛵"
      ],
      insurance: [
        "We recommend insuring your scooter for peace of mind! Ask us for suggestions! 🛡️",
        "You can get insurance through various providers! Let us know if you need help! 📄"
      ],
      batteryLife: [
        "Our scooters typically last for 30-50 miles on a single charge! ⚡",
        "Battery life depends on usage, but our models are designed for efficiency! 🔋"
      ],
      upgradeAvailability: [
        "We’re continuously working on upgrades! Check back often for new releases! 🔄",
        "Keep an eye on our website for the latest upgrades and accessories! 📢"
      ],
      availability: [
        "Yes, we have scooters available in various colors! Let us know your preference! 🎨",
        "Absolutely! We keep a variety of models in stock. Just ask about your favorite! 🛵"
      ],
      financingOptions: [
        "Yes, we offer flexible financing options to make your purchase easier! 💳",
        "We have several financing plans available to suit your needs! Just ask for details! 🏦"
      ],
      specialOffers: [
        "Currently, we have a special promotion! Check our website for details! 🎉",
        "Yes, we often have seasonal sales and promotions! Stay tuned for the latest offers! 🌟"
      ],
      deliveryCharges: [
        "Delivery charges may vary based on your location. Please provide your address for details! 🚚",
        "We usually offer free delivery on orders over a certain amount! Let us know where you are! 📦"
      ],
      orderTracking: [
        "Once your order is placed, you’ll receive tracking information via email! 📧",
        "You can track your scooter order through our website after it has been shipped! 🔍"
      ],
      bulkPurchase: [
        "Yes, we offer discounts for bulk purchases! Please reach out for more information! 📊",
        "Definitely! Ordering multiple scooters can save you money! Let's discuss your needs! 🤝"
      ],
      scooterCustomization: [
        "Yes, you can customize your scooter! Let us know what you have in mind! ✨",
        "We offer various customization options to personalize your scooter! Just ask! 🛠️"
      ],
      generalInquiry: [
        "I'm here to help! What can I assist you with today? 🤔",
        "Feel free to ask me anything, and I’ll do my best to provide the information you need! 💬"
      ],
    };

    // Check for keywords
    if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey') || lowerInput.includes('good morning') || lowerInput.includes('good afternoon') || lowerInput.includes('good eveningy') || lowerInput.includes('hey') || lowerInput.includes('hows it going')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    } else if (lowerInput.includes('wrong details') || lowerInput.includes('mistaken') || lowerInput.includes('incorrect') || lowerInput.includes('incorrect information') || lowerInput.includes('i made a mistake') || lowerInput.includes('i gave the wrong info')  || lowerInput.includes('wrong email')  || lowerInput.includes('wrong phone number')) {
      return responses.wrongDetails[Math.floor(Math.random() * responses.wrongDetails.length)];
    } else if (lowerInput.includes('features') || lowerInput.includes('specifications') || lowerInput.includes('what can it do')) {
      return responses.features[Math.floor(Math.random() * responses.features.length)];
    } else if (lowerInput.includes('maintain') || lowerInput.includes('maintenance') || lowerInput.includes('care')) {
      return responses.maintenance[Math.floor(Math.random() * responses.maintenance.length)];
    } else if (lowerInput.includes('test ride') || lowerInput.includes('test drive')) {
      return responses.testRide[Math.floor(Math.random() * responses.testRide.length)];
    } else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('pricing') || lowerInput.includes('bike cost') || lowerInput.includes('how much is the scooter') || lowerInput.includes('scooter cost') || lowerInput.includes('price range') || lowerInput.includes('how much') || lowerInput.includes('whats the price')) {
      return responses.pricing[Math.floor(Math.random() * responses.pricing.length)];
    } else if (lowerInput.includes('warranty') || lowerInput.includes('guarantee') || lowerInput.includes('product is not working')) {
      return responses.warranty[Math.floor(Math.random() * responses.warranty.length)];
    } else if (lowerInput.includes('payment') || lowerInput.includes('pay') || lowerInput.includes('options') || lowerInput.includes('how can i pay') || lowerInput.includes('payment methods') || lowerInput.includes('do you accept card') || lowerInput.includes('payment options') || lowerInput.includes('can i pay with cash')) {
      return responses.paymentOptions[Math.floor(Math.random() * responses.paymentOptions.length)];
    } else if (lowerInput.includes('delivery') || lowerInput.includes('how long') || lowerInput.includes('time after payment') || lowerInput.includes('product') || lowerInput.includes('how long for delivery') || lowerInput.includes('when will it arrive') || lowerInput.includes('delivery times') || lowerInput.includes('do you deliver') || lowerInput.includes('bike') || lowerInput.includes('deliver'))  {
      return responses.delivery[Math.floor(Math.random() * responses.delivery.length)];
    } else if (lowerInput.includes('return') || lowerInput.includes('refund')) {
      return responses.returnPolicy[Math.floor(Math.random() * responses.returnPolicy.length)];
    } else if (lowerInput.includes('support') || lowerInput.includes('help') || lowerInput.includes('how can i contact support') || lowerInput.includes('customer support options') || lowerInput.includes('support team') || lowerInput.includes('do you have a help desk') || lowerInput.includes('help me') || lowerInput.includes('doubt') || lowerInput.includes('how to contact')) {
      return responses.support[Math.floor(Math.random() * responses.support.length)];
    } else if (lowerInput.includes('spare parts') || lowerInput.includes('parts')) {
      return responses.spareParts[Math.floor(Math.random() * responses.spareParts.length)];
    } else if (lowerInput.includes('upgrade')) {
      return responses.upgrades[Math.floor(Math.random() * responses.upgrades.length)];
    } else if (lowerInput.includes('accessories')) {
      return responses.accessories[Math.floor(Math.random() * responses.accessories.length)];
    } else if (lowerInput.includes('troubleshoot') || lowerInput.includes('issue')  || lowerInput.includes('i have a problem')  || lowerInput.includes('how to fix')  || lowerInput.includes('my scooter isnt working') || lowerInput.includes('bike problem')) {
      return responses.troubleshooting[Math.floor(Math.random() * responses.troubleshooting.length)];
    } else if (lowerInput.includes('feedback') || lowerInput.includes('suggestion')) {
      return responses.feedback[Math.floor(Math.random() * responses.feedback.length)];
    } else if (lowerInput.includes('safety') || lowerInput.includes('safe')) {
      return responses.safety[Math.floor(Math.random() * responses.safety.length)];
    } else if (lowerInput.includes('insurance')) {
      return responses.insurance[Math.floor(Math.random() * responses.insurance.length)];
    } else if (lowerInput.includes('battery') || lowerInput.includes('life') || lowerInput.includes('battery life') || lowerInput.includes('how long does the battery last') || lowerInput.includes('battery range') || lowerInput.includes('how many miles')) {
      return responses.batteryLife[Math.floor(Math.random() * responses.batteryLife.length)];
    } else if (lowerInput.includes('availability') || lowerInput.includes('is it available') || lowerInput.includes('do you have in stock') || lowerInput.includes('color options') || lowerInput.includes('scooter models available')) {
      return responses.availability[Math.floor(Math.random() * responses.availability.length)];
    } else if (lowerInput.includes('financing') || lowerInput.includes('do you offer financing')  || lowerInput.includes('installment plans')  || lowerInput.includes('payment plans') || lowerInput.includes('finance options') ) {
      return responses.financingOptions[Math.floor(Math.random() * responses.financingOptions.length)];
    } else if (lowerInput.includes('offer') || lowerInput.includes('promotion') || lowerInput.includes('any deals') || lowerInput.includes('current offers')|| lowerInput.includes('special discounts') || lowerInput.includes('discounts')) {
      return responses.specialOffers[Math.floor(Math.random() * responses.specialOffers.length)];
    } else if (lowerInput.includes('charges') || lowerInput.includes('delivery charges') || lowerInput.includes('how much for delivery') || lowerInput.includes('shipping costs') || lowerInput.includes('fee') || lowerInput.includes('do you charge for delivery')) {
      return responses.deliveryCharges[Math.floor(Math.random() * responses.deliveryCharges.length)];
    } else if (lowerInput.includes('tracking') || lowerInput.includes('order tracking') || lowerInput.includes('where is my scooter') || lowerInput.includes('how to track') || lowerInput.includes('order status') || lowerInput.includes('can i track my order') || lowerInput.includes('bike order') || lowerInput.includes('order') || lowerInput.includes('track id')) {
      return responses.orderTracking[Math.floor(Math.random() * responses.orderTracking.length)];
    } else if (lowerInput.includes('bulk') || lowerInput.includes('discount') || lowerInput.includes('multiple')) {
      return responses.bulkPurchase[Math.floor(Math.random() * responses.bulkPurchase.length)];
    } else if (lowerInput.includes('customization') || lowerInput.includes('personalization')) {
      return responses.scooterCustomization[Math.floor(Math.random() * responses.scooterCustomization.length)];
    }

 
    return "I'm sorry, I couldn't find the answer to that. Please contact us for more information! 📞";
  };





  const handleSendMessage = () => {
    if (inputValue.trim() === '') return; // Prevent sending empty messages
    if (inputValue === lastUserInput) return; // Prevent duplicate messages

    setMessages(prevMessages => [...prevMessages, { sender: 'user', text: inputValue }]);
    setLastUserInput(inputValue);
    setInputValue('');

    const botResponse = getResponse(inputValue);
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
    }, 1000); // Simulate typing delay
  };

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      if (!chatVisible) {
        setNotificationVisible(true);
      }
    }, 5000); // Show notification every 5 seconds

    return () => clearInterval(notificationInterval); // Cleanup interval on unmount
  }, [chatVisible]);

  return (
    <>
      {notificationVisible && !chatVisible && (
        <div className="chat-notification" onClick={toggleChat}>
          <p>Ask me anything</p>
        </div>
      )}
      <div className="chat-widget-container">
        <button className="chat-widget-button" onClick={toggleChat}>
          <img src={scooterImage} alt="Scooter" className="scooter" />
        </button>

        {chatVisible && (
          <div className="chat-window">
            <div className="chat-window-header">Live Chat</div>
            <div className="chat-window-body" id="chat-window">
              {messages.map((message, index) => (
                <p key={index} className={message.sender}>
                  {message.sender === 'user' ? 'You: ' : 'Bot: '}
                  {message.text}
                </p>
              ))}
            </div>
            <div className="chat-window-footer">
              <input
                type="text"
                className="chat-input"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type your message..."
              />
              <button className="chat-send-button" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWidget;
