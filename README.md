# Student Finance Simulator

## Pontos a melhorar
- Sistema de error handling não é totalmente modular, depende do express

## TODO (Coisas que não deu tempo de implementar ou resolver)
- maior cobertura de testes unitários

- terminar testes E2E

- o studentId da tabela simulation não é uma foreign key, pois a ORM gera uma tipagem diferente em formato de objeto ao invés do tipo primitivo que espero receber, o que quebra a aplicação caso eu continue mantendo as regras de negócio da aplicação sem referência a tipagem de libs