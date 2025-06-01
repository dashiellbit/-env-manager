# env-manager

manage environment variables across projects

## install

```
npm install -g .
```

## usage

save an environment:
```
envmgr add dev .env.dev
```

list saved environments:
```
envmgr list
```

load variables (source this):
```
eval $(envmgr load dev)
```

delete environment:
```
envmgr delete dev
```