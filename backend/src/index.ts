import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import supabase from './utils/supabase';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'User-Agent', 'Range', 'Content-Range', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.method, req.path, req.ip);
    next();
});

app.use(async (req: Request, res: Response, next: NextFunction) => {
	if (req.headers.authorization) {
		const token = req.headers.authorization.split(' ')[1]; // Extract token from "Bearer <token>"
		const { data, error } = await supabase.auth.getUser(token);
		if (error || !data.user) {
			req.user = null;
			res.status(401).json({ error: 'Unauthorized' });
			return;
		}
		req.user = data.user;
	} else {
		req.user = null;
	}
	next();
});

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'This is the API for the exmaple app!' });
});

app.get('/listings', async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase.from('Listings').select();

        if(error) { 
            throw error;
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

app.get('/listings/user', async (req: Request, res: Response) => {
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
})

app.get('/listings/:id', async (req: Request, res: Response) => {
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

            res.status(200).json(listings);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
})

app.post('/listings/favorites', async (req: Request, res: Response) => {
    if(req.user) {
        try {
            const { data, error } = await supabase.from('Favorites').insert({
                user_id: req.user.id,
                listing_id: req.body.listing_id
            }).select().single();

            if(error) {
                throw error;
            }

            res.status(201).json({ message: 'Favorite added successfully', data });
        } catch (error) {
            res.status(500).json({error: error})
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
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

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
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

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
})

app.delete('/listings/:id', async (req: Request, res: Response) => {
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
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
