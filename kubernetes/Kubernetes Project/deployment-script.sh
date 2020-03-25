#!/bin/sh
kubectl create -f my-app-pv.yaml
kubectl create -f my-app-pvc.yaml
kubectl create -f deploy-my-app.yaml
kubectl expose deploy deploy-my-app --port=8080 --target-port=80 --type=LoadBalancer --name=my-app-svc
