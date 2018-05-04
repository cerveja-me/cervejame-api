export const CREATE_SALE = 'insert into sale (id_location,id_product_zone,price,amount,amount_discount,freight_value) values($1,$2,$3,$4,$5,$6) RETURNING id'
export const CONFIRM_SALE = `update public.sale set id_location=$1, id_product_zone=$2, price=$3, amount=$4, amount_discount=$5, updateat=${new Date()} where id=$6`
export const CREATE_SALE_ACTION = 'insert into public.action(id_sale, action) values ($1, $2) RETURNING id'
export const CREATE_SALE_PAYMENT = 'insert into public.sale_payment(id_sale, payment_type, payment_value) values ($1, $2, $3) RETURNING id'
export const GET_SALES = 'select * from view_get_sales where id_profile = $1 limit 5'
export const SALE_DATA = `select c.name as costumer,c.phone as phone, p.name as product, d.push_token,s.amount,sp.payment_value as price,z.name as city  from sale s
left join product_zone pz on pz.id= s.id_product_zone
left join zone z on z.id = pz.id_zone
left join product p on p.id = pz.id_product
left join seller se on se.id_zone = z.id
left join device d on d.id_profile = se.id_profile
left join sale_payment sp on sp.id_sale=s.id
left join location l on l.id = s.id_location
left join device de on de.id = l.id_device
left join costumer c on c.id_profile = de.id_profile
where s.id=$1`
export const FIND_SALE_ON_PAYMENT = 'select * from sale_payment where id_sale = $1'
export const INSERT_PRODUCT_ON_SALE = `INSERT INTO public.productsale(
id_sale, id_productzone, price, amount, total, amount_discount)
VALUES ($1, $2, $3, $4, $5, $6)`
