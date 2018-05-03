export const CREATE_LOCATION = 'insert into public.location (id_device,position_gps,position_maps) values($1,($2),($2)) RETURNING id'
export const UPDATE_LOCATION = 'update location set position_maps=$1, street=$2, num=$3, complement=$4, updatedat=current_timestamp where id =$5 RETURNING id'
export const FIND_ZONE = 'select * from view_get_zone_from_location where id = $1'
export const FIND_LOCATION_BY_ID = 'select * from location where id = $1'