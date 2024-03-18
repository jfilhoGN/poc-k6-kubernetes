FROM golang:1.22

WORKDIR /app

RUN go install go.k6.io/xk6/cmd/xk6@latest
RUN export PATH=$(go env GOPATH)/bin:$PATH
RUN xk6 build --with github.com/grafana/xk6-kubernetes
COPY script2.js /app/script2.js
COPY scripts/script1.js /app/script1.js
