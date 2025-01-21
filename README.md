## Projeto desenvolvido nos módulos de "Fundamentos do React", "Class Components" e "React Router v5" do curso JStack

### 1. Criação do projeto e configuração do Babel

- Criar o projeto usando o comando `yarn init -y`
- Adicionadar dependências de desenvolimento: `yarn add @babel/core @babel/preset-env @babel/cli -D`
- Instalar preset do Babel (para ele entender o React): `yarn add @babel/preset-react -D`
- Criar arquivo de configuração do Babel na raíz do projeto (arquivo `.babelrc`) com o seguinte conteúdo:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

- Criar um script de transpilação no `package.json`:

```json
{
  "scripts": {
    "build": "babel src -d build"
  }
}
```

- Instalar o React: `yarn add react@^17.0.2 react-dom@^17.0.2`
- Criar arquivo `index.html` dentro da pasta `public` para ser o template do React, com uma div "root"
- Criar arquivo `index.js`dentro da pasta `src` para ser o conteúdo:

```jsx
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<h1>Hi!</h1>, document.getElementById("root"));
```

---

### 2. Configuração do processo de geração de bundle

Aqui o Webpack pega todos os arquivos criados e une em um único arquivo JavaScript

- Instalar como dependências de desenvolimento: `yarn add webpack webpack-cli -D`
- Criar arquivo de configuração do Webpack (`webpack.config.js`):

```js
const path = require("path"); // módulo Path monta o caminho com base no sistema opercional, usando / ou \

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"), // arquivo que inicializa o projeto
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle[hash].js", // gera arquivo com nome diferente, eliminando possível problema com cache
  },
};
```

Precisa transpilar o código com o Babel e depois usar esse código com Webpack, fora que o nome do arquivo muda dinamicamente, então precisa de alguns ajustes.

- Adicionar plugins:
  - `yarn add html-webpack-plugin -D`: muda dinamicamente o uso do bundle pela aplicação
  - `yarn add clean-webpack-plugin -D`: exclui os arquivos de bundle antigos
  - Alterar no arquivo `webpack.config.js`:

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"), // caminho pra base html onde será injetado o bundle
    }),
    new CleanWebpackPlugin(),
  ],
};
```

---

### 3. Configurando Loaders

Loaders permitem que o Webpack processe outros tipos de arquivos, transformando eles em algo que o Webpack consegue entender, tirando a necessidade de precisar rodar o Babel "na mão" sempre, ele faz automático.

- Alterar script de build no `package.json`:

```json
  "scripts": {
    "build": "webpack"
  }
```

- Remover o Babel CLI, já que não vai ser mais necessário: `yarn remove @babel/cli`
- Instalar o loader pro Babel: `yarn add babel-loader -D`
- No arquivo `webpack.config.js`, adicionar propriedade "module":

```js
module.exports = {
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, use: "babel-loader" }],
  },
};
```

---

### 4. Criando um servidor local de desenvolvimento

Agiliza o processo de desenvolvimento por não precisar fazer o build para ver cada alteração realizada.

- Instalar `yarn add webpack-dev-server -D`
- Adicionar novo script no `package.json`:

```json
 "scripts": {
    "dev": "webpack serve"
  },
```

- Para alterar a porta do servidor, ir no `webpack.config.js`e adicionar:

```js
module.exports = {
  devServer: { port: 3000 },
};
```

- Rodar `yarn dev` e acessar http://localhost:3000/.

> OBS: Para remover o erro do "The 'mode' option has not been set, webpack will fallback to 'production' for this value.", adicionar no `webpack.config.js`:
>
> ```js
> module.exports = {
>   mode: "development",
> };
> ```

---

Para tipar componentes

- Instalar `yarn add prop-types`

---

Para usar arquivos CSS:

- Instalar `yarn add css-loader style-loader -D`
- Adicionar no `webpack.config.js`:

```js
module.exports = {
  module: {
    rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }],
  },
};
```

---

### CSS Modules

Conforme a aplicação cresce, o CSS pode ter conflito entre as classes (quando elas tem o mesmo nome), onde a última classe sobrescreve as outras. O CSS Modules ajuda nessa gestão de classes de estilo pois gera hashs para cada classe, para isso vamos no arquivo `webpack.config.js`:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } }, // ativa o uso de CSS Modules
        ],
      },
    ],
  },
};
```

---

### SASS

É um pré processador de CSS, ele introduz no CSS algumas funcionalidades que o CSS não suportava (como, por exemplo, variáveis, loops de repetição e etc). Styled Components também faz o mesmo. Esses pré processdores são usados em ambiente de desenvolvimento, no navegador são convertidos para CSS comum.

- Instalar a biblioteca e o loader: `yarn add sass sass-loader -D` e adicionar no arquivo `webpack.config.js`:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/, // troca da extensão dos arquivos CSS
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } },
          "sass-loader", // inclusão do SASS Loader
        ],
      },
    ],
  },
};
```

---

### Styled Components

Traz benefícios por trabalhar com Scopped classes, por trazer mais legibilidade pro código e ele roda na web (react) quanto mobile (React Native) usando praticamente o mesmo código.

- Instalação: `yarn add styled-components`

---

### Trabalhando com Class Components

O Babel não consegue entender quando criamos estados e funções direto na classe (o this não é reconhecido no escopo das funções e tudo mais, pra não ficar precisando dar um ".bind(this)"), por isso é preciso a instalação de um plugin: `yarn add @babel/plugin-proposal-class-properties -D`, e adicionar no arquivo `.babelrc`:

```json
{
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

---

### Métodos de ciclo de vida em componentes de classe

```js
componentDidMount() {
  // executa apenas na primeira vez que o componente é renderizado
  // seria equivalente ao useEffect(() => {}, []) com array de dependência vazio
}

componentDidUpdate(prevProps, prevState) {
  // executa toda vez que o componente é atualizado
  // recebe propriedades: prevProps é as propriedaes que a instância recebe e prevState o estado anterior
  // é chamado DEPOIS do método render, depois que as coisas estão na tela
  // seria equivalente ao useEffect(() => {}) sem array de dependência
}


componentDidCatch(error, info) {
  // esse método é chamado quando ocorre algum erro dentro de um componente filho
}

shouldComponentUpdate(nextProps, nextState) {
  // executa toda vez que o componente é atualizado
  // recebe propriedades: nextProps é as propriedaes que a instância recebe e nextState o estado anterior
  // é chamado ANTES do método render, antes de mostrar algo na tela, como se fosse um middleware: antes do React fazer a alteração, ele executa esse método
  // sempre precisa retornar um boolean, que é se o componente deve ou não ser renderizado/atualizado
}

componentWillUnmount() {
  // ele executa antes do componente sair da tela
  // é o equivalente ao "retorn" do useEffect
}
```

---

### React Router v5

- Instalar: `yarn add react-router-dom@5.3.0`
- Criar arquivo para lidar com as rotas da aplicação:

```js
export default function Routes() {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route path="/posts" component={Posts} />
    </>
  );
}
```

- Adicionar no arquivo `webpack.config.js` uma propriedade para configurar o redirecionamento de rotas:

```js
module.exports = {
  devServer: { historyApiFallback: true },
};
```

O Router sempre vai buscar as rotas na ordem em que elas foram declaradas, então a ordem de criação das rotas é importante, e para criar uma rota específica de "Página não encontrada" é preciso usar o componente Switch (que faz com que apenas 1 rota seja renderizada por vez, quando o nome dela é encontrado) e adicionando como última rota a tela de "página não encontrada":

```js
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/posts" component={Posts} />
      <Route component={NotFound} />
    </Switch>
  );
}
```

- Como temos mais rotas agora, precisa adicionar no arquivo `webpack.config.js` uma nova propriedade pra sempre carregar o bundle na raíz do projeto apenas, e não ficar buscando em cada nova rota:

```js
module.exports = {
  output: {
    publicPath: "/",
  },
};
```

- Para pegar params e queryParams em componentes funcionais:

```js
export default function Post() {
  const { id } = useParams(); // params da URL

  // queryParms (filtros, por exemplo)
  const { search } = useLocation();
  const queryParams = useMemo(() => new URLSearchParams(search), [search]);

  return (
    <h1>
      Post {id} - Filtro: {queryParams.get("meuQueryParam")}
    </h1>
  );
}
```

- Para pegar params e queryParams em componentes de classe:

```js
export default class Post extends React.Component {
  constructor(props) {
    super(props);

    const { search } = this.props.location;
    this.queryParams = new URLSearchParams(search);
  }

  render() {
    return (
      <h1>
        Post {this.props.match.params.id} - Filtro:{" "}
        {this.queryParams.get("meuQueryParam")}
      </h1>
    );
  }
}
```

- Para fazer a navegação programática do usuário (redirecionar ele de uma tela pra outra):

```js
// em componentes funcionais
export default function Home() {
  const history = useHistory();

  function handleNavigate() {
    history.push("/posts");
  }

  return <button onClick={handleNavigate}>Conferir posts</button>;
}

// em componentes de classe
export default class Posts extends React.Component {
  handleNavigate = () => {
    this.props.history.push("/posts/21");
  };

  render() {
    return (
      <button onClick={this.handleNavigate}>
        Acesse um post legal!
      </button>
    );
  }
}
```

- Bônus: para fazer transições durante a navegação, instalar: `yarn add react-spring`. Exemplo:

```js
export default function Routes() {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translateY(50px)", position: "absolute" },
    enter: { opacity: 1, transform: "translateY(0)", position: "absolute" },
    leave: { opacity: 0, transform: "translateY(50px)", position: "absolute" },
  });

  return transitions((props, item) => (
    <animated.div style={props}>
      <Switch location={item}>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts" component={Posts} />
        <Route path="/posts/:id" component={Post} />
        <Route component={NotFound} />
      </Switch>
    </animated.div>
  ));
}
```
