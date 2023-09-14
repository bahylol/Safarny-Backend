// IMPORTS
require("dotenv").config();
const express = require("express");
const app = express();
// IMPORT AUTHENTICATION MIDDLEWARE
const authMiddleware = require("./middelware/auth.js");

const cors = require("cors");
app.use(
  cors({
    origin: process.env.FRONTEND,
    credentials: true, // If you need to support credentials (cookies, authorization headers, etc.)
  })
);

//public routes
const planTrip = require("./routes/public/tripPlan/planTrip.js");
const chatBot = require("./routes/public/chatBot/chatBot.js");
const signUp_traveler = require("./routes/public/manage_user/signUp_traveler.js");
const login = require("./routes/public/manage_user/login.js");
const localguiderequest = require("./routes/public/manage_local_guide/localGuide_request.js");
const signUp_localGuide = require("./routes/public/manage_local_guide/signUp_localGuide.js");
const forgot_password = require("./routes/public/ForgotPassword/forgot_password.js");
const reset_password = require("./routes/public/ForgotPassword/reset_password.js");

//private routes
const manage_localGuide = require("./routes/private/admin/manage_localGuide.js");
const get_localGuideRequests = require("./routes/private/admin/get_localGuideRequests.js");
const addNewAdmin = require("./routes/private/admin/addNewAdmin.js");
const detailedRating = require("./routes/private/ratings/getDetailedRating.js");
const rateService = require("./routes/private/ratings/rateService.js");
const removeRating = require("./routes/private/ratings/removeRating.js");
const getReviewOfService = require("./routes/private/reviews/getReviews.js");
const reviewService = require("./routes/private/reviews/reviewService.js");
const removeReview = require("./routes/private/reviews/removeReview.js");
const searchUsers = require("./routes/private/manage_traveler/searchTraveler.js");
const follow = require("./routes/private/follows/follow.js");
const getFollowers = require("./routes/private/follows/getFollowers.js");
const getFollowing = require("./routes/private/follows/getFollowing.js");
const removeFollow = require("./routes/private/follows/removeFollow.js");
const createPost = require("./routes/private/posts/createPost.js");
const removePost = require("./routes/private/posts/removePost.js");
const getFeed = require("./routes/private/posts/getFeed.js");
const upDownVote = require("./routes/private/upDownVotes/upDownVote.js");
const getVotes = require("./routes/private/upDownVotes/getVotes.js");
const removeVote = require("./routes/private/upDownVotes/removeVote.js");
const addComment = require("./routes/private/comments/addComment.js");
const getComment = require("./routes/private/comments/getComments.js");
const removeComment = require("./routes/private/comments/removeComment.js");
const travelerMyProfile = require("./routes/private/manage_traveler/travelerMyProfile.js");
const travelerMyPosts = require("./routes/private/manage_traveler/travelerMyPosts.js");
const getTravelerProfile = require("./routes/private/manage_traveler/getTravelerProfile.js");
const getTravelerPosts = require("./routes/private/manage_traveler/getTravelerPosts.js");
const createPackage = require("./routes/private/local_guide_packges/create_packges.js");
const getLocalGuidePackages = require("./routes/private/local_guide_packges/getLocalGuidePackges.js");
const removePackage = require("./routes/private/local_guide_packges/remove_packges.js");
const searchLocalGuides = require("./routes/private/manage_local_guide/searchLocalGuide.js");
const bookLocalGuide = require("./routes/private/manage_traveler/bookLocalGuide.js");
const cancelLocalGuideBooking = require("./routes/private/manage_local_guide/cancelLocalGuideBooking.js");
const confirmLocalGuideBooking = require("./routes/private/transactions/confirmLocalGuideBooking.js");
const cancelPayment = require("./routes/private/transactions/cancelPayment.js");
const gettMyLocalGuideBookings = require("./routes/private/manage_traveler/getMyLocalGuideBookings.js");
const getTravlersBookings = require("./routes/private/manage_local_guide/getTravelersBookings.js");
const getLocalGuideMyProfile = require("./routes/private/manage_local_guide/getLocalGuideMyProfile.js");
const getLocalGuideProfile = require("./routes/private/manage_local_guide/getLocalGuideProfile.js");
const storeImage = require("./routes/public/posts/storeImage.js");
const salthash = require("./routes/public/chatBot/salthash.js");
const searchCompany = require("./routes/private/manage_company/searchCompany.js");
const getCompanyMyProfile = require("./routes/private/manage_company/getCompanyMyProfile.js");
const getCompanyProfile = require("./routes/private/manage_company/getCompanyProfile.js");
const getTravelerTrips = require("./routes/private/manage_traveler/getTravelerTrips.js");
const getTravelerMyTrips = require("./routes/private/manage_traveler/getTravelerMyTrips.js");
const requestQuote = require("./routes/private/manage_traveler/requestQuote.js");
const booktrip = require("./routes/private/manage_traveler/booktrip.js");
const getMyQuotes = require("./routes/private/manage_traveler/getMyQuotes.js");
const getMyTripsBookings = require("./routes/private/manage_traveler/getMyTripsBookings.js");
const getCompanyQuoteRequests = require("./routes/private/manage_company/getCompanyQuoteRequests.js");
const getManagedTrips = require("./routes/private/manage_company/getManagedTrips.js");
const manageQuotes = require("./routes/private/manage_company/manageQuotes.js");
const getMyTransactions = require("./routes/private/transactions/getMyTransactions.js");
const getAllTransactions = require("./routes/private/transactions/getAllTransactions.js");
const adminMyProfile = require("./routes/private/admin/adminMyProfile.js");
const getPost = require("./routes/private/posts/getPost.js");
const getTrip = require("./routes/private/trips/getTrip.js");
const saveTrip = require("./routes/private/trips/saveTrip.js");
const famousDishes = require("./routes/public/CounrtyDetails/FamousCountryDishes.js");
const citiesNames = require("./routes/public/tripPlan/citiesNames.js");
const confrimTripBooking = require("./routes/private/transactions/confrimTripBooking.js");
const getCompanyRequests = require("./routes/private/admin/getCompanyRequests.js");
//public routes
planTrip(app);
chatBot(app);
signUp_traveler(app);
login(app);
localguiderequest(app);
signUp_localGuide(app);
salthash(app);
forgot_password(app);
reset_password(app);
getTrip(app);
famousDishes(app);
citiesNames(app);

app.use(authMiddleware);
saveTrip(app);
//private routes
manage_localGuide(app);
get_localGuideRequests(app);
addNewAdmin(app);
detailedRating(app);
rateService(app);
removeRating(app);
getReviewOfService(app);
reviewService(app);
removeReview(app);
searchUsers(app);
follow(app);
getFollowers(app);
getFollowing(app);
removeFollow(app);
createPost(app);
removePost(app);
getFeed(app);
upDownVote(app);
getVotes(app);
removeVote(app);
addComment(app);
getComment(app);
removeComment(app);
travelerMyProfile(app);
travelerMyPosts(app);
getTravelerProfile(app);
getTravelerPosts(app);
createPackage(app);
getLocalGuidePackages(app);
removePackage(app);
searchLocalGuides(app);
bookLocalGuide(app);
confirmLocalGuideBooking(app);
confrimTripBooking(app);
cancelPayment(app);
gettMyLocalGuideBookings(app);
getTravlersBookings(app);
getLocalGuideMyProfile(app);
getLocalGuideProfile(app);
cancelLocalGuideBooking(app);
searchCompany(app);
getCompanyMyProfile(app);
getCompanyProfile(app);
getTravelerMyTrips(app);
getTravelerTrips(app);
requestQuote(app);
getMyQuotes(app);
getMyTripsBookings(app);
manageQuotes(app);
getCompanyQuoteRequests(app);
getManagedTrips(app);
booktrip(app);
getMyTransactions(app);
getAllTransactions(app);
adminMyProfile(app);
getPost(app);
getCompanyRequests(app);

// storeImage(app);

// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).send("Error: Could not find the specified route/page");
});
console.log(process.env.BACKENDURL);
// START SERVER
app.listen(process.env.BACKENDURL || 3001, () => {
  console.log(
    `Server is now listening at port ${process.env.BACKENDURL} on http://localhost:${process.env.BACKENDURL}/`
  );
});
