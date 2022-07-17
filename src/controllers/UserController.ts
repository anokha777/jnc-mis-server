// import { Request, Response } from 'express';
// import { AppDataSource } from '../../data-source';
// import { User } from '../entity/User.entity';

// export class UserController {
//   public async getTest(req: Request, res: Response): Promise<void> {
//     const savedUsers = await AppDataSource.manager.findBy(User, { id: 1 });
//     console.log('All Users from the db: ', savedUsers);
//     res
//       .status(200)
//       .send({ success: true, message: 'Thankyou, get Users: ', savedUsers });
//   }

//   public async saveTest(req: Request, res: Response): Promise<void> {
//     console.log('body req-----', req.body.name);
//     const user = new User();
//     user.name = 'Me and Bears';
//     user.gender = 'Male';
//     user.username = '1234567890';
//     user.email = 'test2test.com';
//     user.password = 'Test@123';

//     await AppDataSource.manager.save(user);
//     console.log('User has been saved. User id is', user.id);

//     res.status(200).send({
//       success: true,
//       message: 'User has been saved. User is: ',
//       user,
//     });
//   }

//   public async updateTest(req: Request, res: Response): Promise<void> {
//     await AppDataSource.manager.update(User, 1, { name: 'update name' });
//     res.status(200).send({ success: true, message: 'Thankyou, updated test' });
//   }

//   public async deleteTest(req: Request, res: Response): Promise<void> {
//     await AppDataSource.manager.delete(User, 1);
//     res.status(200).send({ success: true, message: 'Thankyou, deleted test' });
//   }
// }


import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { AppDataSource } from '../../data-source';

import { User } from '../entity/User.entity';

export class UserController{

 getAllUsers = async (req: Request, res: Response) => {
  //Get users from database
  // const userRepository = getRepository(User);
  // const users = await userRepository.find({
  //   select: ['id', 'username', 'role'] //We dont want to send the passwords on response
  // });

  // //Send the users object
  // res.send(users);

  // const savedUsers = await AppDataSource.manager.findBy(User, { id: 1 });
  const savedUsers = await AppDataSource.manager.find(User);
    console.log('All Users from the db: ', savedUsers);
    res
      .status(200)
      .send({ success: true, message: 'Thankyou, get Users: ', savedUsers });
};



 getOneById = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id: number = Number(req.params.id);
  try {
    const user = await AppDataSource.manager.findBy(User, { id: id });
    console.log('user from the db: ', user);
    res
      .status(200)
      .send({ success: true, message: 'Thankyou, get Users: ', user });
  } catch (error) {
    res.status(404).send('User not found');
  }
};

 registerUser = async (req: Request, res: Response) => {

  let { username, password, role } = req.body;
  let user = new User();
  user.username = username;
  user.password = password;
  user.role = role;
  console.log("user-------------", user);

  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }
    //Hash the password, to securely store on DB
    user.hashPassword();

    try {
      await AppDataSource.manager.save(user);
      console.log('User has been saved. User id is', user.id);

      res.status(200).send({
        success: true,
        message: 'User has been saved. User is: ',
        user,
      });
    } catch (e) {
      res.status(409).send('username already in use');
      return;
    }
};

 updateUser = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = Number(req.params.id);

  //Get values from the body
  const { username, role } = req.body;
  try {

    const updatedUser = await AppDataSource.manager.update(User, id, { username: username, role: role });
    if(updatedUser.affected! > 0) {
      res.status(200).send({ success: true, message: 'Thankyou, updated user' });
    } else {
      res.status(404).send({ success: false, message: 'User not found' });
    }

  } catch (error) {
    res.status(404).send({ success: false, message: 'Error User not found' });
  }
};

 deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deletedUser = await AppDataSource.manager.delete(User, id);
    if(deletedUser && deletedUser.affected! > 0) {
      res.status(200).send({ success: true, message: 'Thankyou, user deleted' });
    } else {
      res.status(404).send({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(404).send({ success: false, message: 'Error User not found' });
    return;
  }
};
};

export default UserController;
