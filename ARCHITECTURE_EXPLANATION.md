## 🏛️ Arquitetura do Projeto

Este projeto segue os princípios da **Clean Architecture**, separando claramente as regras de negócio das implementações externas (como frameworks, banco de dados e bibliotecas). A estrutura é dividida em camadas, facilitando a manutenção, testes e escalabilidade.

- **Domain:** Contém as regras de negócio puras e entidades do sistema.
- **Application:** Implementa os casos de uso e orquestra as operações entre as camadas.
- **Adapters:** Responsáveis pela comunicação entre a aplicação e o mundo externo (controllers, repositórios, etc).
- **Infra:** Implementações concretas de serviços externos, como banco de dados e autenticação.
- **Global:** Utilitários e configurações compartilhadas.

Essa abordagem permite trocar detalhes de implementação (como o banco de dados ou framework web) sem impactar o núcleo do sistema, tornando o projeto mais flexível e robusto.

## Domínio
O domínio é composto pelas entidades da aplicação e value objects. Esses que também possuem testes unitários para assegurar seu funcionamento

## Você sabia?
Embora seja uma lei universal do deus do clean Arch (Bob Martin) que o domínio deve possuir apenas regras de negócio limpas de dependência tecnológias (exceto pela linguagem de programação), criar testes unitários com libs externas (como jest) pode ser uma exceção 

Isso ocorre porque testes não interferem no código em si e não são compartilhados com outras camadas, então não fere a **regra da dependência**. Além disso, testes só existem em ambiente de desenvolvimento.