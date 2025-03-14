import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import supabase from './utils/supabase';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'This is the API for the exmaple app!' });
});

app.get('/listings', async (req: Request, res: Response) => {
    if(req.user) {
        try {
            const { data, error } = await supabase.from('Listings').select('*');

            if(error) { 
                throw error;
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
})

app.get('/listings/user', async (req: Request, res: Response) => {
    if(req.user) {
        try {
            const { data, error } = await supabase.from('Listings').select('*').eq('user_id', req.user.id);

            if(error) {
                throw error;
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
})

app.get('/listings/:id', async (req: Request, res: Response) => {
    if(req.user) {
        try {
            const { data, error } = await supabase.from('Listings').select('*').eq('id', req.params.id);

            if(error) {
                throw error;
            }

            if(data.length === 0) {
                return res.status(404).json({ error: 'Listing not found' });
                
            } 

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
})

app.get('/listings/favorites', async (req: Request, res: Response) => {
    if(req.user) {
        try {
            const { data, error } = await supabase.from('Favorites').select('*').eq('user_id', req.user.id);

            if(error) {
                throw error;
            }

            const listingIds = data.map((favorite) => favorite.listing_id).filter((id): id is string => id !== null);

            const { data: listings, error: listingsError } = await supabase.from('Listings').select('*').in('id', listingIds);

            if(listingsError) {
                throw listingsError;
            }

            return res.status(200).json(listings);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
})

app.post('/listings', async (req: Request, res: Response) => {
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

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
})

app.put('/listings/:id', async (req: Request, res: Response) => {
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

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
})

app.delete('/listings/:id', async (req: Request, res: Response) => {
    if(req.user) {
        try {
            const { data, error } = await supabase.from('Listings').delete().eq('id', req.params.id);

            if(error) {
                throw error;
            }

            return res.status(200).json({ message: 'Listing deleted successfully' });
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
