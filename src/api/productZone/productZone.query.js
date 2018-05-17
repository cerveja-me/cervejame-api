export const GET_PRODUCTS_ZONE = 'select * from view_get_zone_products where id_zone = $1'
export const UPDATE_ACTIVE_PRODUCT_ZONE = 'update product_zone set active=$1 where id = $2 and id_zone =$3 RETURNING id'
