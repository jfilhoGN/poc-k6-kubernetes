FROM golang:1.22

WORKDIR /app

RUN go install go.k6.io/xk6/cmd/xk6@latest
RUN export PATH=$(go env GOPATH)/bin:$PATH
RUN xk6 build --with github.com/grafana/xk6-kubernetes

FROM ubuntu
RUN curl -sfL https://get.k3s.io | K3S_KUBECONFIG_MODE=777 sh -
RUN cat /etc/rancher/k3s/k3s.yaml
RUN mkdir -p ~/.kube
RUN cp /etc/rancher/k3s/k3s.yaml ~/.kube/config
COPY script2.js /app/script2.js
