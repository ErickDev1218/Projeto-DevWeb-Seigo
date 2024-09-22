# :checkered_flag: Seigo

Catálago e leitor de mangá online. 
Um colega autor de mangá liberou os direitos autorais para que a gente pudesse disponibilizar o mesmo online. Com isso, pensamos na ideia de fazer este site.
Segue link do mangá no instagram: https://www.instagram.com/seigo_og

## :technologist: Membros da equipe

Antonio Erick Freitas Ferreira - 542631
Matheus Conrado Pires - 536536
João Pedro Soares Matias - 538683

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

- Usuário não registrado
- Usuário registrado
- Administrador

## :spiral_calendar: Entidades ou tabelas do sistema

- Ato
- Usuário
- Comentário
- Avaliação
- Nota
- Capítulo

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

Usuário não registrado: Pode apenas acessar e ler os capítulos.
Usuário registrado: Pode acessar, ler, comentar, avaliar e favoritar capítulos. Também será possível fazer download de capítulos e o usuário, ao retornar ao capítulo, poderá decidir se voltará de onde parou ou do início.
Administrador: Pode inserir, remover e editar capítulos. Pode apagar comentários.


## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

VueJs, ZOD, JsZip, Pinia, Axios

**Backend:**

Strapi


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Ato | X |  X  | X | X |
| Capítulo | X | X |  X | X |
| Comentário | X |  X  |  | X |

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/entidade1/|
| POST | api/entidade2 |
| PUT | api/entidade2 |
| DELETE | api/entidade2 |
