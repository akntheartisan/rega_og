const Enquiry = require('../model/Enquiry'); // Import the Enquiry model

// Controller to create a new enquiry
const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    console.log(name, email, phone, subject, message);

    const newEnquiry = new Enquiry({
      name,
      email,
      phone,
      subject,
      message,
    });

    await newEnquiry.save();
    console.log(newEnquiry);
    return res.status(201).json({ message: 'Enquiry submitted successfully!' });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return res.status(500).json({ error: 'An error occurred while submitting the enquiry' });
  }
};

// Controller to get all enquiries
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    console.log(enquiries);
    
    return res.status(200).json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return res.status(500).json({ error: 'An error occurred while fetching enquiries' });
  }
};

// Controller to delete an enquiry by ID
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.query; 
    console.log(id)// Get the id from query params
    await Enquiry.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    return res.status(500).json({ error: 'An error occurred while deleting the enquiry' });
  }
};


module.exports = { createEnquiry, getEnquiries, deleteEnquiry };
