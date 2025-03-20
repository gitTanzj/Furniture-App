import { Router } from "express";
import { getListings, getListingById, createListing, updateListing, deleteListing, getFavoriteListings, addFavorite, removeFavorite } from "../controllers/listings.controller";

const router = Router();

router.get('/', getListings);
router.get('/listing/:id', getListingById);
router.post('/', createListing);
router.put('/listing/:id', updateListing);
router.delete('/listing/:id', deleteListing);

router.get('/favorites', getFavoriteListings);
router.post('/favorites/:id', addFavorite);
router.delete('/favorites/:id', removeFavorite);

export default router;