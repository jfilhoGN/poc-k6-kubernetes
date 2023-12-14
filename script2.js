// example rampage
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Kubernetes } from 'k6/x/kubernetes';

const podSpec = {
  apiVersion: "v1",
  kind: "Pod",
  metadata: {
    name: "testk6",
    namespace: "performance"
  },
  spec: {
    containers: [
      {
        name: "testk6",
        image: "grafana/k6",
        command: ["k6", "run"]
      }
    ]
  }
}

export const options = {
  stages: [
    { duration: '2m', target: 100 },
  ],
};

export function setup() {
  const kubernetes = new Kubernetes();
  kubernetes.create(podSpec)

  const pods = kubernetes.list("Pod", "testk6");
  pods.map(function (pods) {
    console.log(`${pods.metadata.name}`)
  });
}

export default function () {
  // const jobs = kubernetes.list("Job", "performance-test");
  const res = http.get('https://httpbin.test.k6.io/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}