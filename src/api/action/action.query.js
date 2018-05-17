export const GET_OPEN_ACTION = 'select * from view_get_zone_sales where id_zone =$1 limit 100'
export const CREATE_ACTION = 'INSERT INTO public.action(id_sale, action,id_seller) VALUES ($1,$2,$3) RETURNING id'
export const GET_SALE_DATA = `select d.push_token,d.id from sale s
left join location l on l.id = s.id_location 
left join device d on d.id = l.id_device
where s.id =$1`
export const GET_SALES_NO_ACTION = `SELECT sp.id_sale,z.id AS id_zone,z.sns_topic as topic,
(date_part('epoch'::text, now() - sp.createdat::timestamp with time zone) / 60::double precision)::integer AS elapsed,
( SELECT array_to_json(array_agg(row_to_json(d1.*))) AS array_to_json
       FROM ( SELECT se.name, se.phone, d.push_token
               FROM seller se LEFT JOIN device d on d.id_profile = se.id_profile
              WHERE se.id_zone = z.id)d1) as seller
FROM sale_payment sp LEFT JOIN sale s ON s.id = sp.id_sale
 LEFT JOIN product_zone pz ON pz.id = s.id_product_zone
 LEFT JOIN product p ON p.id = pz.id_product
 LEFT JOIN zone z ON z.id = pz.id_zone
WHERE sp.id_sale not in (select a.id_sale from public.action a)
and (date_part('epoch'::text, now() - sp.createdat::timestamp with time zone) / 60::double precision)::integer < 7
ORDER BY sp.createdat;`
