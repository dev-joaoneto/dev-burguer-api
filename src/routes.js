
import { Router } from 'express';

import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductsController from './app/controllers/ProductsController.js';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController.js';

import authMiddleware from './app/middlewares/auth.js';
import adminMiddleware from './app/middlewares/admin.js';
import { upload } from './app/middlewares/upload.js';



const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/products', adminMiddleware, upload.single('file'), ProductsController.store); 
routes.put('/products/:id', adminMiddleware, upload.single('file'), ProductsController.update); 
routes.get('/products', ProductsController.index);

routes.post('/categories', adminMiddleware, upload.single('file'), CategoryController.store);
routes.put('/categories/:id', adminMiddleware, upload.single('file'), CategoryController.update);
routes.get('/categories', CategoryController.index);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index); 
routes.put('/orders/:id', adminMiddleware, OrderController.update); 

routes.post('/create-payment-intent', CreatePaymentIntentController.store);

export default routes;
