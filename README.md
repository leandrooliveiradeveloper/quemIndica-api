# Getting Started

1 - npm install
2 - npm run dev


# rodar o projeto pela api no app localmente 
adb -s ZF524WXRF5 reverse tcp:3000 tcp:3000












CREATE SCHEMA `quemindica` ;

CREATE TABLE `quemindica`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `senha` VARCHAR(20) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `dataCadastro` DATETIME NOT NULL,
  `perfil` INT NOT NULL,
  `status` INT NOT NULL,
  PRIMARY KEY (`idusuario`));

CREATE TABLE `quemindica`.`categoria` (
  `idcategoria` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `status` INT NOT NULL,
  PRIMARY KEY (`idcategoria`));

CREATE TABLE `quemindica`.`profissional` (
  `idprofissional` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(400) NOT NULL,
  `uriImagemPrincipal` VARCHAR(200) NULL,
  `telefone` VARCHAR(20) NOT NULL,
  `disponibilidadeInicio` VARCHAR(5) NOT NULL,
  `disponibilidadeFim` VARCHAR(5) NOT NULL,
  `avaliacaoMedia` INT NOT NULL,
  `servico` VARCHAR(400) NOT NULL,
  `rua` VARCHAR(150) NULL,
  `numero` VARCHAR(10) NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(2) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `latitude` VARCHAR(45) NULL,
  `idusuario` INT NOT NULL,
  PRIMARY KEY (`idprofissional`),
  CONSTRAINT `idusuario_fk`
    FOREIGN KEY (`idusuario`) REFERENCES `quemindica`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

INSERT INTO `quemindica`.`Profissional` (`idprofissional`, `descricao`, `uriImagemPrincipal`, `telefone`, `disponibilidadeInicio`, `disponibilidadeFim`, `avaliacaoMedia`, `servico`, `rua`, `numero`, `bairro`, `estado`, `cidade`, `idusuario`) VALUES ('1', 'Primeiro Profissional', 'https://loja.br.abb.com/media/mageplaza/blog/post/s/h/shutterstock_648385093.jpg', '21988445522', '08:00', '18:00', '0', 'Faxineiro, Cozinheiro, eletricista', 'Rua do Brasil', '5', 'Centro', 'BA', 'Itacaré', '1');

