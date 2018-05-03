export const CREATE_PROFILE = 'INSERT INTO public.profile(login,password,type) VALUES($1,$2,$3) RETURNING id'
export const FINDONE_BY_ID = 'SELECT id, login, status, type, createdat, updatedat FROM public.profile WHERE id=($1)::uuid'
export const FINDONE_BY_LOGIN = 'SELECT id, login, type, status, createdat, updatedat FROM public.profile WHERE login=$1 AND password=$2'
