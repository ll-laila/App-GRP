export class AppUser {
  id!: number;

  username!: string ;
  password!: string ;
  confirmPassword!: string ;
  email!: string ;
  phone!: string ;

  credentialsNonExpired!: boolean ;
  enabled!: boolean ;
  accountNonExpired!: boolean ;
  accountNonLocked!: boolean ;
  passwordChanged!: boolean ;
}
