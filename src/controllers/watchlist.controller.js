import Watchlist from '../models/watchlist.model.js';

export const toggleCompanyInWatchlist = async (req, res) => {
    try {
        const {companyProfileId } = req.body;
        const userId = req.user.id

        let watchlist = await Watchlist.findOne({ userId });

        if (!watchlist) {
            watchlist = await Watchlist.create({
                userId,
                companyProfileIds: [companyProfileId],
            });
            return res.status(200).json({ message: 'Company added to watchlist.', action: 'added' });
        }

        const companyExists = watchlist.companyProfileIds.includes(companyProfileId);
        if (companyExists) {
            watchlist.companyProfileIds.pull(companyProfileId);
            await watchlist.save();
            return res.status(200).json({ message: 'Company removed from watchlist.', action: 'removed' });
        } else {
            watchlist.companyProfileIds.push(companyProfileId);
            await watchlist.save();
            return res.status(200).json({ message: 'Company added to watchlist.', action: 'added' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to toggle watchlist.', error: error.message });
    }
};


export const getUserWatchlist = async (req, res) => {
    try {
        const  userId  = req.user.id;

        const watchlist = await Watchlist.findOne({ userId }).populate('companyProfileIds');
        if (!watchlist) {
            return res.status(404).json({ message: 'No watchlist found for this user.' });
        }

        res.status(200).json({ companies: watchlist.companyProfileIds });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user watchlist.', error: error.message });
    }
};
