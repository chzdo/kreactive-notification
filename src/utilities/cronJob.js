/**
 * This module serves as the utility for all CronJobs in the application
 * @module UTILITY:CronJob
 */

const { schedule } = require('node-cron');

function deleteNotifications({ interval, ...otherParameters }) {
    try {
        schedule(`* * * */14 * *`, async () => {
            const date = new Date();
            date.setDate(date.getDate() - 7);

            const r = await NotificationController.updateRecords({
                conditions: {
                    createdOn: { $lte: date },
                    isActive: true,
                },
                data: {
                    isActive: false,
                    isDeleted: true,
                },
            });
        });
    } catch (e) {
        console.log(`justACronJob: ${e.message}`);
    }
}

module.exports = { deleteNotifications };
