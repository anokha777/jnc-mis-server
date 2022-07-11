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
    this.router.get('/user', this.userController.getTest);
    this.router.post('/user', this.userController.saveTest);
    this.router.put('/user', this.userController.updateTest);
    this.router.delete('/user', this.userController.deleteTest);
  }
}
