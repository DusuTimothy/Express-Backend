const adminDashboard = (req, res) => {
    res.status(200).json({
        "status": "success",
        "message": "Welcome, Admin"
    });
};

const userDashboard = (req, res) => {
    res.status(200).json({
        "status": "success",
        "message": "Welcome, User"
    });
};

module.exports = {adminDashboard, userDashboard};