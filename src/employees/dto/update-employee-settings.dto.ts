import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateEmployeeSettingsDto {
  @IsOptional()
  @IsBoolean()
  smsEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  notificationsOn?: boolean;
}
