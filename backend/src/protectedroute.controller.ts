import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles/roles.guard';
import { Roles } from './auth/roles/roles.decorator';
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Roles('ADMIN')
  @Get('dashboard')
  getAdminDashboard() {
    return { message: 'Solo admins pueden acceder a esto' };
  }
}
