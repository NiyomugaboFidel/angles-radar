import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    companyProfileIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CompanyProfile',
            required: true,
        },
    ],
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);
export default Watchlist;
