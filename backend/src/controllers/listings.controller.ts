import { Request, Response } from 'express';
import supabase from '../utils/supabase';

const getListings = async (req: Request, res: Response) => {
    if(req.user) {
        try {
            const { data, error } = await supabase.from('Listings').select('*').eq('user_id', req.user.id);

            if(error) {
                throw error;
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

const getListingById = async (req: Request, res: Response) => {
    if(req.user) {
        try {
            const { data, error } = await supabase.from('Listings').select('*').eq('id', req.params.id);

            if(error) {
                throw error;
            }

            if(data.length === 0) {
                res.status(404).json({ error: 'Listing not found' });
            } else {
                res.status(200).json(data);
            }
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

const getFavoriteListings = async (req: Request, res: Response) => {
    if(req.user) {
        try {

            const { data, error } = await supabase.from('Favorites').select().eq('user_id', req.user.id);

            if(error) {
                throw error;
            }

            const listingIds = data.map((favorite) => favorite.listing_id).filter((id): id is string => id !== null);

            const { data: listings, error: listingsError } = await supabase.from('Listings').select().in('id', listingIds);

            if(listingsError) {
                throw listingsError;
            }

            res.status(200).json(listings);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

const addFavorite = async (req: Request, res: Response) => {
    if(req.user) {
        try {
            const { data, error } = await supabase.from('Favorites').insert({
                user_id: req.user.id,
                listing_id: req.params.id
            })
            .select()
            .single();

            if(error) {
                throw error;
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

const removeFavorite = async (req: Request, res: Response) => {
    if(req.user) {
        try {
            const { data, error } = await supabase.from('Favorites').delete().eq('user_id', req.user.id).eq('listing_id', req.params.id);

            if(error) {
                throw error;
            }   

            res.status(200).json({ message: 'Favorite removed successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

const createListing = async (req: Request, res: Response) => {
    if(req.user) {
        try {
            const { data, error } = await supabase.from('Listings').insert({
                user_id: req.user.id,
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                image_url: req.body.image_url
            })
            .select()
            .single();

            if(error) {
                throw error;
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

const updateListing = async (req: Request, res: Response) => {
    if(req.user) {
        try {
            const { data, error } = await supabase.from('Listings').update({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                image_url: req.body.image_url
            })
            .eq('id', req.params.id)
            .select()
            .single();

            if(error) {
                throw error;
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

const deleteListing = async (req: Request, res: Response) => {
    if(req.user) {
        try {
            const { data, error } = await supabase.from('Listings').delete().eq('id', req.params.id);

            if(error) {
                throw error;
            }

            res.status(200).json({ message: 'Listing deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

export { getListings, getListingById, getFavoriteListings, addFavorite, removeFavorite, createListing, updateListing, deleteListing };