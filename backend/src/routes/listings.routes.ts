import { Router } from "express";
import { getListings, getListingById, createListing, updateListing, deleteListing, getFavoriteListings, addFavorite, removeFavorite, getUserListings } from "../controllers/listings.controller";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

const router = Router();

router.get('/', getListings);
router.get('/listing/:id', getListingById);
router.post('/', upload.single('file'), createListing);
router.put('/listing/:id', updateListing);
router.delete('/listing/:id', deleteListing);

router.get('/user', getUserListings);

router.get('/favorites', getFavoriteListings);
router.post('/favorites/:id', addFavorite);
router.delete('/favorites/:id', removeFavorite);

export default router;