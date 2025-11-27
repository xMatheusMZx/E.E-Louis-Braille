async function login(e){
    e.preventDefault();
    const username = loginUser.value;
    const password = loginPass.value;
    
    
    const res = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if(res.ok){
    sessionStorage.setItem('logado', data.username);
    location.href = 'dashboard.html';
    } else {
    alert(data.error || 'Erro no login');
    }
    }

// ================= USERS =================
if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify([
        { user: "admin", pass: "1234" }
    ]));
}

function getUsers() {
    return JSON.parse(localStorage.getItem("usuarios"));
}

function saveUsers(list) {
    localStorage.setItem("usuarios", JSON.stringify(list));
}

// ================= LOGIN =================
if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", e => {
        e.preventDefault();

        let user = loginUser.value;
        let pass = loginPass.value;
        let users = getUsers();

        let found = users.find(u => u.user === user && u.pass === pass);

        if (found) {
            sessionStorage.setItem("logado", user);
            location.href = "dashboard.html";
        } else {
            alert("Usuário ou senha incorretos!");
        }
    });
}

// ================= LOGOUT =================
if (document.getElementById("logout")) {
    document.getElementById("logout").onclick = () => {
        sessionStorage.clear();
        location.href = "index.html";
    };
}

// ================= ESTOQUE =================
if (document.getElementById("listaProdutos")) {
    if (!localStorage.getItem("estoque")) {
        localStorage.setItem("estoque", JSON.stringify([]));
    }

    function getEstoque() {
        ''
        return JSON.parse(localStorage.getItem("estoque"));
    }

    
    function saveEstoque(list) {
        localStorage.setItem("estoque", JSON.stringify(list));
    }

    function renderEstoque() {
        let lista = getEstoque();
        listaProdutos.innerHTML = "";

        lista.forEach((item, i) => {
            listaProdutos.innerHTML += `
                <tr>
                    <td>${item.nome}</td>
                    <td>${item.quantidade}</td>

                    <td>
                        <input type="number" id="qtd_${i}" min="1" value="1" class="qtdInput">

                        <button onclick="adicionar(${i})" class="btn">Adicionar</button>
                        <button onclick="retirar(${i})" class="btn">Retirar</button>
                        <button onclick="remover(${i})" class="btn danger">Excluir</button>
                    </td>

                    <td>
                        <input type="text" id="nf_${i}" placeholder="Número da Nota Fiscal" class="nfInput">
                        <button onclick="salvarNF(${i})" class="btn small">Salvar NF</button>

                        <div class="nfBox">
                            <strong>Notas:</strong>
                            <ul id="nfList_${i}">
                                ${item.notas.map(n => `<li>${n}</li>`).join("")}
                            </ul>
                        </div>
                    </td>
                </tr>
            `;
        });
    }

    renderEstoque();

    // ============ ADICIONAR PRODUTO ============
addForm.onsubmit = e => {
    e.preventDefault();

    let nome = pNome.value;
    let qtd = Number(pQtd.value);

    let lista = getEstoque();
    lista.push({ nome, quantidade: qtd, notas: [] });

    saveEstoque(lista);

    // REGISTRAR MOVIMENTAÇÃO AO CADASTRAR PRODUTO
    registrarMovimento(nome, qtd, "Entrada");

    renderEstoque();
};

    // ============ REMOVER PRODUTO ============
    window.remover = i => {
        let lista = getEstoque();
        lista.splice(i, 1);
        saveEstoque(lista);
        renderEstoque();
    };

    // ============ ADICIONAR QUANTIDADE ============
    window.adicionar = i => {
        let lista = getEstoque();
        let campo = document.getElementById(`qtd_${i}`);
        let q = Number(campo.value);
    
        if (q > 0) {
            lista[i].quantidade += q;
    
            registrarMovimento(lista[i].nome, q, "Entrada");
        }
    
        saveEstoque(lista);
        renderEstoque();
    };
    

    // ============ RETIRAR QUANTIDADE ============
    window.retirar = i => {
        let lista = getEstoque();
        let campo = document.getElementById(`qtd_${i}`);
        let q = Number(campo.value);
    
        if (q > 0) {
            lista[i].quantidade -= q;
            if (lista[i].quantidade < 0) lista[i].quantidade = 0;
    
            registrarMovimento(lista[i].nome, q, "Saída");
        }
    
        saveEstoque(lista);
        renderEstoque();
    };
    
    // ============ SALVAR NOTA FISCAL ============
    window.salvarNF = i => {
        let lista = getEstoque();
        let nf = document.getElementById(`nf_${i}`).value.trim();

        if (!nf) return alert("Digite um número de nota fiscal!");

        lista[i].notas.push(nf);

        saveEstoque(lista);
        renderEstoque();
    };
}


// ============= REGISTRAR MOVIMENTAÇÃO =============
function registrarMovimento(produto, qtd, tipo) {
    let mov = JSON.parse(localStorage.getItem("movimentacoes")) || [];

    mov.push({
        data: new Date().toLocaleString("pt-BR"),
        produto: produto,
        quantidade: qtd,
        tipo: tipo
    });

    localStorage.setItem("movimentacoes", JSON.stringify(mov));
}

// ============= CARREGAR MOVIMENTAÇÕES =============
if (document.getElementById("listaMov")) {
    function carregarMovimentacoes() {
        let mov = JSON.parse(localStorage.getItem("movimentacoes")) || [];
        listaMov.innerHTML = "";

        mov.forEach((reg, i) => {
            listaMov.innerHTML += `
                <tr>
                    <td>${reg.data}</td>
                    <td>${reg.produto}</td>
                    <td>${reg.quantidade}</td>
                    <td>${reg.tipo}</td>
                    <td>
                        <button onclick="excluirMov(${i})" class="btn danger small">Excluir</button>
                    </td>
                </tr>
            `;
        });
    }

    carregarMovimentacoes();
}

// ======== EXCLUIR MOVIMENTAÇÃO =========
window.excluirMov = index => {
    let mov = JSON.parse(localStorage.getItem("movimentacoes")) || [];

    if (confirm("Deseja realmente excluir esta movimentação?")) {
        mov.splice(index, 1);
        localStorage.setItem("movimentacoes", JSON.stringify(mov));
        carregarMovimentacoes();
    }
};


// ========== VERIFICAR SENHA DO ADMIN ==========
function acessoAdmin(pagina) {
    let users = JSON.parse(localStorage.getItem("usuarios")) || [];
    
    // O admin SEMPRE é o primeiro da lista
    let admin = users[0];

    let senhaDigitada = prompt("Digite a senha do administrador:");

    if (senhaDigitada === null) return;

    if (senhaDigitada === admin.pass) {
        window.location.href = pagina;
    } else {
        alert("Senha incorreta! Acesso negado.");
    }
}

// ================= CADASTRAR USUÁRIOS =================
if (document.getElementById("listaUsuarios")) {

    function renderUsers() {
        let users = getUsers();
        listaUsuarios.innerHTML = "";

        users.forEach((u, i) => {
            listaUsuarios.innerHTML += `
                <li class="user-item">
                    <span>${u.user}</span>

                    <button class="btn danger small" onclick="excluirUsuario(${i})">
                        Excluir
                    </button>
                </li>
            `;
        });
    }

    renderUsers();

    addUserForm.onsubmit = e => {    
        e.preventDefault();

        let u = newUser.value;
        let p = newPass.value;

        let users = getUsers();
        users.push({ user: u, pass: p });

        saveUsers(users);
        renderUsers();
    };

    // ========== EXCLUIR USUÁRIO ==========
    window.excluirUsuario = index => {
        let users = getUsers();

        if (index === 0) {
            return alert("O usuário ADMIN não pode ser excluído.");
        }

        if (confirm("Tem certeza que deseja excluir este usuário?")) {
            users.splice(index, 1);
            saveUsers(users);
            renderUsers();
        }
    };
}


// ================= ALTERAR SENHA =================
if (document.getElementById("formSenha")) {
    formSenha.onsubmit = e => {
        e.preventDefault();

        let user = userAtual.value;
        let senhaA = senhaAtual.value;
        let senhaN = senhaNova.value;

        let users = getUsers();

        let u = users.find(x => x.user === user && x.pass === senhaA);

        if (!u) return alert("Usuário ou senha atual incorretos!");

        u.pass = senhaN;

        saveUsers(users);
        alert("Senha alterada com sucesso!");
    };
}
