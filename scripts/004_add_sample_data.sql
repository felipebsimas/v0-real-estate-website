-- Add sample properties for demonstration
-- Note: This assumes the test user (teste@teste.com) exists and has been created

INSERT INTO imoveis (
  titulo, 
  descricao, 
  preco, 
  tipo, 
  endereco, 
  cidade, 
  estado, 
  cep, 
  area_total, 
  area_construida, 
  quartos, 
  banheiros, 
  vagas_garagem, 
  imagens, 
  status, 
  destaque, 
  usuario_id
) VALUES 
-- Casa em São Paulo - Destaque
(
  'Casa Moderna com Piscina - Vila Madalena',
  'Belíssima casa moderna com 4 quartos, piscina, churrasqueira e jardim. Localizada em uma das regiões mais valorizadas de São Paulo, próxima a restaurantes, bares e transporte público. Casa completamente reformada com acabamentos de primeira qualidade.',
  1250000.00,
  'casa',
  'Rua Harmonia, 456',
  'São Paulo',
  'SP',
  '05435-000',
  300.00,
  250.00,
  4,
  3,
  2,
  ARRAY[
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
  ],
  'ativo',
  true,
  (SELECT id FROM usuarios WHERE email = 'teste@teste.com' LIMIT 1)
),

-- Apartamento no Rio de Janeiro - Destaque
(
  'Apartamento de Luxo em Copacabana',
  'Apartamento de alto padrão com vista para o mar de Copacabana. 3 quartos sendo 1 suíte, sala ampla com varanda, cozinha planejada e 2 vagas de garagem. Prédio com portaria 24h, piscina, sauna e academia.',
  950000.00,
  'apartamento',
  'Avenida Atlântica, 1234',
  'Rio de Janeiro',
  'RJ',
  '22021-001',
  120.00,
  120.00,
  3,
  2,
  2,
  ARRAY[
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
  ],
  'ativo',
  true,
  (SELECT id FROM usuarios WHERE email = 'teste@teste.com' LIMIT 1)
),

-- Casa em Belo Horizonte
(
  'Casa Familiar no Bairro Savassi',
  'Casa térrea com 3 quartos, sala ampla, cozinha, área de serviço e quintal. Localizada no coração do Savassi, próxima a comércios, escolas e hospitais. Ideal para famílias que buscam praticidade e localização.',
  680000.00,
  'casa',
  'Rua Pernambuco, 789',
  'Belo Horizonte',
  'MG',
  '30112-000',
  200.00,
  150.00,
  3,
  2,
  1,
  ARRAY[
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop'
  ],
  'ativo',
  false,
  (SELECT id FROM usuarios WHERE email = 'teste@teste.com' LIMIT 1)
),

-- Apartamento em Porto Alegre
(
  'Apartamento Compacto no Centro',
  'Apartamento de 2 quartos no centro de Porto Alegre, próximo ao mercado público e estações de transporte. Ideal para jovens profissionais ou investimento para locação. Prédio com elevador e portaria.',
  320000.00,
  'apartamento',
  'Rua dos Andradas, 321',
  'Porto Alegre',
  'RS',
  '90020-000',
  65.00,
  65.00,
  2,
  1,
  1,
  ARRAY[
    'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560449752-c4b8e8c1b8c8?w=800&h=600&fit=crop'
  ],
  'ativo',
  false,
  (SELECT id FROM usuarios WHERE email = 'teste@teste.com' LIMIT 1)
),

-- Terreno em Florianópolis - Destaque
(
  'Terreno com Vista para o Mar - Jurerê',
  'Terreno plano de 500m² em Jurerê Internacional, com vista parcial para o mar. Localização privilegiada próxima às melhores praias de Florianópolis. Ideal para construção de casa de alto padrão ou investimento.',
  850000.00,
  'terreno',
  'Rua das Gaivotas, s/n',
  'Florianópolis',
  'SC',
  '88053-000',
  500.00,
  null,
  null,
  null,
  null,
  ARRAY[
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
  ],
  'ativo',
  true,
  (SELECT id FROM usuarios WHERE email = 'teste@teste.com' LIMIT 1)
),

-- Imóvel Comercial em Brasília
(
  'Sala Comercial no Setor Bancário Sul',
  'Sala comercial de 80m² no Setor Bancário Sul, Brasília. Localizada em edifício comercial moderno com elevadores, ar condicionado central e estacionamento. Ideal para escritórios, consultórios ou pequenas empresas.',
  450000.00,
  'comercial',
  'SBS Quadra 2, Bloco A',
  'Brasília',
  'DF',
  '70070-120',
  80.00,
  80.00,
  null,
  2,
  1,
  ARRAY[
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop'
  ],
  'ativo',
  false,
  (SELECT id FROM usuarios WHERE email = 'teste@teste.com' LIMIT 1)
),

-- Casa em Salvador
(
  'Casa Colonial no Pelourinho',
  'Casa histórica restaurada no coração do Pelourinho, Salvador. 4 quartos, 3 banheiros, pátio interno e terraço com vista para a Baía de Todos os Santos. Imóvel único com valor histórico e turístico.',
  780000.00,
  'casa',
  'Largo do Pelourinho, 15',
  'Salvador',
  'BA',
  '40026-280',
  180.00,
  160.00,
  4,
  3,
  null,
  ARRAY[
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop'
  ],
  'ativo',
  false,
  (SELECT id FROM usuarios WHERE email = 'teste@teste.com' LIMIT 1)
),

-- Apartamento em Recife
(
  'Apartamento na Beira Mar de Boa Viagem',
  'Apartamento de 3 quartos na famosa praia de Boa Viagem. Vista frontal para o mar, varanda ampla, cozinha americana e área de serviço. Prédio com piscina, playground e quadra de tênis.',
  520000.00,
  'apartamento',
  'Avenida Boa Viagem, 2468',
  'Recife',
  'PE',
  '51021-000',
  95.00,
  95.00,
  3,
  2,
  1,
  ARRAY[
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?w=800&h=600&fit=crop'
  ],
  'ativo',
  false,
  (SELECT id FROM usuarios WHERE email = 'teste@teste.com' LIMIT 1)
),

-- Casa Vendida (para demonstrar status)
(
  'Casa de Campo em Campos do Jordão',
  'Casa de campo com lareira, 3 quartos, jardim amplo e vista para as montanhas. Localizada em condomínio fechado em Campos do Jordão. Ideal para fins de semana e feriados.',
  890000.00,
  'casa',
  'Estrada do Horto Florestal, 567',
  'Campos do Jordão',
  'SP',
  '12460-000',
  250.00,
  180.00,
  3,
  2,
  2,
  ARRAY[
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
  ],
  'vendido',
  false,
  (SELECT id FROM usuarios WHERE email = 'teste@teste.com' LIMIT 1)
),

-- Apartamento Inativo
(
  'Apartamento em Reforma - Ipanema',
  'Apartamento de 2 quartos em Ipanema passando por reforma completa. Localização privilegiada a 2 quadras da praia. Previsão de entrega em 3 meses.',
  1100000.00,
  'apartamento',
  'Rua Visconde de Pirajá, 135',
  'Rio de Janeiro',
  'RJ',
  '22410-000',
  85.00,
  85.00,
  2,
  2,
  1,
  ARRAY[
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
  ],
  'inativo',
  false,
  (SELECT id FROM usuarios WHERE email = 'teste@teste.com' LIMIT 1)
),

-- Casa em Curitiba - Destaque
(
  'Casa Sustentável no Batel',
  'Casa ecológica com sistema de captação de água da chuva, painéis solares e jardim vertical. 3 quartos, escritório, cozinha gourmet e área de lazer completa. Arquitetura moderna e sustentável.',
  720000.00,
  'casa',
  'Rua Brigadeiro Franco, 890',
  'Curitiba',
  'PR',
  '80430-210',
  220.00,
  180.00,
  3,
  2,
  2,
  ARRAY[
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
  ],
  'ativo',
  true,
  (SELECT id FROM usuarios WHERE email = 'teste@teste.com' LIMIT 1)
),

-- Terreno em Goiânia
(
  'Terreno Comercial na Avenida T-4',
  'Terreno comercial de 400m² na movimentada Avenida T-4, Setor Bueno. Ideal para construção de prédio comercial, clínica ou loja. Excelente localização com alto fluxo de pessoas.',
  380000.00,
  'terreno',
  'Avenida T-4, 1200',
  'Goiânia',
  'GO',
  '74230-035',
  400.00,
  null,
  null,
  null,
  null,
  ARRAY[
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop'
  ],
  'ativo',
  false,
  (SELECT id FROM usuarios WHERE email = 'teste@teste.com' LIMIT 1)
);

-- Update the created_at timestamps to have some variety
UPDATE imoveis SET created_at = NOW() - INTERVAL '30 days' WHERE titulo LIKE '%Copacabana%';
UPDATE imoveis SET created_at = NOW() - INTERVAL '15 days' WHERE titulo LIKE '%Savassi%';
UPDATE imoveis SET created_at = NOW() - INTERVAL '7 days' WHERE titulo LIKE '%Centro%' AND cidade = 'Porto Alegre';
UPDATE imoveis SET created_at = NOW() - INTERVAL '45 days' WHERE titulo LIKE '%Campos do Jordão%';
UPDATE imoveis SET created_at = NOW() - INTERVAL '60 days' WHERE titulo LIKE '%Ipanema%';
