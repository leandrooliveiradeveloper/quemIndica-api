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
