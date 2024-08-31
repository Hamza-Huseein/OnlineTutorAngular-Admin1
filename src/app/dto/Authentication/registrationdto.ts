
export enum Gender {
    Male = 'Male',
    Female = 'Female'
}

export class RegistrationDTO{
fullname:string|undefined
email:string|undefined
phone:string|undefined
password:string|undefined
birthdate:Date|undefined
nationality:string|undefined
gender:Gender|undefined

}