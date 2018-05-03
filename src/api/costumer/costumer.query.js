export const CREATE_COSTUMER = 'insert into public.costumer(id_profile, name, photo, email, phone)values($1,$2,$3,$4,$5) RETURNING id'
export const UPDATE_COSTUMER_PHONE = 'update public.costumer set phone=$1 where id_profile=$2 RETURNING id'
export const GET_COSTUMER_BY_ID = `select * from view_user_details where id_profile =$1`
export const CREATE_MY_VOUCHER = `insert into public.voucher (id,code,description, unit, value, rule, active) values ($1,$2,$3,1,10,3,true) RETURNING id`
export const UPDATE_COSTUMER_VOUCHER = `update public.costumer set id_voucher =$1 where id =$1`