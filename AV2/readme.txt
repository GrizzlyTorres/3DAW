CREATE DATABASE fallscar;
USE fallscar;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cnh VARCHAR(20),
    email VARCHAR(100) NOT NULL UNIQUE,
    categoria_cnh VARCHAR(5),
    cpf VARCHAR(14) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    rg VARCHAR(15) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

INSERT INTO usuarios (nome, cnh, email, categoria_cnh, cpf, data_nascimento, senha, rg, telefone) VALUES
('João Silva', '12345678901', 'joao.silva@email.com', 'B', '111.222.333-44', '1990-05-15', 'senha123', '12.345.678-9', '(21) 99999-9999'),
('Maria Oliveira', '09876543210', 'maria.oliveira@email.com', 'AB', '999.888.777-66', '1988-10-20', 'segura123', '98.765.432-1', '(21) 98888-8888');

CREATE TABLE IF NOT EXISTS vitrine (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(100) NOT NULL,
    modelos TEXT NOT NULL,
    grupo VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    imagem VARCHAR(255) NOT NULL
);

INSERT INTO vitrine (categoria, modelos, grupo, preco, imagem) VALUES 
('Compactos', 'Fiat Mobi 1.0, Renault Kwid 1.0 ou similar', 'Grupo B - Compacto Com Ar', 252.23, '../imagens/compacto.png'),
('Picapes', 'Jeep Renegade 1.3, VW T-Cross 1.0 Turbo, GM Tracker 1.2 Turbo ou similar', 'Grupo GX - Suv Automático', 362.23, '../imagens/picape.png'),
('SUVs', 'C3 Aircross 1.0 Turbo, Nivus Highline 1.0T, Turbo ou similar', 'Grupo GC - Suv Compacto Automático', 125.23, '../imagens/suv.png'),
('Sedans', 'Fiat Cronos 1.3, GM Onix Plus 1.0 Turbo ou similar', 'Grupo FS - Intermediário Sedan', 322.32, '../imagens/sedan.png'),
('De Luxo', 'Toyota Corolla 2.0, Nissan Sentra 2.0 ou similar', 'Grupo L - Executivo', 302.32, '../imagens/luxo.png');

CREATE TABLE IF NOT EXISTS veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    marca VARCHAR(50) NOT NULL,
    tipo VARCHAR(50),
    ano INT,
    num_assentos INT,
    estado VARCHAR(50),
    cidade VARCHAR(100),
    preco_diaria DECIMAL(10, 2), 
    ar_condicionado TINYINT(1) DEFAULT 0,
    multimidia TINYINT(1) DEFAULT 0,
    adaptado_pcd TINYINT(1) DEFAULT 0,
    ativo TINYINT(1) DEFAULT 1,
    imagem_path VARCHAR(255)
);

INSERT INTO veiculos (modelo, marca, tipo, ano, num_assentos, estado, cidade, preco_diaria, ar_condicionado, multimidia, adaptado_pcd, ativo, imagem_path) VALUES
('Mobi', 'Fiat', 'Hatch', 2024, 5, 'RJ', 'Rio de Janeiro', 120.50, 1, 1, 0, 1, 'mobi.png'),
('Kwid', 'Renault', 'Hatch', 2023, 5, 'RJ', 'Rio de Janeiro', 115.00, 1, 0, 0, 1, 'kwid.png'),
('Polo', 'VW', 'Hatch', 2025, 5, 'RJ', 'Rio de Janeiro', 150.00, 1, 1, 0, 1, 'polo.png'),
('Onix', 'Chevrolet', 'Hatch', 2024, 5, 'RJ', 'Rio de Janeiro', 145.00, 1, 1, 1, 1, 'onix.png'),
('HB20', 'Hyundai', 'Hatch', 2024, 5, 'RJ', 'Rio de Janeiro', 140.00, 1, 1, 0, 1, 'hb20.png'),
('Cronos', 'Fiat', 'Sedan', 2024, 5, 'RJ', 'Rio de Janeiro', 180.00, 1, 1, 0, 1, 'cronos.png'),
('Onix Plus', 'Chevrolet', 'Sedan', 2025, 5, 'RJ', 'Rio de Janeiro', 190.00, 1, 1, 0, 1, 'onix_plus.png'),
('Corolla', 'Toyota', 'Sedan', 2025, 5, 'RJ', 'Rio de Janeiro', 300.00, 1, 1, 1, 1, 'corolla.png'),
('Sentra', 'Nissan', 'Sedan', 2024, 5, 'RJ', 'Rio de Janeiro', 290.00, 1, 1, 0, 1, 'sentra.png'),
('Virtus', 'VW', 'Sedan', 2024, 5, 'RJ', 'Rio de Janeiro', 210.00, 1, 1, 0, 1, 'virtus.png'),
('Renegade', 'Jeep', 'SUV', 2025, 5, 'RJ', 'Rio de Janeiro', 350.00, 1, 1, 0, 1, 'renegade.png'),
('T-Cross', 'VW', 'SUV', 2024, 5, 'RJ', 'Rio de Janeiro', 330.00, 1, 1, 0, 1, 'tcross.png'),
('Tracker', 'GM', 'SUV', 2024, 5, 'RJ', 'Rio de Janeiro', 320.00, 1, 1, 0, 1, 'tracker.png'),
('C3 Aircross', 'Citroen', 'SUV', 2025, 7, 'RJ', 'Rio de Janeiro', 280.00, 1, 1, 0, 1, 'c3_aircross.png'),
('Nivus', 'VW', 'SUV', 2025, 5, 'RJ', 'Rio de Janeiro', 340.00, 1, 1, 0, 1, 'nivus.png'),
('Toro', 'Fiat', 'Picape', 2024, 5, 'RJ', 'Rio de Janeiro', 450.00, 1, 1, 0, 1, 'toro.png'),
('Hilux', 'Toyota', 'Picape', 2025, 5, 'RJ', 'Rio de Janeiro', 600.00, 1, 1, 0, 1, 'hilux.png'),
('Creta', 'Hyundai', 'SUV', 2024, 5, 'RJ', 'Rio de Janeiro', 310.00, 1, 1, 1, 1, 'creta.png'),
('HR-V', 'Honda', 'SUV', 2025, 5, 'RJ', 'Rio de Janeiro', 380.00, 1, 1, 0, 1, 'hrv.png'),
('Duster', 'Renault', 'SUV', 2023, 5, 'RJ', 'Rio de Janeiro', 250.00, 1, 0, 0, 1, 'duster.png');

CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    veiculo_id INT NOT NULL,
    data_retirada DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    valor_aluguel DECIMAL(10, 2) NOT NULL,
    valor_seguro DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
);