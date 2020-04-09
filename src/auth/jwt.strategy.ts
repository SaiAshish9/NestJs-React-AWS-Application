import { Strategy,ExtractJwt } from 'passport-jwt'

import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './jwt-payload.interface'
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(

@InjectRepository(UserRepository)
private userRepository: UserRepository


    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'saiashish'
        })
    }
   


async validate(payload:JwtPayload) : Promise<User> {

const {username} = payload


const user=await this.userRepository.findOne({ username })
console.log(user)

if(!user){
    throw new UnauthorizedException()
}

return user

}


}