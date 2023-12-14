# Introdução a K6

Essa POC tem como objetivo realizar um estudo de como é a ferramenta de teste de performance K6, suas possíveis vantagens e desvantagens perantes a outras ferramentas do mercado, bem como esse repositório ser um documento inicial em português de como é a utilização da ferramenta.

O Grafana K6 é uma ferramenta open source de teste de performance, seu pilar está em ser uma ferramenta fácil, produtiva que pode ser utilizado por times de engenharia, extensive e centrada no desenvolvimento.

## Principais Funcionalidades

- Ferramenta fácil de utilizar na forma CLI;
- Scripts em JavaScript ES2015/ES6 - com suporte para local e módulos remotos;
- Checks e Thresholds orientados a objetivos e fáceis de automatizar

## Instalação

Um ponto de vantagem para o K6 é sua fácil instalação, independente do Sistema Operacional, abaixo segue os comandos para instalar nos Sistemas Operacionais disponíveis.

### Linux Debian/Ubuntu

```shell
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Mac OS

```shell
brew install k6
```

### Windows

O formato mais simples para o Windows é utilizado a ferramenta de gerenciamento de pacotes Chocolatey, para realizar a instalação basta seguir clicar no [link](https://chocolatey.org/).

Após sua instalação basta executar o seguinte comando:

```shell
choco install k6
```

### Docker

Para quem está familiriarizado com docker, basta baixar a versão mais recente da imagem docker do K6 no dockerhub a partir do seguinte comando:

```shell
docker pull grafana/k6
```

## Executando o K6

Outro ponto vantajoso do K6 para outras ferramentas é sua documentação completa e baseada em passos iniciais, intermediários e avançados para que haja um entendimento de todo o fluxo de desenvolvimento dos scripts de teste. Inicialmente a documentação mostra um script básico

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
```

Por padrão deve se importar a biblioteca de `http` na qual realiza as requisições que são chamadas no comando `http.get()`. O segundo import do K6 são comandos específicos que são utilizados nos testes, entre eles o `sleep` e `check`.

Nesse script tem como função única realizar uma requisição para o endpoint `https://test.k6.io` e validar o comportamento da requisição para somente um usuário virtual (esse é por padrão).

Para executar o script no terminal basta executar o comando:

```shell
k6 run script.js
```

Na seção de métricas iremos entender as informações que são retornadas pela ferramenta.

### Adicionando mais Usuários Virtuais (VUs)

Para adicionar vários usuários virtuais no script de teste, podemos utilizar de duas maneiras, primeira por linha de comando a partir da tag `--vus`, ou adicionado um objeto `options` dentro do script de teste.

Então para o script1 que visualizamos anteriormente, caso desejamos executar para um número de 10 usuários, no terminal executamos o seguinte comando:

```shell
k6 run --vus 10 --duration 30s script.js
```
Para esse teste foi adicionado a tag `--duration` que tem como premissa que esses 10 usuários realizem o acesso simultâneo durante 30 segundos.

Já com o conceito de utilizar o objeto options, no script1 que criamos, devemos adicionar o seguinte objeto:

```javascript 
import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 10,
  duration: '30s',
};
export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}
```

Assim, com o objeto options criado no script, basta executar o comando normalmente que ele seguira o objeto, executando o teste com 10 usuários virtuais e com duração de 30 segundos.

```shell
k6 run script.js
```

### Utilizando Stagens com Rampagem UP e Down

**EM DESENVOLVIMENTO**

## Referênias 

- [Documentação K6](https://k6.io/docs/)

## Criando pipeline K6 com Runner EC2

**EM DESENVOLVIMENTO**

[Actions funcionando](https://github.com/jfilhoGN/poc-k6/actions/workflows/do-the-job.yml)