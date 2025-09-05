-- Create usuarios table for user management
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('admin', 'vendedor')),
  telefone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create imoveis table for property listings
CREATE TABLE IF NOT EXISTS imoveis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  preco DECIMAL(15,2) NOT NULL,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('casa', 'apartamento', 'terreno', 'comercial')),
  endereco TEXT NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado VARCHAR(50) NOT NULL,
  cep VARCHAR(10),
  area_total DECIMAL(10,2),
  area_construida DECIMAL(10,2),
  quartos INTEGER,
  banheiros INTEGER,
  vagas_garagem INTEGER,
  imagens TEXT[], -- Array of image URLs
  status VARCHAR(50) NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'vendido', 'inativo')),
  destaque BOOLEAN DEFAULT FALSE,
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE imoveis ENABLE ROW LEVEL SECURITY;

-- RLS Policies for usuarios table
CREATE POLICY "usuarios_select_own" ON usuarios 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "usuarios_insert_own" ON usuarios 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "usuarios_update_own" ON usuarios 
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "usuarios_delete_own" ON usuarios 
  FOR DELETE USING (auth.uid() = id);

-- RLS Policies for imoveis table
CREATE POLICY "imoveis_select_all" ON imoveis 
  FOR SELECT USING (true); -- Anyone can view properties

CREATE POLICY "imoveis_insert_own" ON imoveis 
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.id = imoveis.usuario_id
    )
  );

CREATE POLICY "imoveis_update_own" ON imoveis 
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.id = imoveis.usuario_id
    )
  );

CREATE POLICY "imoveis_delete_own" ON imoveis 
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM usuarios 
      WHERE usuarios.id = auth.uid() 
      AND usuarios.id = imoveis.usuario_id
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_imoveis_cidade ON imoveis(cidade);
CREATE INDEX IF NOT EXISTS idx_imoveis_tipo ON imoveis(tipo);
CREATE INDEX IF NOT EXISTS idx_imoveis_preco ON imoveis(preco);
CREATE INDEX IF NOT EXISTS idx_imoveis_status ON imoveis(status);
CREATE INDEX IF NOT EXISTS idx_imoveis_destaque ON imoveis(destaque);
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
