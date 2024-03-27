import http from 'k6/http';
import { Trend } from 'k6/metrics';
import { check, sleep } from 'k6';
import { Kubernetes } from 'k6/x/kubernetes';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const pdpTrend = new Trend('pdpTrend', true);
const addToCartTrend = new Trend('addToCartTrend', true);

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
    { duration: '1m', target: 10 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<200'],
    pdpTrend: ['p(95)<200'],
    addToCartTrend: [{
      "threshold": "p(95)<2000",
      "abortOnFail": true
    }]
  },
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
  let res = http.get('https://httpbin.test.k6.io/', {
    tags: {
      pdpTag: "pdpTagTrend",
    },
  });
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
  pdpTrend.add(res.timings.duration, { pdpTag: "pdpTagTrend" });


  res = http.get('https://httpbin.test.k6.io/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);


  res = http.get('https://httpbin.test.k6.io/', {
    tags: {
      addToCart: "addToCartTagTrend",
    },
  });
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
  addToCartTrend.add(res.timings.duration, { pdpTag: "pdpTagTrend" });

}

const results = `report/results${new Date().getMinutes().toLocaleString()}.html`

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    [results]: htmlReport(data, { title: new Date().toLocaleString() }),
    'report/summary.json': JSON.stringify(data),
  }
}