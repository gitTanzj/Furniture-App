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
        const token = req.headers.authorization.split(' ')[1];
        const { data, error } = await supabase.auth.getUser(token);
        console.log('Auth result:', { data, error });
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
    if(req.user) {
        try {
            console.log('Fetching listings...');
            const { data, error } = await supabase.from('Listings').select();
    
            if(error) { 
                console.error('Supabase error:', error);
                throw error;
            }
    
            console.log('Successfully fetched listings:', data);
            res.status(200).json(data);
        } catch (error) {
            console.error('Error in /listings endpoint:', error);
            res.status(500).json({ 
                error: error instanceof Error ? error.message : 'Unknown error occurred',
                details: error
            });
        }
    }
})

import listingsRoutes from './routes/listings.routes';
app.use('/listings', listingsRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
