Link de acesso ao sistema: https://xmatheusmzx.github.io/E.E-Louis-Braille/

🏫 1. Objetivo Geral do Projeto

Criar um sistema simples, funcional e seguro de controle de estoque para a escola E.E. Louis Braille, focado em produtos de limpeza.

O sistema permite:

✔ Login de administrador
✔ Cadastrar novos usuários
✔ Alterar usuários e senhas
✔ Registrar produtos
✔ Definir quantidades
✔ Realizar saídas e entradas de estoque
✔ Tudo via HTML, CSS e JavaScript puro

🎨 2. Identidade Visual

A identidade visual foi baseada no logotipo oficial da escola:

📌 Cores usadas:

Azul Royal (#1A237E)

Amarelo Dourado (#F8D648)

Branco (#FFFFFF)

📌 O logotipo foi incorporado na interface e usado como base para a paleta de cores.

🗂️ 3. Estrutura das Páginas Criadas

O sistema possui quatro áreas principais, todas integradas:

🔐 3.1. Página de Login (login.html)

A primeira tela onde o usuário informa:

Usuário

Senha

Funções implementadas:
✔ Validação dos dados armazenados em localStorage
✔ Bloqueio de acesso sem autenticação
✔ Redirecionamento para o painel de administração

🧑‍💼 3.2. Painel do Administrador (dashboard.html)

Aqui o administrador pode:

✔ Cadastrar produtos:

Nome do produto

Quantidade inicial

✔ Atualizar estoque:

Adicionar (entrada)

Subtrair (retirada)

✔ Listagem dinâmica:

Produtos aparecem automaticamente

Quantidades atualizam em tempo real

Dados ficam salvos no localStorage

📦 3.3. Gestão de Usuários (usuarios.html)

Nesta tela é possível:

✔ Criar novos usuários

✔ Alterar senha de usuários existentes
✔ Excluir usuários
✔ Garantir que logins duplicados não sejam cadastrados

Base de usuários também fica salva no localStorage:

[
  {
    "usuario": "admin",
    "senha": "123"
  }
]

📦 4. Como o Estoque Funciona

O estoque é armazenado assim:

[
  {
    "nome": "Detergente",
    "quantidade": 12
  },
  {
    "nome": "Papel Higiênico",
    "quantidade": 50
  }
]


Cada produto pode:

✔ Receber mais unidades
✔ Ter unidades retiradas
✔ Ser atualizado na listagem seguinte

Não existe risco de “perder” dados, pois tudo fica salvo no navegador.

🎨 5. Estilização

Foi criado um CSS customizado com:

✔ Cores da escola
✔ Bordas arredondadas
✔ Botões estilizados
✔ Layout limpo e organizado
✔ Logotipo no topo das telas
✔ Estrutura clara e profissional

🧾 6. Documento de Autoria (HTML Final

📄 Autoria_Sistema_Estoque.html


Esse documento contém:

Nome do desenvolvedor: Matheus de Assis Muniz


🗃️ 7. Estrutura Final do Projeto



💻 8. Tecnologias Utilizadas

HTML5 → estrutura das telas

CSS3 → estilização do layout

JavaScript → funcionamento do sistema

localStorage → armazenamento dos dados

Logotipo oficial da escola

Nenhum servidor, banco de dados ou backend foi necessário.




