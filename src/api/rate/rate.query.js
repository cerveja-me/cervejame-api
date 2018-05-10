export const CREATE_RATE = 'insert into public.rate (id_sale,who, rate, comment) values($1,$2,$3,$4) RETURNING id'
