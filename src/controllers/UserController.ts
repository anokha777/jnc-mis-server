import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';
import { User } from '../entity/User.entity';

export class UserController {
  public async getTest(req: Request, res: Response): Promise<void> {
    const savedUsers = await AppDataSource.manager.findBy(User, { id: 1 });
    console.log('All Users from the db: ', savedUsers);
    res
      .status(200)
      .send({ success: true, message: 'Thankyou, get Users: ', savedUsers });
  }

  public async saveTest(req: Request, res: Response): Promise<void> {
    console.log('body req-----', req.body.name);
    const user = new User();
    user.name = 'Me and Bears';
    user.gender = 'Male';
    user.username = '1234567890';
    user.email = 'test2test.com';
    user.password = 'Test@123';

    await AppDataSource.manager.save(user);
    console.log('User has been saved. User id is', user.id);

    res.status(200).send({
      success: true,
      message: 'User has been saved. User is: ',
      user,
    });
  }

  public async updateTest(req: Request, res: Response): Promise<void> {
    await AppDataSource.manager.update(User, 1, { name: 'update name' });
    res.status(200).send({ success: true, message: 'Thankyou, updated test' });
  }

  public async deleteTest(req: Request, res: Response): Promise<void> {
    await AppDataSource.manager.delete(User, 1);
    res.status(200).send({ success: true, message: 'Thankyou, deleted test' });
  }
}
