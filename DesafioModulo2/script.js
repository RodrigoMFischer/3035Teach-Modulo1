/*
localStorage.setItem('lista', '');
localStorage.setItem('cart', '');
*/

const limpaMemoria = () => {
    localStorage.clear();
   // loadCart();
}

const loadStorage = (item) => {
    let storage = localStorage.getItem(item);
    if (storage === null || storage.length == 0) {
        return [];
    };
    return JSON.parse(storage);       
}

const saveStorage = (item, object) => {
    localStorage.setItem(item, JSON.stringify(object));
}


const salvar = (event) => {
    event.preventDefault();
    const CadastroClientes = loadStorage('lista');
    const nomeTutor = document.getElementById("nomeTutor").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("endereco").value;
    const agendamento = document.getElementById("agendamento").value;
    const nomeAnimal = document.getElementById("nomeAnimal").value;
    const idade = document.getElementById("idade").value;
    const porte = document.getElementById("porte").value;
    
    const cliente = {
        nomeTutor,
        telefone,
        endereco,
        agendamento,
        nomeAnimal,
        idade,
        porte
    };

    CadastroClientes.push(cliente);  
    saveStorage('lista', CadastroClientes);
    let formulario = document.getElementById("cadastroClientes");
    formulario.reset();
}

const criaCardsClientes = () => {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    const listaClientes = loadStorage('lista');
    if(listaClientes.length) {
        listaClientes.forEach(elemento => {
            const card = document.createElement('div');
            card.id = 'card';
            card.setAttribute('dadosCliente', JSON.stringify(elemento));
            card.innerHTML = `
                <p>Nome do Animal: ${elemento.nomeAnimal}</p>
                <p>Agendamento: ${elemento.agendamento}</p>            
                <button onclick="criaModal(this.parentNode.getAttribute('dadosCliente'))">Ver mais</button>
                `;
                
                container.appendChild(card);
        });
    } else {
        container.innerHTML = '<h1>Sem clientes cadastrados</h1>';
    }
}

const criaModal = (elemento) => {
    const data = JSON.parse(elemento);
    
    const modal = document.getElementById('myModal');
    modal.innerHTML = '';
    const content = document.createElement('div');

    content.innerHTML = 
        `<span class="close">&times;</span>
        <h3>Nome do Tutor: ${data.nomeTutor}</h3>
        <p>Telefone: ${data.telefone}</p>
        <p>Endereço: ${data.endereco}</p>
        <p>Data do Agendamento: ${data.agendamento}</p>
        <p>Nome do Animal: ${data.nomeAnimal}</p>
        <p>Idade do Animal: ${data.idade}</p>
        <p>Porte do Animal: ${data.porte}</p>
    `;
    
    modal.appendChild(content);

    modal.style.display = 'block';

    const closeButton = content.querySelector('.close');
    closeButton.addEventListener('click', () => closeModal()); 
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    })
        
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}


const products = [
    {
      name : "Ração Whiskas Gatos",
      desc : "Saco de ração Whiskas 5 kg",
      img : './assets/whiskas.jpeg',
      price : 73.55
    },

    {
        name : "Ração Whiskas Filhotes",
        desc : "Saco de ração Whiskas 3 kg",
        img : './assets/whiskasF.jpeg',
        price : 52.99
    },

    {
        name : "Ração Golden Gatos",
        desc : "Saco de ração Golden 5 kg",
        img : './assets/golden.jpeg',
        price : 65.99
    },

    {
        name : "Pipicat Areia",
        desc : "Areia Higienica Pipicat 4kg",
        img : './assets/pipicat.jpeg',
        price : 43.42
    },

    {
        name : "Tigela Grande",
        desc : "Tigela grande para cães",
        img : './assets/tigela.jpeg',
        price : 19.99
    },

    {
        name : "Ração Golden Dog",
        desc : "Saco de ração Golden Dog 5kg",
        img : './assets/goldenDog.jpeg',
        price : 62.99
    },

    {
        name : "Ração Ligeiro Dog",
        desc : "Saco de ração Ligeiro Dog 5kg",
        img : './assets/ligeiro.jpeg',
        price : 69.25
    },

    {
        name : "Ração Pedigree",
        desc : "Saco de ração Pedigree 5kg",
        img : './assets/pedigree.jpeg',
        price : 73.22
    },
  
];

const criaProdutos = () => {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    products.forEach( (product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-Card');

        productCard.innerHTML = `            
            <img src=${product.img} alt="Logo da Pet Store"/>
            <h3>${product.name}</h3>
            <h5>${product.desc}<h5>
            <h5>Preço: ${product.price}<h5>
            <button onclick="addProductToCart(${index})"> Comprar </button>
        `;
        container.appendChild(productCard);
    })

}
/*
const checkCart = (product, cartList) => {
    cartList.find( current => current === product )
}*/


const addProductToCart = (index) => {
    const cart = loadStorage('cart');  
        
    const prodToAdd = {...products[index], quant: 1};
    const cartIndex = cart.findIndex( current => current.name === prodToAdd.name);
    
    if(cartIndex === -1) {
        cart.push(prodToAdd);
    }
    else {
        cart[cartIndex].quant++;
    }

    saveStorage('cart', cart);

    modalProductAdded(prodToAdd.name);
    

}

const modalProductAdded = (productName) => {
    const modal = document.getElementById('cart-product-added');
    modal.innerHTML = '';

    const content = document.createElement('div');
    content.innerHTML = `<h4>${productName}</h4>
        <span>adicionado ao carrinho</span>`;
    
    modal.appendChild(content);
    
    modal.style.display = 'block';
    setTimeout( () => modal.style.display = 'none', 3000 );
    
}

const loadCart = () => {
    const cart = loadStorage('cart');
    const modal = document.getElementById('cart-list-modal');
    const container = document.getElementById('cart-items');
    container.innerHTML = '<span class="close">&times;</span>';
    let cartTotal = 0;
    cart.forEach( (current) => {
        const product = document.createElement('div');
        product.classList.add('item');

        product.innerHTML = `            
            <h4>${current.name}</h3>
            <h5>Quant: ${current.quant}</h5>
            <h5>Valor: ${current.price}</h5>
        `;
        container.appendChild(product);

        cartTotal += current.quant * current.price;
        
    });
    
    const total = document.createElement('div');
    total.classList.add('cart-total');
    total.innerHTML = `
    <h4>Total do Carrinho:</h4>
    <h3>R$ ${cartTotal.toFixed(2)}</h3>
    `;
    container.appendChild(total);
    
    modal.style.display = 'block';

    const closeButton = container.querySelector('.close');
    closeButton.addEventListener('click', () => closeCart()); 
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeCart();
        }
    })

}

const closeCart = () => {
    const modal = document.getElementById('cart-list-modal');
    modal.style.display = 'none';
}