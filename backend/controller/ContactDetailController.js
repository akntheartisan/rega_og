const AdminContactModel = require('../model/AdminContactModel');

// Controller to get the shop contact details
exports.getAdminContact = async (req, res) => {
  try {
    const adminContact = await AdminContactModel.findOne(); // Fetch single contact entry

    if (adminContact) {
      return res.status(200).json(adminContact); // Return the contact details as an object
    } else {
      return res.status(404).json({
        status: "error",
        message: "No shop contact details found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve shop contact details",
    });
  }
};

// Controller to update the shop contact details
exports.updateAdminContact = async (req, res) => {
  const { shopAddress, shopMobile, shopEmail, hourEntries } = req.body;

  try {
    const existingContact = await AdminContactModel.findOne();

    if (existingContact) {
      // Update the existing contact
      const updatedContact = await AdminContactModel.findOneAndUpdate(
        {},
        {
          shopaddress: shopAddress,
          shopmobile: shopMobile,
          shopemail: shopEmail,
          shophours: hourEntries.join(', '), // Convert array to string
        },
        { new: true } 
      );

      return res.status(200).json({
        status: "success",
        message: "Shop contact updated successfully",
        data: updatedContact,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Shop contact not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update shop contact details",
    });
  }
};
