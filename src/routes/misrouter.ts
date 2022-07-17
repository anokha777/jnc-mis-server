import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export class MisRoutes {
  public router: Router;
  public userController: UserController = new UserController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/user', this.userController.getAllUsers);
    this.router.get('/user/:id', this.userController.getOneById);
    this.router.post('/user', this.userController.registerUser);
    this.router.put('/user/:id', this.userController.updateUser);
    this.router.delete('/user/:id', this.userController.deleteUser);
  }
}
