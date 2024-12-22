const cron = require('node-cron');
const Users = require('../model/user.mongo');
const FormStatus = require('../model/formStatus');

const updateFormStatus = async (status) => {
    try {
        // Update the status in the formStatus collection
        await FormStatus.findOneAndUpdate(
            {},
            { status: status, autoUpdatedAt: Date.now() },
            { upsert: true });
        console.log(`Form status updated to ${status ? "open" : "closed"}.`);
    } catch (err) {
        console.error("Error updating form status:", err);
    }
};

// Schedule to open the form at 9am on Thursday
cron.schedule("0 9 * * 4", async () => {
    console.log("Opening form at 9am on Thursday...");
    await updateFormStatus(true);
});

// Schedule to close the form at 8pm on Saturdays
cron.schedule("0 20 * * 6", async () => {
    console.log("Closing form at 8pm on Saturday...");
    await updateFormStatus(false);
});

// Schedule task to delete users collection at 9pm on Sundays
cron.schedule("0 21 * * 0", async () => {
    console.log("Dropping users collection at 9pm on Sunday...");
    try {
        await Users.deleteMany({});
        console.log("Users collection deleted.");
    } catch (err) {
        console.error("Error deleting users collection:", err);
    }
});