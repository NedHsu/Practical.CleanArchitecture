# dotnet cli new template


## Template
```
test
working
└───templates
    └───templateName
        └───.template.config
                template.json
```

### install template
``` sh
## windows
dotnet new -i .\

## mac/linux
dotnet new -i ./
```

### uninstall template
``` sh
dotnet new -u 
```

### pack
``` sh
dotnet pack

dotnet new -i PATH_TO_NUPKG_FILE
```