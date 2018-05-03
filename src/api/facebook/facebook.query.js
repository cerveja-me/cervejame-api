export const CREATE_FACEBOOK = 'insert into public.facebook (id_profile,fb_token,fb_id) values ($1,$2,$3) RETURNING id'
