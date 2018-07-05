-- criando banco de dados

create database sic;

-- usar o banco

use sic;

-- criar tabela do investidor

create table investidor
(
id int primary key auto_increment,
nome varchar(255) not null,
endereco varchar(255) not null,
telefone varchar(30) not null,
email varchar(255) not null,
qtd_bitcoin float not null,
exchange_invest varchar(255) not null
);


-- inserir investidores teste

insert into investidor (nome, endereco, telefone, email, qtd_bitcoin, exchange_invest) values ('Pedro Henrique S Arcajo', 'Res Canadá', '62 91234-5678', 'p_henrique94@hotmail.com',112, 'Foxbit');
insert into investidor (nome, endereco, telefone, email, qtd_bitcoin, exchange_invest) values ('Yago Cesar', 'Res Canadá', '61 91234-5678', 'yago@hotmail.com',112, 'Foxbit');
insert into investidor (nome, endereco, telefone, email, qtd_bitcoin, exchange_invest) values ('Luis Felipe', 'Res Canadá', '63 91234-5678', 'uis@hotmail.com',112, 'mercadobitcoin');
insert into investidor (nome, endereco, telefone, email, qtd_bitcoin, exchange_invest) values ('Pedro Arcajo', 'Res Canadá', '64 91234-5678', 'pedroarcanjo@hotmail.com',112, 'mercadobitcoin');

-- Testando registros

select * from investidor;