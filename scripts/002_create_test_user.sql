-- Insert test admin user
-- Note: This will only work after the user signs up through the auth system
-- The user must first create an account with email 'teste@teste.com' and password 'teste'
-- Then this script will create the profile

INSERT INTO usuarios (id, nome, email, tipo, telefone)
SELECT 
  id,
  'Usuário Teste',
  'teste@teste.com',
  'admin',
  '(11) 99999-9999'
FROM auth.users 
WHERE email = 'teste@teste.com'
ON CONFLICT (id) DO UPDATE SET
  nome = EXCLUDED.nome,
  tipo = EXCLUDED.tipo,
  telefone = EXCLUDED.telefone;
