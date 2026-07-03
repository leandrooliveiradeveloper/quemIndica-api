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

CREATE TABLE `quemindica`.`profissional_categoria` (
  `idprofissional` INT NOT NULL,
  `idcategoria` INT NOT NULL,
  INDEX `profissional_fk_idx` (`idprofissional` ASC) VISIBLE,
  INDEX `categoria_fk_idx` (`idcategoria` ASC) VISIBLE,
  CONSTRAINT `profissional_fk`
    FOREIGN KEY (`idprofissional`)
    REFERENCES `quemindica`.`profissional` (`idprofissional`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `categoria_fk`
    FOREIGN KEY (`idcategoria`)
    REFERENCES `quemindica`.`categoria` (`idcategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);