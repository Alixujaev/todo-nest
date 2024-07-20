import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post('/register')
  register(@Body() dto: UserDto) {
    return this.userService.register(dto)
  }

  @HttpCode(201)
  @Post('/login')
  login(@Body() dto: UserDto) {
    return this.userService.login(dto)
  }
}