import express from 'express';
import config from './src/config';
import routeV1 from './src/defaultRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routeV1);

app.all('/**', (req: any, res: any) => res.status(404).send('Page not found'));

app.use((err: any, req: any, res: any, next: any) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Something broke ❌️!');
    }
});

app.listen(config.port, () => {
    console.log("Server running on port " + config.port);
});
