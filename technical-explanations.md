PT-BR

## Arquitetura - Clean Architecture (levemente adaptada)
A escolha arquitetural do projeto foi de Clean Arch. A arquitetura também é fortemente lastreada nos conceitos de injeção de dependência (DI), OOP e DDD.

### Clean Architecture
Essa arquitetura é ideal para aplicações de médio a grande porte que precisam acomodar escalabilidade, pois sua principal vantagem é o desacoplamento das regras de negócio e de aplicação em relação à implementação de ferramentas externas. Isso garante que o núcleo do negócio permaneça "limpo", sem influência de qualquer ferramenta ou implementação externa. Além de proporcionar maior clareza das regras de negócio, essa abordagem facilita a alteração de detalhes de implementação, como a troca de bancos de dados ou frameworks, sem impactar o núcleo, tornando essa transição muito mais fácil e segura.

Todavia, essa abordagem não é tão vantajosa para aplicações menores que não têm uma demanda de escalabilidade, pois o desacoplamento de um sistema não é algo que vem de graça! Em geral, o desacoplamento aumenta a complexidade e o tempo de desenvolvimento.

Dito isso, a minha escolha por essa arquitetura dependeria da situação. Se o projeto exigisse escalabilidade e houvesse tempo suficiente para o desenvolvimento, eu optaria pela Clean Architecture ou por uma versão simplificada dela. No entanto, se o projeto não precisasse escalar ou se o prazo de entrega fosse muito curto, eu escolheria uma abordagem MVC em vez da Clean Architecture.

### Injeção de dependência e OOP
Escolhi usar Injeção de Dependência e Programação Orientada a Objetos (OOP) na aplicação, pois essas abordagens têm uma boa sinergia com a Clean Architecture, além de facilitarem ainda mais o desacoplamento e os testes da aplicação. Além disso, outros patterns também foram aplicados na arquitetura, como o Strategy pattern e outros.

## Databases - postgre

## ORM - TypeORM

## Autenticação
A autenticação faz uso de Bearer tokens JWT, utilizando-se do sistema de Access Tokens e Refresh Tokens como meio de segurança.

### Autorização
A autorização também é simples e direta: consiste em permitir que o usuário autenticado modifique apenas seus próprios dados com base no ID presente no JWT.