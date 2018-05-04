'use strict';Object.defineProperty(exports,'__esModule',{value:true});const FIND_VOUCHER=exports.FIND_VOUCHER='SELECT * from public.voucher where lower(code)=lower($1) and active=true';const FIND_VOUCHER_BY_ID=exports.FIND_VOUCHER_BY_ID='SELECT * from public.voucher where id=($1)::uuid';const CREATE_SALE_VOUCHER=exports.CREATE_SALE_VOUCHER='INSERT INTO public.sale_voucher(id_sale,id_voucher,discount) values($1,$2,$3) RETURNING id_sale';const CREATE_VOUCHER_DEBIT=exports.CREATE_VOUCHER_DEBIT='INSERT INTO public.voucher_debit(id_sale,id_voucher,value) values($1,$2,$3) RETURNING id_sale';const VERIFY_VOUCHER_FIRST_BUY=exports.VERIFY_VOUCHER_FIRST_BUY=`select count(sp.*) as total
from public.sale_payment sp
left join public.sale s on s.id = sp.id_sale
left join public.location l on l.id = s.id_location
left join public.device d on d.id = l.id_device
left join public.profile p on p.id = d.id_profile
where p.id=$1`;const VERIFY_VOUCHER_USER_LIMIT_1=exports.VERIFY_VOUCHER_USER_LIMIT_1=`select count(sp.*) as total
from public.sale_payment sp
left join public.sale s on s.id = sp.id_sale
left join public.location l on l.id = s.id_location
left join public.device d on d.id = l.id_device
left join public.profile p on p.id = d.id_profile
left join public.sale_voucher sv on sv.id_sale = s.id
where p.id=$1 and sv.id_voucher=$2`;