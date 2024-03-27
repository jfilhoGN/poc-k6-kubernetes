# xk6-kubernetes

Essa POC tem como objetivo realizar um estudo de utilização do xk6-kubernetes para execução em paralelo com vários cluster em Kubernetes.

## Instalação

- Necessita de ter instalado Go lang, para isso basta realizar o download [Go toolchain](https://go101.org/article/go-toolchain.html)
- Após a instalação executar o comando:
  - `go install go.k6.io/xk6/cmd/xk6@latest`
  - Realizar o export do diretório GO com o comando `export PATH=$(go env GOPATH)/bin:$PATH`
  - E por fim, dentro do repositório que você irá executar o script em k6 executar o comando `xk6 build --with github.com/grafana/xk6-kubernetes`
`
### Execução

- Para executar o script basta executar o comando `./k6 run script2.js`
- Formato com InfluxDB e Grafana `./k6 run --out influxdb=http://ec2-3-12-41-118.us-east-2.compute.amazonaws.com:8086 --out json=report/teste-github.json script2.js`


## Validação

- consegue executar o xk6-kubernetes em paralelo
- consegue utilizar dos outputs para coleta de dados em real time, para isso basta executar o comando `./k6 run --out json=test.json script2.js`
- validado a utilização de thresholds, assim conseguimos mostrar no action que deu ruim a execução

## Pontos importantes

- verificar como deletar o POD executado


### Comandos kubernetes para recordar

- Criar namespace: `kubectl create namespace performance`
- Visualizar os pods de determinado namespace: `kubectl get pods -n=performance`
- Deletar determinado pod em um namespace: `kubectl delete pods -n=performance testk6`