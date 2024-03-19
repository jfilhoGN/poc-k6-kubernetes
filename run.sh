docker-compose up -d influxdb grafana
./k6 run --out influxdb=http://localhost:8086  --out json=report/teste.json script2.js
kubectl delete pods testk6 --namespace=performance