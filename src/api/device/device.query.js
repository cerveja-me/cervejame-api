export const CREATE_DEVICE = 'INSERT INTO public.device(push_token,app_version,app_name,app_os,phone_model,device_uuid,install_uuid) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id'
export const FIND_DEVICE = 'SELECT * from public.device where device_uuid=$1 and app_name=$2 and install_uuid=$3'
export const FIND_DEVICE_BY_ID = 'SELECT * from public.device where id=$1'
export const UPDATE_PROFILE_ID_ON_DEVICE = 'UPDATE public.device SET id_profile=$1 WHERE id=$2'
export const UPDATE_DEVICE = 'UPDATE public.device set push_token=$1, app_version=$2, updatedat=current_timestamp where id=$3 RETURNING id'

// export const SELECT_USER_BY_ID = 'SELECT id, name FROM public.user_db WHERE id=$1'
