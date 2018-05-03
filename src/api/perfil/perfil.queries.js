export const INSERT_PERFIL = 'INSERT INTO perfil(email, senha, ativo) values ($1, $2, $3) RETURNING id, email, ativo, criado_em, atualizado_em'
export const SELECT_PERFIL_POR_EMAIL = 'SELECT id, email, ativo, criado_em, atualizado_em FROM perfil WHERE email = $1'
